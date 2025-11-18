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
                        maxOutputTokens: 2048
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
        return `You are a professional cover letter writer. Based on the following resume and job description, write a compelling, professional cover letter.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

INSTRUCTIONS:
1. Write a professional cover letter that highlights relevant experience from the resume
2. Match the tone and requirements of the job description
3. Keep it concise (3-4 paragraphs)
4. Start with a strong opening
5. Include specific examples from the resume
6. End with a call to action

Format the output with these markers:
- Use [H1] for the candidate's name at the top
- Use [H2] for contact information
- Use [H3] for section headings
- Use regular paragraphs for body text

Generate the cover letter now:`;
    }

    formatCoverLetter(text) {
        return text.trim();
    }
}

export default new GeminiService();
