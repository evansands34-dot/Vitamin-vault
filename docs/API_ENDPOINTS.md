# VitaTrack API Documentation

## Base URL
```
https://api.vitatrack.com/v1
```

## Authentication
All endpoints (except auth) require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Response Format
All responses follow this standard format:
```json
{
  "success": boolean,
  "data": {},
  "message": "string",
  "error": null
}
```

## Auth Endpoints

### Register User
```
POST /auth/register
Body: { 
  email: string,
  password: string,
  firstName: string,
  lastName: string
}
Response: { userId, token, refreshToken, user }
```

### Login
```
POST /auth/login
Body: { email: string, password: string }
Response: { token, refreshToken, user }
```

### Refresh Token
```
POST /auth/refresh
Body: { refreshToken: string }
Response: { token, refreshToken }
```

### Logout
```
POST /auth/logout
Response: { success: boolean }
```

## User Endpoints

### Get Profile
```
GET /user/profile
Response: { user }
```

### Update Profile
```
PUT /user/profile
Body: { firstName, lastName, profilePictureUrl, darkMode }
Response: { user }
```

## Vitamins Endpoints

### Get All Vitamins
```
GET /vitamins
Query: { page?, limit?, category?, search? }
Response: { vitamins[], total, page, limit }
```

### Create Vitamin
```
POST /vitamins
Body: { 
  name: string,
  dosage: number,
  dosageUnit: string,
  frequency: string,
  category: string,
  startDate: date,
  endDate?: date,
  notes?: string,
  colorCode?: string
}
Response: { vitamin }
```

### Get Vitamin Details
```
GET /vitamins/:id
Response: { vitamin, reminders[], upcomingDoses[] }
```

### Update Vitamin
```
PUT /vitamins/:id
Body: { name, dosage, frequency, category, ... }
Response: { vitamin }
```

### Delete Vitamin
```
DELETE /vitamins/:id
Response: { success: boolean }
```

## Reminders Endpoints

### Create Reminder
```
POST /reminders
Body: { 
  vitaminId: string,
  timeOfDay: time,
  daysOfWeek: string[],
  notificationType: 'sound' | 'vibration' | 'silent'
}
Response: { reminder }
```

### Get Reminders
```
GET /reminders/:vitaminId
Response: { reminders[] }
```

### Update Reminder
```
PUT /reminders/:id
Body: { timeOfDay, daysOfWeek, enabled, notificationType }
Response: { reminder }
```

### Delete Reminder
```
DELETE /reminders/:id
Response: { success: boolean }
```

## Dose Logs Endpoints

### Get Today's Doses
```
GET /doses/today
Response: { 
  doses[],
  totalScheduled: number,
  totalTaken: number,
  totalSkipped: number,
  totalMissed: number
}
```

### Log Dose
```
POST /doses/:vitaminId/log
Body: { 
  status: 'taken' | 'skipped' | 'missed',
  actualTime?: timestamp,
  notes?: string
}
Response: { doseLog }
```

### Get Dose History
```
GET /doses/history
Query: { startDate, endDate, vitaminId? }
Response: { doses[] }
```

### Undo Dose Log
```
DELETE /doses/:doseLogId
Response: { success: boolean }
```

## Analytics Endpoints

### Get Daily Analytics
```
GET /analytics/daily
Query: { date }
Response: { 
  totalScheduled: number,
  totalTaken: number,
  consistencyScore: number,
  vitamins: {
    name: string,
    status: 'taken' | 'skipped' | 'missed'
  }[]
}
```

### Get Weekly Analytics
```
GET /analytics/weekly
Query: { weekStart: date }
Response: { dailyStats[] }
```

### Get Monthly Analytics
```
GET /analytics/monthly
Query: { month: number, year: number }
Response: { dailyStats[] }
```

## Streaks Endpoints

### Get All Streaks
```
GET /streaks
Response: { streaks[] }
```

### Get Streak Details
```
GET /streaks/:vitaminId
Response: { 
  currentStreak: number,
  longestStreak: number,
  lastCompletedDate: date
}
```

## Subscription Endpoints

### Get Subscription Status
```
GET /subscription
Response: { 
  tier: 'free' | 'premium' | 'family',
  features: string[],
  startDate: timestamp,
  endDate: timestamp,
  status: 'active' | 'cancelled' | 'expired'
}
```

### Upgrade Subscription
```
POST /subscription/upgrade
Body: { tier: string, paymentMethodId: string }
Response: { subscription }
```

### Cancel Subscription
```
POST /subscription/cancel
Response: { success: boolean }
```

## Export Endpoints (Premium)

### Export Report
```
GET /export/report
Query: { format: 'pdf' | 'csv', startDate, endDate }
Response: { downloadUrl: string }
```

### Export Health Data
```
GET /export/health-data
Query: { format: 'json' | 'csv' }
Response: { downloadUrl: string }
```

## Family Endpoints (Premium)

### Create Family Account
```
POST /family/accounts
Body: { familyName: string }
Response: { familyAccount }
```

### Invite Family Member
```
POST /family/:familyId/invite
Body: { email: string, role: 'member' | 'viewer' }
Response: { invitation }
```

### Get Family Members
```
GET /family/:familyId/members
Response: { members[] }
```

### Remove Family Member
```
DELETE /family/:familyId/members/:memberId
Response: { success: boolean }
```

## AI Recommendations Endpoint (Premium)

### Get AI Recommendations
```
GET /ai/recommendations
Query: { vitaminCategory?: string }
Response: { 
  recommendations: {
    vitaminName: string,
    dosage: string,
    frequency: string,
    reason: string
  }[]
}
```

## Backup Endpoints (Premium)

### Create Backup
```
POST /backup/create
Response: { backupId, status, createdAt }
```

### Get Backup History
```
GET /backup/history
Response: { backups[] }
```

### Restore From Backup
```
POST /backup/:backupId/restore
Response: { success: boolean }
```

## Error Responses

### Error Response Format
```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

### Common Error Codes
- `UNAUTHORIZED` - Invalid or missing token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input data
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_SERVER_ERROR` - Server error
