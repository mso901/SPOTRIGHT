const mysql = require('mysql2');

const info = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: process.env.CONNECTION_PEOPLE
};

const pool = mysql.createPool(info).promise();

const connection = async (error) => {
    try {
        return await pool.getConnection();
    } catch (err) {
        throw new error.DbConnectionError("데이터 베이스 연결 과정에서 문제가 발생했습니다!");
    }
}

module.exports = connection;