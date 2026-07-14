require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const Task = require('./models/task')

app.use(express.json());

const MONGO_URI ='mongodb://localhost:27017';

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log('Mantap! Berhasil terhubung ke MongoDB.');
}) 
.catch((err) => {
    console.error('Waduh, koneksi ke MongoDB gagal:', err.message);
});

app.get('/', (req, res) => {
    res.send('Server berjalan dan terhubung ke MongoDB');
})


app.post('/tasks', async (req, res) => {
    try{
        const newTask = new Task ({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            status: req.body.status,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message});
    } 
    
})

app.listen(PORT, () =>{
    console.log(`Server siap di port ${PORT}`);
});
