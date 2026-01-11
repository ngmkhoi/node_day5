const usersService = require('../services/users.service');

const usersController = {
    search: async (req, res) => {
        try {
            const { q } = req.query;
            const currentUserId = req.user.id;

            if (!q || q.trim() === '') {
                return res.success([], 200);
            }

            const users = await usersService.searchByEmail(q, currentUserId);

            res.success(users, 200);

        } catch (error) {
            res.error(500, error.message);
        }
    }
};

module.exports = usersController;
