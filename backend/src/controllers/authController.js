import passport from '../config/passport.js';
import { generateToken, verifyToken } from '../config/jwt.js';
import authService from '../services/authService.js';

export const initiateGoogleAuth = passport.authenticate('google', {
    scope: process.env.GOOGLE_SCOPES.split(','),
    accessType: 'offline',
    prompt: 'consent'
});

export const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` }, 
        (err, user) => {
            if (err || !user) {
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
            }

            const token = generateToken(user);
            res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
        }
    )(req, res, next);
};

export const refreshToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);
        
        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error) {
            decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        }

        if (!decoded.refreshToken) {
            return res.status(401).json({ error: 'No refresh token available' });
        }

        const newAccessToken = await authService.refreshGoogleToken(decoded.refreshToken);

        const newUser = {
            ...decoded,
            accessToken: newAccessToken
        };

        const newToken = generateToken(newUser);

        res.json({ token: newToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({ error: 'Failed to refresh token' });
    }
};

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'Logged out successfully' });
    });
};

export const getUserProfile = async (req, res) => {
    try {
        const userInfo = await authService.getUserInfo(req.user.accessToken);
        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};
