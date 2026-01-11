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

module.exports = {
    login,
    createUser,
}
