const express = require('express');
const router = express.Router();
const { getTasks, postTasks, putTasks, deleteTask} = require('../controller/taskControllers');

router.route('/') 
.get(getTasks)
.post(postTasks);

router.route('/:id')
.put(putTasks)
.delete(deleteTask);
module.exports = router;