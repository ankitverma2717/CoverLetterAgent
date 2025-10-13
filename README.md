# AI Cover Letter Generator

A full-stack application that leverages the Gemini API to generate personalized cover letters based on a user's resume and a job description. The application authenticates users via Google OAuth and creates the final cover letter as a Google Doc.

## Features

- **Secure Google Authentication:** Users log in safely with their Google accounts using OAuth2.
- **Dynamic Content Generation:** Utilizes the Gemini API to create a tailored cover letter that matches resume skills with job requirements.
- **Google Docs Integration:** Automatically creates a new, formatted Google Doc for each generated cover letter.
- **Preview & Edit:** Allows users to preview the generated content before creating the final document.
- **Modern Dark UI:** Beautiful, responsive interface with dark theme.

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.5.6
- Spring Security (OAuth2)
- Google API Client Libraries (Docs API)
- Gradle 8.14.3
- Apache PDFBox 3.0.2

### Frontend
- Next.js 15.5.4
- React 19
- TypeScript 5
- Tailwind CSS 4
- Lucide React (Icons)

### API
- Google Gemini API (gemini-1.5-flash)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Java Development Kit (JDK):** Version 21 or higher
- **Node.js:** Version 18 or higher (includes npm)
- **Git:** For cloning the repository
- **An IDE:** IntelliJ IDEA (recommended for Spring Boot) or VS Code

---

## 🚀 Setup and Installation

Follow these steps carefully to get the project running locally.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd CoverLetterAgent
```

---

### 2. Backend Configuration (Critical Step)

The backend requires credentials from the Google Cloud Platform to function. You will need to create OAuth 2.0 credentials for user authentication.

#### A. Getting Google OAuth 2.0 Credentials

This allows users to log in with their Google account.

1. **Create a Google Cloud Project:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (e.g., "Cover Letter Agent")

2. **Enable the necessary APIs:**
   - In your new project, navigate to **APIs & Services > Library**
   - Search for and enable the following APIs:
     - **Google Docs API**
     - **Google Drive API** (optional, for future features)

3. **Configure the OAuth Consent Screen:**
   - Go to **APIs & Services > OAuth consent screen**
   - Choose **External** for the User Type and click **Create**
   - Fill in the required app information:
     - **App name:** AI Cover Letter Generator
     - **User support email:** Your email address
     - **Developer contact information:** Your email address
   - On the "Scopes" page, click **Add or Remove Scopes**. Find and add:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`
     - `.../auth/documents`
   - On the "Test users" page, add the Google accounts you will use for testing

4. **Create OAuth 2.0 Client ID:**
   - Go to **APIs & Services > Credentials**
   - Click **+ Create Credentials** and select **OAuth client ID**
   - Set the **Application type** to **Web application**
   - Under **Authorized redirect URIs**, add:
     ```
     http://localhost:8080/login/oauth2/code/google
     ```
   - Click **Create**
   - **Copy the Client ID and Client Secret** - you'll need these next

#### B. Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Get API Key**
3. Create a new API key or use an existing one
4. Copy the API key

#### C. Configure application.properties

1. Navigate to `src/main/resources/`
2. Open `application.properties`
3. Update the following values:

```properties
spring.application.name=CoverLetterAgent

# Replace with your Google OAuth credentials
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
spring.security.oauth2.client.registration.google.scope=openid,email,profile,https://www.googleapis.com/auth/documents
spring.security.oauth2.client.registration.google.redirect-uri=http://localhost:8080/login/oauth2/code/google

logging.level.org.springframework.security=DEBUG

# Replace with your Gemini API key
ai.provider.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
ai.provider.api.key=YOUR_GEMINI_API_KEY
```

**Replace:**
- `YOUR_GOOGLE_CLIENT_ID` - From Step A4
- `YOUR_GOOGLE_CLIENT_SECRET` - From Step A4
- `YOUR_GEMINI_API_KEY` - From Step B

---

### 3. Frontend Setup

Install the frontend dependencies:

```bash
# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install

# Return to project root
cd ..
```

---

## ▶️ Running the Application

You need to run the backend and frontend servers simultaneously in two separate terminals.

### Terminal 1: Run the Backend (Spring Boot)

```bash
# From the project root directory
./gradlew bootRun
```

The backend will start on `http://localhost:8080`

