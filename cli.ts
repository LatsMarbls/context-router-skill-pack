#!/usr/bin/env node

/**
 * ocr-pack — context-router-skill-pack CLI
 *
 * Commands:
 *   install       Copy skills + merge config (default)
 *   uninstall     Remove installed skills
 *   list          Show installed skills
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, cpSync, rmSync, statSync, symlinkSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

// ── Paths ────────────────────────────────────────────────────────────────────

const DIST_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(DIST_DIR, "..");
const SKILLS_SRC = join(PROJECT_ROOT, "skills", "context-router");
const CFG_SRC = join(PROJECT_ROOT, "context-router.jsonc");
const USER_SKILLS_DIR = join(homedir(), ".config", "opencode", "skills");
const USER_CONFIG_PATH = join(homedir(), ".config", "opencode", "context-router.jsonc");
const MANIFEST_PATH = join(USER_SKILLS_DIR, ".ocr-pack-manifest.json");

interface Manifest {
  version: string;
  installedAt: string;
  skills: string[];
  linked: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripJsoncComments(raw: string): string {
  return raw.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
}

function readJson(path: string): Record<string, unknown> | null {
  try {
    return JSON.parse(stripJsoncComments(readFileSync(path, "utf-8")));
  } catch { return null; }
}

function writeJson(path: string, data: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

function readPackConfig(): Record<string, unknown> {
  return readJson(CFG_SRC) || {};
}

// ── Skill discovery ───────────────────────────────────────────────────────────

function discoverSkills(src: string): string[] {
  return readdirSync(src, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(name => existsSync(join(src, name, "SKILL.md")))
    .sort();
}



// ── Commands ──────────────────────────────────────────────────────────────────

function cmdInstall(targetDir: string, linkMode: boolean, force: boolean): void {
  const skillsDir = join(targetDir, "skills", "context-router");

  // 1. Discover skills in pack
  const dirSkills = discoverSkills(SKILLS_SRC);
  const allSkills = [...dirSkills];

  if (allSkills.length === 0) {
    console.log("⚠ No skills found in pack.");
    process.exit(1);
  }

  // 2. Copy/link skills
  mkdirSync(skillsDir, { recursive: true });
  let copied = 0;
  let skipped = 0;

  for (const name of dirSkills) {
    const dest = join(skillsDir, name);
    const src = join(SKILLS_SRC, name);

    if (existsSync(dest)) {
      if (force) {
        rmSync(dest, { recursive: true });
      } else {
        skipped++;
        continue;
      }
    }

    if (linkMode) {
      symlinkSync(src, dest, "junction");
    } else {
      cpSync(src, dest, { recursive: true });
    }
    copied++;
  }

  // 3. Merge config — add skillLocations if missing
  const configDir = dirname(USER_CONFIG_PATH);
  mkdirSync(configDir, { recursive: true });

  const existingConfig = readJson(USER_CONFIG_PATH) || {};
  const packConfig = readPackConfig();

  // Merge skillLocations (append, dedupe)
  const packLocations: string[] = (packConfig.skillLocations as string[]) || [];
  const existingLocations: string[] = (existingConfig.skillLocations as string[]) || [];
  const mergedLocations = [...existingLocations];

  for (const loc of packLocations) {
    if (!mergedLocations.includes(loc)) {
      mergedLocations.push(loc);
    }
  }

  const merged = { ...existingConfig, ...packConfig, skillLocations: mergedLocations };
  writeJson(USER_CONFIG_PATH, merged);

  // 4. Write manifest
  const manifest: Manifest = {
    version: "1.0.0",
    installedAt: new Date().toISOString(),
    skills: allSkills,
    linked: linkMode,
  };
  writeJson(join(targetDir, ".ocr-pack-manifest.json"), manifest);

  // 5. Report
  const linkLabel = linkMode ? " (symlinked)" : "";
  console.log(`\n  ✅ Installed ${copied} skills${linkLabel}`);
  if (skipped > 0) console.log(`  ⚠ ${skipped} skills skipped (use --force to overwrite)`);
  console.log(`  📍 ${skillsDir}`);
  console.log(`  📄 ${USER_CONFIG_PATH}\n`);
}

function cmdUninstall(targetDir: string): void {
  const manifestPath = join(targetDir, ".ocr-pack-manifest.json");
  const skillsDir = join(targetDir, "skills");

  if (!existsSync(manifestPath)) {
    console.log("No manifest found. Nothing to uninstall.");
    return;
  }

  const manifest: Manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

  for (const name of manifest.skills) {
    const dest = join(skillsDir, name);
    if (existsSync(dest)) {
      rmSync(dest, { recursive: true });
      console.log(`  ✕ Removed ${name}`);
    }
  }

  rmSync(manifestPath);
  console.log(`\n  ✅ Uninstalled ${manifest.skills.length} skills\n`);
}

function cmdList(targetDir: string): void {
  const skillsDir = join(targetDir, "skills");
  if (!existsSync(skillsDir)) {
    console.log("No skills installed.");
    return;
  }

  const dirSkills = readdirSync(skillsDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(join(skillsDir, d.name, "SKILL.md")))
    .map(d => d.name)
    .sort();

  if (dirSkills.length === 0) {
    console.log("No skills found.");
    return;
  }

  console.log(`\n  Installed skills (${dirSkills.length}):\n`);
  for (const name of dirSkills) {
    const skillPath = join(skillsDir, name, "SKILL.md");
    const stats = statSync(skillPath);
    const linked = stats.isSymbolicLink() ? " 🔗" : "";
    const kb = (stats.size / 1024).toFixed(1);
    console.log(`    ${name}${linked}  (${kb}KB)`);
  }
  console.log();
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main(): void {
  const args = process.argv.slice(2);
  const command = args[0] || "install";

  // Parse flags
  const projectIdx = args.indexOf("--project");
  const projectPath = projectIdx !== -1 ? resolve(args[projectIdx + 1]) : null;
  const linkMode = args.includes("--link");
  const force = args.includes("--force");

  const targetDir = projectPath
    ? join(projectPath, ".opencode")
    : join(homedir(), ".config", "opencode");

  switch (command) {
    case "install":
      cmdInstall(targetDir, linkMode, force);
      break;
    case "uninstall":
      cmdUninstall(targetDir);
      break;
    case "list":
      cmdList(targetDir);
      break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log("Usage: ocr-pack [install|uninstall|list] [--project <path>] [--link] [--force]");
      process.exit(1);
  }
}

main();
