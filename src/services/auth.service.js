const authModel = require("../models/auth.model");
const refreshTokenModel = require("../models/refreshToken.model");
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;
const jwt = require('jsonwebtoken');
const {SecretRefresh} = require("../config/jwt");
const { AUTH } = require("../config/constants");
const tokenGenerate = require("../helpers/generateToken");

const expiresAt = new Date(Date.now() + AUTH.REFRESH_TOKEN_EXPIRY_MS);

class AuthService {
    async login({ email, password }) {
        const user = await authModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const {accessToken, refreshToken} = await tokenGenerate(user, expiresAt);

        return {
            user: {
                id: user.id,
                email: user.email,
                verifiedAt: user.verified_at,
            },
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
    async register(payload) {
        try {
            const existingUser = await authModel.checkEmailExists(payload.email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(payload.password, parseInt(saltRounds));

            const newUser = await authModel.createUser({
                email: payload.email,
                password: hashedPassword,
                full_name: payload.full_name,
            })

            const {accessToken, refreshToken} = await tokenGenerate(newUser, expiresAt);

            return {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    verifiedAt: newUser.verified_at,
                },
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        } catch (error) {
            console.error('Auth service register error:', error);
            throw error;
        }
    }
    async createNewToken(refreshToken) {
        let decoded;
        const tokenInDB = await refreshTokenModel.findByToken(refreshToken);
        if (!tokenInDB) {
            throw new Error('Invalid refresh token');
        }

        try {
            decoded = jwt.verify(refreshToken, SecretRefresh)
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Refresh token expired');
            }
            throw new Error('Invalid refresh token');
        }

        const user = { id: decoded.id, email: decoded.email }

        const {accessToken, newRefreshToken} = await tokenGenerate(user, expiresAt);
        await refreshTokenModel.revokeToken(refreshToken);

        return {
            user: {
                id: decoded.id,
                email: decoded.email,
            },
            accessToken: accessToken,
            refreshToken: newRefreshToken,
        }
    }
    async logoutUser(refreshToken) {
        const tokenInDB = await refreshTokenModel.findByToken(refreshToken);
        if (!tokenInDB) {
            throw new Error('Invalid refresh token');
        }

        const success = await refreshTokenModel.revokeToken(refreshToken);
        if(!success) {
            throw new Error('Failed to logout');
        }
        return { message: 'Logged out successfully' };
    }
}

module.exports = new AuthService();