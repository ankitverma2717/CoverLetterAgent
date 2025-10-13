AI Cover Letter Generator
A full-stack application that leverages the Gemini API to generate personalized cover letters based on a user's resume and a job description. The application authenticates users via Google OAuth and creates the final cover letter as a Google Doc, which can then be previewed and downloaded as a PDF.
Features
Secure Google Authentication: Users log in safely with their Google accounts using OAuth2.
Dynamic Content Generation: Utilizes the Gemini API to create a tailored cover letter that matches resume skills with job requirements.
Google Docs Integration: Automatically creates a new, formatted Google Doc for each generated cover letter.
PDF Preview & Download: Allows users to preview the generated document within the app and download it as a PDF.
User-Provided API Key: Protects the host's API quota by requiring users to provide their own Gemini API key.
Tech Stack
Backend:
Java 17
Spring Boot 3
Spring Security (OAuth2 & JWT)
Google API Client Libraries (Docs, Drive)
Gradle
Frontend:
Next.js 14
React 19
TypeScript
Tailwind CSS
API:
Google Gemini API
Prerequisites
Before you begin, ensure you have the following installed on your system:
Java Development Kit (JDK): Version 17 or higher.
Node.js: Version 18 or higher (includes npm).
Git: For cloning the repository.
An IDE: IntelliJ IDEA (recommended for Spring Boot) or VS Code.
🚀 Setup and Installation
Follow these steps carefully to get the project running locally.
1. Clone the Repository
code
Bash
git clone <your-repository-url>
cd <your-repository-directory>
2. Backend Configuration (Critical Step)
The backend requires credentials from the Google Cloud Platform to function. You will need to create two sets of credentials: one for user authentication (OAuth 2.0) and one for your application's server-side actions (Service Account).
A. Getting Google OAuth 2.0 Credentials
This allows users to log in with their Google account.
Create a Google Cloud Project:
Go to the Google Cloud Console.
Create a new project (e.g., "Cover Letter Agent Dev").
Enable the necessary APIs:
In your new project, navigate to APIs & Services > Library.
Search for and enable the following two APIs:
Google Drive API
Google Docs API
Configure the OAuth Consent Screen:
Go to APIs & Services > OAuth consent screen.
Choose External for the User Type and click Create.
Fill in the required app information:
App name: AI Cover Letter Agent
User support email: Your email address
Developer contact information: Your email address
On the "Scopes" page, click Add or Remove Scopes. Find and add the following scopes:
.../auth/userinfo.email
.../auth/userinfo.profile
openid
.../auth/documents
.../auth/drive.readonly
On the "Test users" page, add the Google accounts you will use for testing (e.g., your own Gmail).
Create OAuth 2.0 Client ID:
Go to APIs & Services > Credentials.
Click + Create Credentials and select OAuth client ID.
Set the Application type to Web application.
Under Authorized redirect URIs, add the following URI:
http://localhost:8080/login/oauth2/code/google
Click Create. A modal will appear with your Client ID and Client Secret. Copy these values immediately. They will be used in the application.properties file.
B. Getting GCP Service Account Credentials (gcp-credentials.json)
This allows your backend server to act on its own behalf (though in this app, we primarily use user-delegated permissions). It's good practice to have it.
Create a Service Account:
Go to APIs & Services > Credentials.
Click + Create Credentials and select Service account.
Give it a name (e.g., cover-letter-service).
Grant it the Editor role for simplicity during development. For production, you should use more restrictive roles.
Click Done.
Generate a JSON Key:
Find your newly created service account in the "Credentials" list.
Click on it, then go to the KEYS tab.
Click Add Key > Create new key.
Select JSON as the key type and click Create.
A JSON file will be downloaded to your computer.
Place the Key in Your Project:
Rename the downloaded file to gcp-credentials.json.
Move this file into the src/main/resources/ directory of your project.
(The .gitignore file is already configured to ignore this file, so it will not be committed to Git).
C. Configure application.properties
In the src/main/resources/ directory, find the template file application-template.properties.
Create a copy of this file and rename it to application.properties.
Open application.properties and fill in the values you obtained:
Property	Value	Where to Find It
spring.security.oauth2.client.registration.google.client-id	YOUR_GOOGLE_CLIENT_ID	From Step A4 (Getting Google OAuth 2.0 Credentials).
spring.security.oauth2.client.registration.google.client-secret	YOUR_GOOGLE_CLIENT_SECRET	From Step A4 (Getting Google OAuth 2.0 Credentials).
jwt.secret	YOUR_SUPER_SECRET_AND_LONG_JWT_SIGNING_KEY	Generate a long, random, secure string. You can use an online generator for this.
3. Frontend Setup
The frontend setup is much simpler. Just install the dependencies.
code
Bash
# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install
▶️ Running the Application
You need to run the backend and frontend servers simultaneously in two separate terminals.
Run the Backend (Spring Boot):
Open a terminal in the project's root directory (CoverLetterAgent).
Use the Gradle wrapper to start the server:
code
Bash
./gradlew bootRun
The backend will start on http://localhost:8080.
Run the Frontend (Next.js):
Open a second terminal in the frontend directory.
Start the development server:
code
Bash
npm run dev
The frontend will be available at http://localhost:3000.
Open your browser and navigate to http://localhost:3000. You can now log in and use the application
