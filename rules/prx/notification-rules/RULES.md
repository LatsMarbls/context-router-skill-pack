---
name: notification-rules
triggers:
  keywords: ["notification"]
priority: 8
---

## PRX Notification Conventions

### Notifier Facade

```php
use PRAXXYS\Backend\Facades\Notifier;

Notifier::setType('info|success|warning|error')
    ->setAction('Label', route('admin.route'))
    ->setData(['key' => 'value'])
    ->send('slug', $notifiable, ['smart' => 'tags']);
```

- `setType()` — notification style
- `setAction()` — optional action button (label + URL)
- `setData()` — optional extra payload
- `send()` — dispatch by template slug

### Channels

| Channel | Constant | Class | Use |
|---------|----------|-------|-----|
| Mail | `NotificationChannel::MAIL` | `MailChannel` | Email |
| Database | `NotificationChannel::IN_APP` | `DatabaseChannel` | In-app notifications |

Register custom channels via `PRXBackend::registerNotificationChannels([...])`.

### Template Config

`config/notification-templates/prx-backend.php` — maps slugs to events:

```php
'module'    => 'group-name',
'slug'      => 'base-slug',
'events'    => [
    [
        'subject'    => 'Subject line',
        'slug'       => 'event-unique-slug',
        'channels'   => [
            MailChannel::class     => 'stub-path',
            DatabaseChannel::class => 'stub-path',
        ],
        'receiver'   => NotificationReceiver::ADMIN,
        'description'=> 'When does this fire',
        'smart_tags' => [':variable1', ':variable2'],
    ],
],
```

### Stub Files

`resources/stubs/notification-templates/{Receiver}/{Channel}/{event}.stub`

- Plain text with `:variable` placeholders
- `MailChannel` stubs: subject + body
- `DatabaseChannel` stubs: header + body + footer
- `StubParser::getContents('path')` reads raw content

### Base Class

`TemplatedNotification` extends `Notification implements ShouldQueue`

- `via($notifiable)` — resolves channels from DB `notification_templates` table
- `toMail($notifiable)` — renders `PRX-backend::mail.templated-notification` blade
- `toDatabase($notifiable)` — returns array stored in `notifications` table

### NotificationTemplate Model

`PRAXXYS\Backend\Models\Settings\NotificationTemplate` — DB-driven templates

- Fields: `channel`, `slug`, `module`, `subject`, `receiver`, `header`, `body`, `footer`, `description`, `smart_tags` (JSON)
- Overrides stub defaults at runtime

### Notifiable Models

- `Admin` — `PRX-backend/src/Models/Admins/Admin.php`
- `User` — `app/Models/User.php`
- `Customer` — `app/Models/Accounts/Customer.php`

All use `Illuminate\Notifications\Notifiable` trait.

### Triggering Notification

Call from **service layer**, not controllers:

```php
Notifier::send('orders-order-received', $admins, [
    'order_no' => $order->order_no,
    'amount'   => $order->total,
]);
```

- Notifiable can be Model, Collection, email string, or array
- Model notifiables → dispatched via `SendTemplatedNotification` job (queued)
- Email notifiables → sent synchronously via `Notification::route('mail', $email)`
- Fires `TemplatedNotificationSent` event

### Jobs

`SendTemplatedNotification` — implements `ShouldQueue`.

### Events

`TemplatedNotificationSent` — carries `slug`, `notifiables`, `smartTags`.

### Receiver Constants

```php
NotificationReceiver::ADMIN     // from PRX-backend
NotificationReceiver::CUSTOMER  // project-level override
```

### Controllers

| Controller | Routes |
|------------|--------|
| `NotificationController` (Admin/Profile) | `admin.profile.notifications.*` — CRUD, read-all |
| `NotificationTemplateController` (Admin/Settings) | `admin.settings.notification-templates.*` — index, edit, update |
| `NotificationApiController` (Customer) | API: list, show, mark-read, delete |

### Best Practices

- Always use `Notifier::send()` — never instantiate `TemplatedNotification` directly
- Smart tags use `:variable` syntax (not `{variable}` or `{{variable}}`)
- Define stub files for every event + channel combination
- Register all notification events in `config/notification-templates/prx-backend.php`
- Use `NotificationReceiver` constants for receiver targeting
- Queue notification sending via `SendTemplatedNotification` job (automatic with Model notifiables)