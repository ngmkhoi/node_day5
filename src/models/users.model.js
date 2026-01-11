const pool = require('../config/database');

const usersModel = {
    searchByEmail: async (query, currentUserId) => {
        const [users] = await pool.query(
            `SELECT id, email, full_name 
             FROM users 
             WHERE email LIKE ? AND id != ?
             LIMIT 20`,
            [`%${query}%`, currentUserId]
        );
        return users;
    }
};

module.exports = usersModel;
