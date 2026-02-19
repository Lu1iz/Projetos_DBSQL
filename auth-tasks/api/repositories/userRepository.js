const pool = require('../config/db.js');

const findByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

const createUser = async (name, email, password) => {
    const [result] = await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );
    return result.insertId;
};

module.exports = {findByEmail, createUser};