**Expected output:**
```
Started CoverLetterAgentApplication in X.XXX seconds
Tomcat started on port 8080 (http)
```

### Terminal 2: Run the Frontend (Next.js)

```bash
# Navigate to frontend directory
cd frontend

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

**Expected output:**
```
✓ Ready in Xms
- Local: http://localhost:3000
```

---

## 📖 How to Use

1. **Open your browser** and navigate to `http://localhost:3000`

2. **Log in with Google:**
   - Click the "Login with Google" button
   - Authenticate with your Google account
   - Grant the necessary permissions

3. **Upload Resume:**
   - Drag and drop your resume (PDF format) or click "Browse Files"
   - You can upload up to 10 resumes

4. **Paste Job Description:**
   - Copy the job posting you're applying for
   - Paste it into the "Job Description" text area

5. **Generate Cover Letter:**
   - Click "Generate Cover Letter"
   - Wait for AI to generate the content (usually 5-10 seconds)

6. **Preview and Confirm:**
   - Review the generated cover letter in the preview modal
   - Click "Confirm & Create Document" to create a Google Doc
   - The document will open in a new tab

7. **Edit and Download:**
   - Make any final edits in Google Docs
   - Download as PDF or share directly

---

## 🏗️ Project Structure

```
CoverLetterAgent/
├── frontend/                  # Next.js frontend application
│   ├── app/
│   │   ├── page.tsx          # Main application page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── package.json
│   └── tsconfig.json
│
├── src/main/
│   ├── java/com/example/coverletteragent/
│   │   ├── config/           # Security & CORS configuration
│   │   ├── controller/       # REST API endpoints
│   │   ├── service/          # Business logic
│   │   │   ├── AIService.java
│   │   │   ├── GeminiServiceImpl.java
│   │   │   ├── GoogleDocsService.java
│   │   │   └── CoverLetterServiceImpl.java
│   │   └── CoverLetterAgentApplication.java
│   │
│   └── resources/
│       └── application.properties  # Configuration file
│
├── build.gradle              # Gradle build configuration
├── settings.gradle
└── README.md                 # This file
```

---

## 🔧 Troubleshooting

### Backend Issues

**Issue:** "Could not resolve placeholder 'ai.provider.api.key'"
- **Solution:** Make sure you've added your Gemini API key to `application.properties`

**Issue:** "401 Unauthorized" when creating Google Doc
- **Solution:** 
  - Check that Google Docs API is enabled in Google Cloud Console
  - Verify OAuth scopes include `https://www.googleapis.com/auth/documents`
  - Try logging out and logging in again

**Issue:** Gradle build fails
- **Solution:** 
  ```bash
  ./gradlew clean
  ./gradlew build --refresh-dependencies
  ```

### Frontend Issues

**Issue:** "Module not found: Can't resolve 'lucide-react'"
- **Solution:** 
  ```bash
  cd frontend
  npm install lucide-react
  ```

**Issue:** "CORS error" in browser console
- **Solution:** Verify backend is running on port 8080 and frontend on port 3000

---

## 🚀 Deployment (Production)

### Backend Deployment

Update `application.properties` for production:

```properties
# Update redirect URI to your production domain
spring.security.oauth2.client.registration.google.redirect-uri=https://yourdomain.com/login/oauth2/code/google
```

Update Google Cloud Console:
- Add production redirect URI to OAuth 2.0 credentials
- Update OAuth consent screen with production URLs

### Frontend Deployment

Update API URLs in `frontend/app/page.tsx`:

```typescript
// Change localhost to your production backend URL
const response = await fetch('https://api.yourdomain.com/api/v1/user', ...);
```

Deploy to Vercel, Netlify, or your preferred platform.

---

## 📝 API Endpoints

### Authentication
- `GET /api/v1/user` - Get current authenticated user

### Cover Letter Generation
- `POST /api/v1/cover-letter/generate-content` - Generate cover letter content
  - Form data: `resumes` (file), `jobDescription` (string)
  - Returns: JSON with generated content

- `POST /api/v1/cover-letter/create-document` - Create Google Doc
  - Body: `{ "content": "...", "title": "..." }`
  - Returns: JSON with document URL

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Google Gemini API for AI-powered content generation
- Google Docs API for document creation
- Spring Boot and Next.js communities

---

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ by Ankit Verma**
