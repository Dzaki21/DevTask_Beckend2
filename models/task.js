const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type:String, 
        required: [true, 'Judul tidak boleh kosong'],
        trim: true
    },
    description: {
        type: String,
        required: true

    },
    category: {
        type: String, 
        enum:['Frontend', 'Beckend', 'QA', 'DevOps'],
        required: true
    },
    status: {
        type: String, 
        enum:['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }
}, {
        timestamp: true
    
});

module.exports = mongoose.model('Task', taskSchema);