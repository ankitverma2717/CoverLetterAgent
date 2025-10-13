# CoverCraft AI 🚀

<div align="center">

![CoverCraft AI Banner](https://via.placeholder.com/1200x300/1a1a2e/ffffff?text=CoverCraft+AI+-+AI-Powered+Cover+Letter+Generator)

**Create Perfect, Professional Cover Letters in Seconds**

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/yourusername/covercraft-ai)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen?logo=spring)](https://spring.io/projects/spring-boot)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Demo](#-demo) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Demo](#-demo)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About

**CoverCraft AI** is a next-generation, AI-powered web application that revolutionizes the job application process. Built with cutting-edge technologies including **Gemini 2.5 Flash AI**, **Spring Boot**, and **Next.js**, CoverCraft analyzes your resume and job descriptions to generate perfectly tailored, professional cover letters in under 30 seconds.

### Why CoverCraft AI?

- ⚡ **Lightning Fast** - Generate cover letters in <30 seconds
- 🎯 **Highly Personalized** - AI analyzes your resume and the job posting
- 🔒 **Secure & Private** - Your data is encrypted and never stored
- 📄 **Google Docs Integration** - Export directly to editable Google Docs
- 🎨 **Beautiful UI** - Modern, dark-themed interface with smooth animations

---

## 🎬 Demo

### Landing Page
Experience our stunning landing page with god-level animations and a seamless user journey.

![Landing Page Demo](<img width="2559" height="1409" alt="image" src="https://github.com/user-attachments/assets/cf484236-a1da-4400-9a30-50b861bd0c3d" />)

### Main Application
Generate professional cover letters with an intuitive, drag-and-drop interface.

![Application Demo](<img width="2550" height="1392" alt="image" src="https://github.com/user-attachments/assets/b3c7a329-8f77-43d2-b5fa-2ac871453a05" />)

**[🎥 Watch Full Video Demo →](#)**

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security
- **Google OAuth 2.0** - Secure login
- **JWT Token Management** - Stateless authentication
- **Refresh Token Support** - Extended sessions
- **User Profile Management** - View permissions

</td>
<td width="50%">

### 🤖 AI-Powered Generation
- **Gemini 2.5 Flash Integration** - State-of-the-art AI
- **Context-Aware Analysis** - Matches resume to job
- **Dynamic Content Creation** - Unique every time
- **Professional Formatting** - Industry standards

</td>
</tr>
<tr>
<td width="50%">

### 📄 Document Management
- **Google Docs Export** - Fully formatted documents
- **PDF Download** - Instant PDF generation
- **Preview & Edit** - Review before creating
- **Custom Naming** - User_Company format

</td>
<td width="50%">

### 🎨 User Experience
- **Dark Theme UI** - Modern and elegant
- **Drag & Drop Upload** - Easy file handling
- **Real-time Validation** - Instant feedback
- **Responsive Design** - Works on all devices

</td>
</tr>
</table>

---

## 📸 Screenshots

### 1️⃣ Landing Page

<div align="center">

![Landing Hero](<img width="2559" height="1409" alt="image" src="https://github.com/user-attachments/assets/a1359c5f-ac81-4316-9a40-15f96dbb077c" />)

*Beautiful hero section with gradient animations and floating stats*

</div>

<br>

<div align="center">

![Features Section](<img width="2284" height="1282" alt="image" src="https://github.com/user-attachments/assets/7c5eb5a2-1188-47fc-807b-5a3d8e3cb9be" />)

*Interactive feature cards with hover effects*

</div>

<br>

<div align="center">

![How It Works](<img width="2118" height="869" alt="image" src="https://github.com/user-attachments/assets/6b6ae9f6-3a13-41e5-bb2e-2cf719664811" />)

*Step-by-step visual guide with progress indicators*

</div>

---

### 2️⃣ Main Application Interface

<div align="center">

![Main App Interface](<img width="2529" height="1382" alt="image" src="https://github.com/user-attachments/assets/c9162215-f539-4354-b950-913c5b3d645b" />)

*Split-screen interface: Job Description (Left) + Resume Upload (Right)*

</div>

**Key Elements:**
- 📝 **Left Panel** - Large textarea for job description with character counter
- 📤 **Right Panel** - Drag & drop resume upload area with file list
- 🎯 **Generate Button** - Prominent CTA button with disabled state handling

---

### 3️⃣ User Profile & Settings

<div align="center">

![User Profile](<img width="678" height="892" alt="image" src="https://github.com/user-attachments/assets/f371a9da-024d-4e70-bd42-92293e880e99" />)

*Profile dropdown showing user info, API key management, and permissions*

</div>

**Features:**
- 👤 User name and email display
- 🔑 Gemini API key management
- ✅ OAuth permissions list
- 🚪 Logout functionality

---

### 4️⃣ API Key Setup Modal

<div align="center">

![API Key Modal](<img width="987" height="627" alt="image" src="https://github.com/user-attachments/assets/689c9cc7-b852-4718-a25e-5c65201d41aa" />)

*Step-by-step guide to obtain and enter Gemini API key*

</div>

**Features:**
- 📋 Clear instructions with links
- ✅ Validation before saving
- 🔒 Password field for security
- 🎨 Clean, modern design

---

### 5️⃣ Preview Modal

<div align="center">

![Preview Modal](<img width="1140" height="1305" alt="image" src="https://github.com/user-attachments/assets/85cc75a1-2e58-4e54-9f25-275564a2d1b7" />)

*Preview generated content before creating the document*

</div>

**Features:**
- 📄 Full-screen preview
- ✏️ "Cancel & Edit" option
- ✅ "Confirm & Create Document" action
- 🎨 Formatted text display

---

### 6️⃣ Document Viewer & Download

<div align="center">

![Document Viewer](<img width="1321" height="1310" alt="image" src="https://github.com/user-attachments/assets/ee73dc6b-9b4f-4e9b-819a-e1d2728ba4a5" />)

*Embedded PDF viewer with download functionality*

</div>

**Features:**
- 🖼️ Embedded PDF preview via iframe
- 💾 One-click PDF download
- 📛 Auto-generated filename: `User_Company_CoverLetter.pdf`
- ✖️ Close button to return to main app

---

## 🛠️ Tech Stack

### Backend
```
Java 21
├── Spring Boot 3.5.6
├── Spring Security (OAuth2 + JWT)
├── Google API Client Libraries
│   ├── Docs API v1-rev20210211-1.31.0
│   └── Drive API (for PDF export)
├── Apache PDFBox 3.0.2
└── Gradle 8.14.3
```

### Frontend
```
Next.js 15.5.4
├── React 19
├── TypeScript 5
├── Tailwind CSS 4
├── Lucide React (Icons)
└── Dynamic Imports
```

### APIs & Services
- **Google Gemini API** - gemini-2.5-flash (AI generation)
- **Google OAuth 2.0** - User authentication
- **Google Docs API** - Document creation
- **Google Drive API** - PDF export

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Java (JDK) | 21+ | [Download](https://adoptium.net/) |
| Node.js | 18+ | [Download](https://nodejs.org/) |
| npm | 9+ | Included with Node.js |
| Git | Latest | [Download](https://git-scm.com/) |

**Recommended IDEs:**
- Backend: IntelliJ IDEA Community Edition or Ultimate
- Frontend: VS Code with TypeScript extension

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/covercraft-ai.git
cd covercraft-ai
```

### 2️⃣ Backend Setup

#### A. Configure Google Cloud Platform

**Step 1: Create a Google Cloud Project**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project"
3. Name: "CoverCraft AI"
4. Click "Create"

**Step 2: Enable Required APIs**

Navigate to **APIs & Services > Library** and enable:
- ✅ Google Docs API
- ✅ Google Drive API
- ✅ Google+ API (for OAuth)

**Step 3: Configure OAuth Consent Screen**

1. Go to **APIs & Services > OAuth consent screen**
2. Choose **External** user type
3. Fill in application information:
   ```
   App name: CoverCraft AI
   User support email: your-email@example.com
   Developer contact: your-email@example.com
   ```
4. Add scopes:
   - `openid`
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `.../auth/documents`
   - `.../auth/drive.readonly`
5. Add test users (your Gmail accounts)
6. Click "Save and Continue"

**Step 4: Create OAuth 2.0 Credentials**

1. Go to **APIs & Services > Credentials**
2. Click **+ Create Credentials** > **OAuth client ID**
3. Application type: **Web application**
4. Authorized redirect URIs:
   ```
   http://localhost:8080/login/oauth2/code/google
   ```
5. Click **Create**
6. **Copy Client ID and Client Secret** ⚠️

#### B. Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Click "Get API Key"
3. Create/Select a project
4. Copy the API key

**Note:** Users will enter their own API keys in the app, but you need one for testing.

#### C. Configure Application Properties

1. Navigate to `src/main/resources/`
2. Create `application.properties` from the template:

```bash
cp src/main/resources/application-template.properties src/main/resources/application.properties
```

3. Edit `application.properties`:

```properties
spring.application.name=CoverLetterAgent

# Google OAuth Credentials (from Step 4)
spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID_HERE
spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET_HERE
spring.security.oauth2.client.registration.google.scope=openid,email,profile,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/drive.readonly
spring.security.oauth2.client.registration.google.redirect-uri=http://localhost:8080/login/oauth2/code/google

# JWT Secret (generate a random string)
jwt.secret=YOUR_SUPER_SECRET_JWT_KEY_MIN_512_BITS_LONG

# Gemini API
ai.provider.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent

# OAuth Settings (force refresh token)
spring.security.oauth2.client.provider.google.authorization-uri=https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline
spring.security.oauth2.client.provider.google.token-uri=https://oauth2.googleapis.com/token
```

#### D. Build the Backend

```bash
# From project root
./gradlew clean build
```

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Return to project root
cd ..
```

---

## 🚀 Usage

### Running the Application

You need **two terminal windows**:

#### Terminal 1: Backend (Spring Boot)

```bash
# From project root
./gradlew bootRun
```

**Expected Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::               (v3.5.6)

...
Started CoverLetterAgentApplication in 4.5 seconds
Tomcat started on port(s): 8080 (http)
```

✅ Backend ready at `http://localhost:8080`

#### Terminal 2: Frontend (Next.js)

```bash
# Navigate to frontend
cd frontend

# Start development server
npm run dev
```

**Expected Output:**
```
   ▲ Next.js 15.5.4
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.x:3000

 ✓ Ready in 2.5s
```

✅ Frontend ready at `http://localhost:3000`

---

### 📖 User Journey

#### 1. **Landing Page**
- Open `http://localhost:3000`
- View the animated landing page
- Click **"Get Started Free"** or **"Login with Google"**

#### 2. **Google Authentication**
- Google OAuth consent screen appears
- Select your Google account
- Grant requested permissions
- Redirected back to application

#### 3. **API Key Setup** (First-time only)
- Modal prompts for Gemini API key
- Follow instructions to get key from Google AI Studio
- Paste and save API key (stored in browser localStorage)

#### 4. **Generate Cover Letter**

**Step 1:** Upload Resume
- Drag & drop PDF or click "Browse Files"
- See uploaded file with number badge

**Step 2:** Paste Job Description
- Copy job posting from company website
- Paste into left textarea

**Step 3:** Generate
- Click "Generate Cover Letter"
- Wait 5-10 seconds for AI processing

**Step 4:** Review Preview
- Preview modal shows generated content
- Choose "Cancel & Edit" or "Confirm & Create Document"

**Step 5:** Download Document
- Document viewer shows PDF preview
- Click "Download PDF" to save
- Filename format: `YourName_CompanyName_CoverLetter.pdf`

---

## 📁 Project Structure

```
covercraft-ai/
│
├── frontend/                      # Next.js Application
│   ├── app/
│   │   ├── components/
│   │   │   └── CoverLetterApp.tsx    # Main app component
│   │   ├── landing/
│   │   │   └── page.tsx              # Landing page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Router (landing ↔ app)
│   │   └── globals.css               # Global styles + animations
│   ├── public/                       # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── src/main/
│   ├── java/com/example/coverletteragent/
│   │   ├── config/
│   │   │   ├── SecurityConfig.java          # OAuth + JWT
│   │   │   ├── WebConfig.java               # CORS
│   │   │   ├── JwtAuthenticationFilter.java # JWT filter
│   │   │   └── CustomAuthenticationSuccessHandler.java
│   │   │
│   │   ├── controller/
│   │   │   ├── AuthController.java          # Token refresh
│   │   │   ├── CoverLetterController.java   # Generation endpoints
│   │   │   └── DocumentController.java      # PDF download
│   │   │
│   │   ├── service/
│   │   │   ├── AIService.java               # Interface
│   │   │   ├── GeminiServiceImpl.java       # Gemini API calls
│   │   │   ├── GoogleDocsService.java       # Docs creation + PDF
│   │   │   ├── CoverLetterServiceImpl.java  # Business logic
│   │   │   ├── AuthService.java             # Token refresh
│   │   │   └── JwtTokenProvider.java        # JWT management
│   │   │
│   │   └── CoverLetterAgentApplication.java # Main entry point
│   │
│   └── resources/
│       ├── application.properties           # Main config (gitignored)
│       └── application-template.properties  # Template for users
│
├── gradle/                        # Gradle wrapper
├── build.gradle                   # Dependencies
├── settings.gradle
├── .gitignore
└── README.md                      # This file
```

---

## 📡 API Documentation

### Authentication

#### `POST /oauth2/authorization/google`
Initiates Google OAuth flow

**Response:** Redirects to Google consent screen

---

#### `GET /login/oauth2/code/google`
OAuth callback endpoint

**Query Params:**
- `code` - Authorization code from Google

**Response:** Redirects to frontend with JWT token

---

#### `POST /api/v1/auth/refresh`
Refresh expired JWT token

**Headers:**
```
Authorization: Bearer <expired_jwt>
```

**Response:**
```json
{
  "token": "new_jwt_token_here"
}
```

---

### Cover Letter Generation

#### `POST /api/v1/cover-letter/generate-content`
Generate cover letter content using AI

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body (multipart/form-data):**
- `resumes` - PDF file
- `jobDescription` - String
- `apiKey` - User's Gemini API key

**Response:**
```json
{
  "content": "[H1]John Doe\n[H2]..."
}
```

---

#### `POST /api/v1/cover-letter/create-document`
Create Google Doc from generated content

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Cover Letter - Google",
  "content": "[H1]John Doe\n..."
}
```

**Response:**
```json
{
  "documentId": "1abc123..."
}
```

---

### Document Management

#### `GET /api/v1/document/{documentId}/download`
Download document as PDF

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Params (alternative):**
- `token` - JWT token (for iframe)

**Response:** PDF file stream

---

## 🌐 Deployment

### Backend (Spring Boot)

#### Option 1: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create covercraft-api

# Set environment variables
heroku config:set GOOGLE_CLIENT_ID=your_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

#### Option 2: AWS Elastic Beanstalk

1. Package application:
   ```bash
   ./gradlew build
   ```
2. Upload `build/libs/CoverLetterAgent-0.0.1-SNAPSHOT.jar`
3. Configure environment variables in AWS console

**Important:** Update OAuth redirect URI in Google Cloud Console:
```
https://api.yourdomain.com/login/oauth2/code/google
```

---

### Frontend (Next.js)

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Environment Variables:**
- `NEXT_PUBLIC_API_URL` - Your backend URL

#### Option 2: Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/.next`

**Update API URLs:**

In `frontend/app/components/CoverLetterApp.tsx`, replace:
```typescript
const response = await fetch('http://localhost:8080/api/...')
```

With:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const response = await fetch(`${API_URL}/api/...`)
```

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>❌ "Could not resolve placeholder 'ai.provider.api.key'"</b></summary>

**Cause:** Missing API key in application.properties

**Solution:**
1. Check `src/main/resources/application.properties` exists (not just template)
2. Ensure all required properties are filled
3. Restart Spring Boot application

</details>

<details>
<summary><b>❌ "401 Unauthorized" when generating cover letter</b></summary>

**Cause:** JWT token expired or invalid

**Solution:**
1. Check browser console for token
2. Try logging out and logging in again
3. Verify JWT secret is at least 512 bits

</details>

<details>
<summary><b>❌ "CORS error" in browser console</b></summary>

**Cause:** Backend not allowing frontend origin

**Solution:**
1. Verify backend is running on port 8080
2. Verify frontend is running on port 3000
3. Check `WebConfig.java` has correct origins

</details>

<details>
<summary><b>❌ Google OAuth shows "Error 400: redirect_uri_mismatch"</b></summary>

**Cause:** Redirect URI not registered in Google Cloud

**Solution:**
1. Go to Google Cloud Console > Credentials
2. Edit OAuth 2.0 Client
3. Add redirect URI: `http://localhost:8080/login/oauth2/code/google`
4. Save changes

</details>

<details>
<summary><b>❌ "Module not found: Can't resolve 'lucide-react'"</b></summary>

**Cause:** Missing frontend dependency

**Solution:**
```bash
cd frontend
npm install lucide-react
npm run dev
```

</details>

<details>
<summary><b>❌ Gradle build fails with dependency errors</b></summary>

**Cause:** Cached corrupted dependencies

**Solution:**
```bash
./gradlew clean
rm -rf ~/.gradle/caches/
./gradlew build --refresh-dependencies
```

</details>

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- **Backend:** Follow Google Java Style Guide
- **Frontend:** Use ESLint and Prettier
- **Commits:** Use Conventional Commits format

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Ankit Verma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- **Google Gemini API** - For providing state-of-the-art AI generation
- **Google Cloud Platform** - For OAuth and Docs API infrastructure
- **Spring Boot Team** - For the excellent framework
- **Vercel & Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For making styling effortless
- **Lucide Icons** - For beautiful, consistent icons

---

## 📧 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/yourusername/covercraft-ai/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/covercraft-ai/discussions)
- **Email:** ankitv2717@outlook.com
- **LinkedIn:** [Ankit Verma](https://linkedin.com/in/yourprofile)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by [Ankit Verma](https://github.com/yourusername)

[🔝 Back to Top](#covercraft-ai-)

</div>
