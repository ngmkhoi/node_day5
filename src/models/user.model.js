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
    },
    countNewUser: async () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        const prevDate = currentDate.toISOString().slice(0, 10);

        const nextDate = new Date(currentDate)
        nextDate.setDate(nextDate.getDate() + 1)
        const nextDateStr = nextDate.toISOString().slice(0, 10);

        const [result] = await pool.query(
            `SELECT COUNT(*) as count
             FROM users
             WHERE created_at >= ? AND created_at < ?`,
            [`${prevDate} 00:00:00`, `${nextDateStr} 00:00:00`]
        )
        return result[0].count
    }
};

module.exports = userModel;
