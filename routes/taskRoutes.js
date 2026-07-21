const express = require('express');
const router = express.Router();
const { getTasks, postTasks, putTasks, deleteTask} = require('../controller/taskControllers');
const authMiddleware = require('../middleware/authMiddleware')

router.route('/') 
.get(getTasks)
.post(authMiddleware, postTasks);

router.route('/:id')
.put(authMiddleware, putTasks)
.delete(authMiddleware, deleteTask);
module.exports = router;