const pool = require('../config/database');
const { SEARCH } = require('../config/constants');

const userModel = {
    searchByEmail: async (query, currentUserId) => {
        const [users] = await pool.query(
            `SELECT id, email, full_name 
             FROM users 
             WHERE email LIKE ? AND id != ?
             LIMIT ?`,
            [`%${query}%`, currentUserId, SEARCH.USER_SEARCH_LIMIT]
        );
        return users;
    },
    findById: async (connection, ids) => {
        if(ids.length === 0) return [];
        const [rows] = await connection.query(
            'select id from users where id in (?)', [ids]
        )
        return rows;
    }
};

module.exports = userModel;
