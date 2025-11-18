import pdfParse from 'pdf-parse';

export class PdfService {
    async extractText(pdfBuffer) {
        try {
            const data = await pdfParse(pdfBuffer);
            return data.text;
        } catch (error) {
            console.error('PDF Parse Error:', error.message);
            throw new Error('Failed to extract text from PDF');
        }
    }

    async extractTextFromMultiple(pdfBuffers) {
        try {
            const textPromises = pdfBuffers.map(buffer => this.extractText(buffer));
            const texts = await Promise.all(textPromises);
            return texts.join('\n\n--- NEXT DOCUMENT ---\n\n');
        } catch (error) {
            throw new Error('Failed to extract text from PDF files');
        }
    }
}

export default new PdfService();
