# 🚀 SkillForge – Backend

SkillForge is a **production-grade backend system** for a role-based project submission and review platform.  
It enables users to submit projects, admins to review them, generate certificates, and notify users — all using modern backend architecture.

---

## 📌 Features Overview

### 👤 User Features

- User registration & login (JWT authentication)
- Secure project submission with file upload
- View project status (Pending / Approved / Rejected)
- View admin feedback & score
- Download project completion certificate

### 🛠️ Admin Features

- Admin authentication & role-based access
- View all users and projects
- Approve or reject projects
- Add score & feedback
- Auto-generate certificates on approval
- Send email notifications to users

---

## 🧱 Tech Stack

| Layer                  | Technology                      |
| ---------------------- | ------------------------------- |
| Backend Runtime        | Node.js                         |
| Framework              | Express.js                      |
| Language               | TypeScript                      |
| Database               | PostgreSQL                      |
| ORM                    | Prisma                          |
| Authentication         | JWT                             |
| File Upload            | Multer                          |
| File Storage           | AWS S3                          |
| Email                  | Nodemailer (Gmail App Password) |
| Certificate Generation | PDFKit                          |
| Environment Config     | dotenv                          |

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Password hashing using bcrypt
- Role-based access control (USER / ADMIN)
- Protected routes using middleware

### Roles

- **USER** → Can submit projects & view status
- **ADMIN** → Can review, approve, and manage projects

---

## 🗄️ Database Design (Prisma)

### User

- id, name, email, password
- role (USER / ADMIN)
- projects relation

### Project

- title, fileUrl
- status (PENDING / APPROVED / REJECTED)
- score, feedback
- certificateUrl
- user relation

Enums are used for **roles and project status** to ensure data consistency.

---

## 📤 Project Submission Flow

1. User logs in
2. Uploads project file (ZIP / PDF, max 10MB)
3. File is uploaded to **AWS S3**
4. Project is stored in DB with status `PENDING`

---

## 🧑‍⚖️ Admin Review Workflow

1. Admin fetches all projects
2. Reviews a project
3. Sets:
   - Status (APPROVED / REJECTED)
   - Score
   - Feedback
4. If approved:
   - PDF certificate is generated
   - Uploaded to AWS S3
   - Certificate URL saved
5. Email notification sent to user

---

## 🏆 Certificate Generation

- Certificates are generated dynamically using **PDFKit**
- Landscape A4 layout with:
  - Certificate ID
  - Issue date
  - User name & project title
  - Branding & signature placeholders
- Temporary files stored in `/tmp` and cleaned after upload

---

## ☁️ File Storage (AWS S3)

- Used for:
  - Project uploads (ZIP/PDF)
  - Certificates
- Files uploaded using AWS SDK v3
- Public URLs stored in database
- Secure IAM user with scoped permissions

---

## ✉️ Email Notifications

- Email sent when project is reviewed
- Uses **Nodemailer + Gmail App Password**
- Dynamic email content with:
  - Project status
  - Score
  - Feedback

---

## 🛡️ Security & Best Practices

- Environment variables for secrets
- Centralized error handling
- Input validation
- Proper async/await usage
- Absolute file paths for filesystem safety
- Prisma migrations for schema consistency

---

## 🧪 API Highlights

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### User

- `POST /api/projects` → submit project
- `GET /api/projects/my` → user projects
- `GET /api/dashboard/user`

### Admin

- `GET /api/admin/projects`
- `PATCH /api/admin/projects/:id/review`
- `GET /api/dashboard/admin`

---

## ⚙️ Environment Variables

```env
PORT=5001
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret

AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=skillforge-files

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```
