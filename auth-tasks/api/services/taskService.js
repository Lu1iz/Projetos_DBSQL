const taskRepository = require('../repositories/taskRepository.js');

const createTask = async ({title, description, userId}) => {
    if(!title) throw new Error('Titulo obrigatório!');

    const taskId = await taskRepository.createTask(title, description, userId);

    return {
        id: taskId,
        title,
        description,
        completed: false,
        userId
    };
};

const getTask = async (userId) => {
    return await taskRepository.getTasksByUser(userId);
};

const updateTask = async ({taskId, title, description, completed}) => {
    await taskRepository.updateTasks(taskId, title, description, completed);

    return {message: 'Tarefa atualizada com sucesso!'};
};

const deleteTask = async (taskId) => {
    await taskRepository.deleteTask(taskId);
    
    return {message: 'Tarefa deletada com sucesso!'};
};

module.exports = {createTask, getTask, updateTask, deleteTask}