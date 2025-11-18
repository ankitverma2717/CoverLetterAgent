import { google } from 'googleapis';

export class GoogleDocsService {
    constructor() {
        this.docs = null;
        this.drive = null;
    }

    initializeClient(accessToken) {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });

        this.docs = google.docs({ version: 'v1', auth: oauth2Client });
        this.drive = google.drive({ version: 'v3', auth: oauth2Client });
    }

    async createDocument(title, content, accessToken) {
        try {
            this.initializeClient(accessToken);

            const createResponse = await this.docs.documents.create({
                requestBody: {
                    title: title
                }
            });

            const documentId = createResponse.data.documentId;

            const requests = this.parseContentToRequests(content);
            
            if (requests.length > 0) {
                await this.docs.documents.batchUpdate({
                    documentId: documentId,
                    requestBody: {
                        requests: requests
                    }
                });
            }

            return documentId;
        } catch (error) {
            console.error('Google Docs API Error:', error.message);
            throw new Error('Failed to create Google Document');
        }
    }

    parseContentToRequests(content) {
        const requests = [];
        const lines = content.split('\n');
        let index = 1;

        for (const line of lines) {
            if (line.trim() === '') {
                requests.push({
                    insertText: {
                        location: { index },
                        text: '\n'
                    }
                });
                index += 1;
                continue;
            }

            let text = line;
            let style = {};

            if (line.startsWith('[H1]')) {
                text = line.replace('[H1]', '').trim() + '\n';
                style = { bold: true, fontSize: { magnitude: 16, unit: 'PT' } };
            } else if (line.startsWith('[H2]')) {
                text = line.replace('[H2]', '').trim() + '\n';
                style = { fontSize: { magnitude: 12, unit: 'PT' } };
            } else if (line.startsWith('[H3]')) {
                text = line.replace('[H3]', '').trim() + '\n';
                style = { bold: true, fontSize: { magnitude: 11, unit: 'PT' } };
            } else {
                text = line + '\n';
                style = { fontSize: { magnitude: 11, unit: 'PT' } };
            }

            requests.push({
                insertText: {
                    location: { index },
                    text: text
                }
            });

            const endIndex = index + text.length - 1;

            if (Object.keys(style).length > 0) {
                requests.push({
                    updateTextStyle: {
                        range: {
                            startIndex: index,
                            endIndex: endIndex
                        },
                        textStyle: style,
                        fields: Object.keys(style).join(',')
                    }
                });
            }

            index += text.length;
        }

        return requests;
    }

    async exportToPdf(documentId, accessToken) {
        try {
            this.initializeClient(accessToken);

            const response = await this.drive.files.export(
                {
                    fileId: documentId,
                    mimeType: 'application/pdf'
                },
                { responseType: 'arraybuffer' }
            );

            return Buffer.from(response.data);
        } catch (error) {
            console.error('Google Drive Export Error:', error.message);
            throw new Error('Failed to export document to PDF');
        }
    }

    async getDocumentTitle(documentId, accessToken) {
        try {
            this.initializeClient(accessToken);

            const response = await this.drive.files.get({
                fileId: documentId,
                fields: 'name'
            });

            return response.data.name;
        } catch (error) {
            console.error('Get Document Title Error:', error.message);
            return 'Cover_Letter';
        }
    }
}

export default new GoogleDocsService();
