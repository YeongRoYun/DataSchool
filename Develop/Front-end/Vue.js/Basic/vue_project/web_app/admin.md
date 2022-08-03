# Admin Login and Editor
```
 ----Admin---------------
| --Login--  --Editor--  |
||         ||          | |
| ---------  ----------  |
 ------------------------
```
## DB

| column | value |
| - | - |
| email | admin email(default: vue) |
| password | admin pw(default: vue) |
| grade | owner, manager, member |
| token | Login token |

## Login
### Status code

| status | Desc |
| - | - |
| ok | Complete login |
| login | Popup Login-window |
| update | Popup password update-window or first info-window |
| loading | Check token |

- When first info-window, `password = vue`
- Enter arbitrary admin-id, then create a new admin account
- After creating it, don't popup `update`
### Cookie

| status | Desc |
| - | - |
| stay | Save whether login is maintained or not |
| email | save login-email |
| token | save login-token |

## Editor
### Markdown
- WYSWYG
  - What You See Is What You Get
  - UI that the output is similar to input
- `npm i vue3-markdown-it`
