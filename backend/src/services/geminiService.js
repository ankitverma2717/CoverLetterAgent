import axios from 'axios';

export class GeminiService {
    constructor() {
        this.apiUrl = process.env.AI_PROVIDER_URL;
    }

    async generateCoverLetter(resumeText, jobDescription, apiKey) {
        try {
            const prompt = this.buildPrompt(resumeText, jobDescription);

            const response = await axios.post(
                `${this.apiUrl}?key=${apiKey}`,
                {
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 4096
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const generatedText = response.data.candidates[0].content.parts[0].text;
            return this.formatCoverLetter(generatedText);
        } catch (error) {
            console.error('Gemini API Error:', error.response?.data || error.message);
            throw new Error('Failed to generate cover letter using AI');
        }
    }

    buildPrompt(resumeText, jobDescription) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return `You are a professional cover letter writer. Based on the following resume and job description, write a compelling, professional cover letter that matches the exact tone, professionalism, and structure of the example provided.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

CURRENT DATE: ${currentDate}

CRITICAL INSTRUCTIONS:

1. HEADER FORMAT (Extract from RESUME):
   - Line 1: [H1]Candidate's Full Name
   - Line 2: [H2]City, State/Province (from resume)
   - Line 3: [H2]Email (from resume)
   - Line 4: [H2]Phone Number (from resume)
   - Line 5: Empty line
   - Line 6: [H2]${currentDate}
   - Line 7: Empty line
   - Line 8: [H3]Hiring Manager
   - Line 9: [H3]Company Name (extract from job description)
   - Line 10: [H3]Company Location/Address (extract from job description)
   - Line 11: Empty line

2. SALUTATION:
   - Use "Dear [Company Name] Hiring Team," format

3. BODY STRUCTURE (3-4 paragraphs, CONCISE for one page):
   
   Paragraph 1 - Opening (2-3 sentences):
   - Express enthusiastic interest in the specific position at the company
   - Do NOT mention where you saw the job posting
   - Briefly state how your background aligns with the company's mission/goals
   - Use specific details from the job description
   
   Paragraph 2 - Experience & Achievements (3-4 sentences):
   - Highlight specific, quantifiable achievements from the resume
   - Connect these achievements directly to the job requirements
   - Use concrete numbers and metrics
   - Show how your experience is relevant to their goals
   
   Paragraph 3 - Technical Skills Match (structured as flowing paragraph, NOT bullet points):
   - Write as a cohesive paragraph describing how your skills match their requirements
   - Use phrases like "My skills directly match the requirements:"
   - Then describe each skill area in sentence form
   - Example: "Core Languages & Microservices: Deep experience in Java, Spring Boot, and building robust RESTful/GraphQL APIs. Event-Driven & Cloud: Expertise in Apache Kafka..."
   - Do NOT use asterisks (**), bullet points (•), or any special formatting
   - Keep it as plain paragraph text with skill categories followed by descriptions
   
   Paragraph 4 - Cultural Fit & Closing (2-3 sentences):
   - Reference the company's values or mission (extract from job description)
   - Express eagerness to contribute
   - Include a forward-looking statement about discussion

4. CLOSING (CRITICAL - NO SPACE BETWEEN SINCERELY AND NAME):
   - "Thank you for your time and consideration."
   - Empty line
   - "Sincerely,"
   - [H3]Candidate's Full Name (IMMEDIATELY after "Sincerely," - NO empty line)

5. LENGTH CONSTRAINT:
   - MUST fit on ONE PAGE when printed
   - Keep total length to approximately 350-450 words
   - Be concise and impactful
   - Avoid repetition

6. FORMATTING RULES (CRITICAL):
   - Do NOT use asterisks (**) for bold text
   - Do NOT use bullet points (•, -, *)
   - Do NOT use markdown formatting
   - Write skills as flowing paragraphs with category labels followed by descriptions
   - Use plain text only with [H1], [H2], [H3] markers as specified
   - Do NOT include LinkedIn or GitHub URLs

7. TONE & STYLE REQUIREMENTS:
   - Professional yet enthusiastic
   - Confident but not arrogant
   - Specific and quantifiable (use numbers, percentages, metrics)
   - Show deep understanding of both the role and company
   - Use active voice
   - Demonstrate genuine interest in the company's mission
   - Balance technical expertise with cultural fit
   - Use phrases like "I am writing to express my enthusiastic interest"

8. CONTENT ANALYSIS:
   - Analyze the job description for: company values, technical requirements, team culture, business goals
   - Extract: company name, location, position title, key technologies
   - Match resume experiences to job requirements with specific examples
   - Use terminology and keywords from the job description

Generate the cover letter now, following this EXACT structure and tone. Make it compelling, specific, tailored, and CONCISE enough to fit on one page.`;
    }

    formatCoverLetter(text) {
        return text.trim();
    }

    async extractCompanyName(jobDescription, apiKey) {
        try {
            const prompt = `Extract ONLY the company name from this job description. Return just the company name, nothing else.\n\nJob Description:\n${jobDescription}\n\nCompany Name:`;

            const response = await axios.post(
                `${this.apiUrl}?key=${apiKey}`,
                {
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 50
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const companyName = response.data.candidates[0].content.parts[0].text.trim();
            return companyName || 'Company';
        } catch (error) {
            console.error('Company name extraction error:', error.response?.data || error.message);
            return 'Company';
        }
    }
}

export default new GeminiService();
