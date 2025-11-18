import googleDocsService from '../services/googleDocsService.js';
import { verifyToken } from '../config/jwt.js';

export const downloadDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const token = req.query.token;

        if (!documentId) {
            return res.status(400).json({ error: 'Document ID is required' });
        }

        let accessToken = req.user?.accessToken;

        if (!accessToken && token) {
            try {
                const decoded = verifyToken(token);
                accessToken = decoded.accessToken;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid token' });
            }
        }

        if (!accessToken) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const pdfBuffer = await googleDocsService.exportToPdf(documentId, accessToken);
        const title = await googleDocsService.getDocumentTitle(documentId, accessToken);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${title}.pdf"`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Download document error:', error);
        res.status(500).json({ 
            error: 'Failed to download document',
            message: error.message 
        });
    }
};

export const getDocumentInfo = async (req, res) => {
    try {
        const { documentId } = req.params;

        if (!documentId) {
            return res.status(400).json({ error: 'Document ID is required' });
        }

        const accessToken = req.user.accessToken;
        const title = await googleDocsService.getDocumentTitle(documentId, accessToken);

        res.json({ 
            documentId,
            title,
            url: `https://docs.google.com/document/d/${documentId}/edit`
        });
    } catch (error) {
        console.error('Get document info error:', error);
        res.status(500).json({ error: 'Failed to get document information' });
    }
};
