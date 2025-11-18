import { google } from 'googleapis';

export class AuthService {
    async refreshGoogleToken(refreshToken) {
        try {
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET
            );

            oauth2Client.setCredentials({
                refresh_token: refreshToken
            });

            const { credentials } = await oauth2Client.refreshAccessToken();
            return credentials.access_token;
        } catch (error) {
            console.error('Token Refresh Error:', error.message);
            throw new Error('Failed to refresh access token');
        }
    }

    async getUserInfo(accessToken) {
        try {
            const oauth2Client = new google.auth.OAuth2();
            oauth2Client.setCredentials({ access_token: accessToken });

            const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
            const { data } = await oauth2.userinfo.get();

            return {
                id: data.id,
                email: data.email,
                name: data.name,
                picture: data.picture
            };
        } catch (error) {
            console.error('Get User Info Error:', error.message);
            throw new Error('Failed to get user information');
        }
    }
}

export default new AuthService();
