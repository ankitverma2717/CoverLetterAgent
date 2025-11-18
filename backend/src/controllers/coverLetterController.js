import geminiService from '../services/geminiService.js';
import googleDocsService from '../services/googleDocsService.js';
import pdfService from '../services/pdfService.js';

export const generateContent = async (req, res) => {
    try {
        const { jobDescription, apiKey } = req.body;
        const files = req.files;

        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'At least one resume file is required' });
        }

        if (!apiKey) {
            return res.status(400).json({ error: 'Gemini API key is required' });
        }

        const pdfBuffers = files.map(file => file.buffer);
        const resumeText = await pdfService.extractTextFromMultiple(pdfBuffers);

        const coverLetterContent = await geminiService.generateCoverLetter(
            resumeText,
            jobDescription,
            apiKey
        );

        res.json({ content: coverLetterContent });
    } catch (error) {
        console.error('Generate content error:', error);
        res.status(500).json({ 
            error: 'Failed to generate cover letter',
            message: error.message 
        });
    }
};

export const createDocument = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const accessToken = req.user.accessToken;

        const documentId = await googleDocsService.createDocument(
            title,
            content,
            accessToken
        );

        res.json({ documentId });
    } catch (error) {
        console.error('Create document error:', error);
        res.status(500).json({ 
            error: 'Failed to create document',
            message: error.message 
        });
    }
};

export const previewContent = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        res.json({ 
            preview: content,
            message: 'Content preview generated successfully'
        });
    } catch (error) {
        console.error('Preview error:', error);
        res.status(500).json({ error: 'Failed to generate preview' });
    }
};
