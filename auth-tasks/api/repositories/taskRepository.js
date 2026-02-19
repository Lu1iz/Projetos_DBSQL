const pool = require('../config/db.js');

const createTask = async (title, description, userId) => {
    const [result] = await pool.query(
        'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
        [title, description, userId]
    );

    return result.insertId;
};

const getTasksByUser = async (userId) => {
    const [rows] = await pool.query(
        'SELECT * FROM tasks WHERE user_id = ?',
        [userId]
    );

    return rows;
};

const updateTasks = async (taskId, title, description, completed) => {
    await pool.query(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        [title, description, completed, taskId]
    );
};

const deleteTask = async (taskId) => {
    await pool.query(
        'DELETE FROM tasks WHERE id = ?',
        [taskId]
    );
};

module.exports = {createTask, getTasksByUser, updateTasks, deleteTask};