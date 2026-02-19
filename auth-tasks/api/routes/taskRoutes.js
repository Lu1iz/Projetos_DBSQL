const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');

router.post('/', taskController.create);
router.get('/:userId', taskController.getAll);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.remove);

module.exports = router;