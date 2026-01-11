const usersModel = require('../models/users.model');

const usersService = {
    searchByEmail: async (query, currentUserId) => {
        if (!query || query.trim() === '') {
            return [];
        }

        return await usersModel.searchByEmail(query.trim(), currentUserId);
    }
};

module.exports = usersService;
