const pool = require('../config/database');

const messagesModel = {
    create: async (connection, { conversationId, senderId, content }) => {
        const [result] = await connection.query(
            `INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?)`,
            [conversationId, senderId, content]
        );
        return result.insertId;
    },
    
    findById: async (connection, messageId) => {
        const [result] = await connection.query(
            `SELECT id, conversation_id, sender_id, content, created_at 
             FROM messages WHERE id = ?`,
            [messageId]
        );
        return result[0] || null;
    },
    
    getAllByConversationId: async (conversationId) => {
        const [result] = await pool.query(
            `SELECT 
                m.id,
                m.conversation_id,
                m.sender_id,
                m.content,
                m.created_at,
                u.id as sender_user_id,
                u.email as sender_email,
                u.full_name as sender_full_name
             FROM messages m
             JOIN users u ON m.sender_id = u.id
             WHERE m.conversation_id = ?
             ORDER BY m.created_at ASC`,
            [conversationId]
        );
        
        return result.map(row => ({
            id: row.id,
            conversation_id: row.conversation_id,
            content: row.content,
            created_at: row.created_at,
            sender: {
                id: row.sender_user_id,
                email: row.sender_email,
                full_name: row.sender_full_name
            }
        }));
    }
};

module.exports = messagesModel;
