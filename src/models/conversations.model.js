const pool = require('../config/database')

const conversationModel = {
    create: async (connection, { name, type, creatorId }) => {
        const [result] = await connection.query(
            `INSERT INTO conversations (name, type, created_by) VALUES (?, ?, ?)`,
            [name, type, creatorId]
        );
        return result.insertId;
    },
    addParticipants: async (connection, values) => {
        await connection.query(
            `INSERT INTO conversation_participants (conversation_id, user_id) VALUES ?`,
            [values]
        );
    },
    findExistingDirectConversation: async (connection, user1Id, user2Id) => {
        const query = `
            SELECT id
            FROM conversations
            WHERE type = 'direct'
              AND id IN (
                SELECT conversation_id
                FROM conversation_participants
                WHERE user_id IN (?, ?)
                GROUP BY conversation_id
                HAVING COUNT(conversation_id) = 2
            )
            LIMIT 1;
        `;

        const [rows] = await connection.query(query, [user1Id, user2Id]);
        return rows.length > 0 ? rows[0].id : null;
    },
    getAllConversations: async (userId) => {
        const [result] = await pool.query(
            `select id, name, type from conversations where created_by = ?`, [userId]
        );
        return result;
    },
    findById: async (connection, conversationId) => {
        const [result] = await connection.query(
            `select id, type from conversations where id = ?`, [conversationId]
        )
        return result[0] || null;
    },
    checkExistingParticipant: async (connection, conversationId, userId) => {
        const [result] = await connection.query(
            `select 1 from conversation_participants where conversation_id = ? and user_id = ?`, [conversationId, userId]
        );
        return result.length > 0;
    },
    addParticipant: async (connection, conversationId, userId) => {
        await connection.query(
            `INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?)`,
            [conversationId, userId]
        );
    }
};

module.exports = conversationModel;