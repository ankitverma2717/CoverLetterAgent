import express from 'express';
import { generateContent, createDocument, previewContent } from '../controllers/coverLetterController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/generate-content', 
    authenticate, 
    upload.array('resumes', 5), 
    generateContent
);

router.post('/create-document', 
    authenticate, 
    createDocument
);

router.post('/preview', 
    authenticate, 
    previewContent
);

export default router;
