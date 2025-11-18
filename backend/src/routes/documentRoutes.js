import express from 'express';
import { downloadDocument, getDocumentInfo } from '../controllers/documentController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:documentId/download', optionalAuth, downloadDocument);

router.get('/:documentId/info', authenticate, getDocumentInfo);

export default router;
