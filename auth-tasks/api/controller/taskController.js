const taskService = require('../services/taskService.js');

const create = async (req, res, next) => {
    try {
        const {title, description, userId} = req.body;

        const task = await taskService.createTask({title, description, userId});
        res.status(201).json(task);  
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const {userId} = req.params;

        const tasks = await taskService.getTask(userId);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const {id} = req.params
        const {title, description, completed} = req.body;

        const result = await taskService.updateTask({
            taskId: id,
            title,
            description,
            completed
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await taskService.deleteTask(id);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {create, getAll, update, remove};