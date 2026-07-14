const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {type:String, required: true},
    description: {type: String},
    category: {type: String, enum:['Frontend', 'Beckend', 'QA', 'DevOps']},
    status: {type: String, enum:['Pending', 'In Progress', 'Completed']},
    createdAt: {type: Date, default:Date.now}
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;