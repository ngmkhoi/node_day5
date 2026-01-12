const authService = require('../services/auth.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login({email, password});

        if (!user) {
            return res.error(401, 'Invalid email or password')
        }

        res.success(user, 200);
    } catch (error) {
        if (error.message === 'Invalid email or password') {
            return res.error(401, 'Invalid email or password');
        }
        res.error(500, error.message);
    }
}

const createUser = async (req, res) => {
    try {
        const { email, password, full_name } = req.body;
        const user = await authService.register({ email, password, full_name });
        res.success(user, 201);
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.error(409, error.message);
        }
        res.error(500, 'Internal server error');
    }
}

const refreshToken = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.error(401, 'Refresh token required');
        }
        const token = authHeader?.replace('Bearer', '')?.trim();
        const result = await authService.createNewToken(token);
        res.success(result, 200);
    } catch (error) {
        if (error.message.includes('Invalid') || error.message.includes('expired')) {
            return res.error(403, error.message);
        }
        res.error(500, 'Internal server error');
    }
}

const logout = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.error(401, 'Refresh token required');
        }
        const token = authHeader?.replace('Bearer', '')?.trim();
        const result = await authService.logoutUser(token);
        res.success(result, 200);
    } catch (error) {
        res.error(500, error.message);
    }
}
module.exports = {
    login,
    createUser,
    refreshToken,
    logout,
}
