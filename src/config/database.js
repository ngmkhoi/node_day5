const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    timezone: 'Z'
});

(async () => {
    try {
        await pool.query(`create table IF NOT EXISTS users (
            id int auto_increment primary key,
            email varchar(255) not null unique,
            password varchar(255) not null,
            full_name varchar(100),
            verified_at timestamp default null,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp
        );`);

        await pool.query(`create table IF NOT EXISTS conversations (
            id int auto_increment primary key,
            name varchar(255),
            type enum('group', 'direct') not null default 'direct',
            created_by int,
            created_at timestamp default current_timestamp,
            foreign key (created_by) references users(id) on delete set null
        );`)

        await pool.query(`create table IF NOT EXISTS conversation_participants (
            conversation_id int,
            user_id int,
            joined_at timestamp default current_timestamp,
            primary key (conversation_id, user_id),
            foreign key (conversation_id) references conversations(id) on delete cascade,
            foreign key (user_id) references users(id) on delete cascade
        );`)

        await pool.query(`create table IF NOT EXISTS messages (
            id int auto_increment primary key,
            conversation_id int not null,
            sender_id int not null,
            content text not null,
            created_at timestamp default current_timestamp,
            foreign key (conversation_id) references conversations(id) on delete cascade,
            foreign key (sender_id) references users(id) on delete cascade
        );`)

        await pool.query(`create table if not exists refresh_tokens (
            id int auto_increment primary key,
            user_id int not null,
            token varchar(255) not null unique,
            expired_at timestamp not null,
            created_at timestamp default current_timestamp,
            revoked boolean default false,
            foreign key (user_id) references users(id) on delete cascade,
            index idx_user_id (user_id),
            index idx_expired (expired_at),
            index idx_user_revoked (user_id, revoked)
        );`)

        console.log('Table created successfully');
    }catch (error) {
        console.error('Error creating table:', error);
    }
})();

module.exports = pool