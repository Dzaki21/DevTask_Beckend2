require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;
const Task = require('./models/task')

app.use(express.json());
app.use(cors())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:2707/devtask_db';

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log('Mantap! Berhasil terhubung ke MongoDB.');
}) 
.catch((err) => {
    console.error('Waduh, koneksi ke MongoDB gagal:', err.message);
});
app.listen(PORT, () =>{
    console.log(`Server siap di port ${PORT}`);
});
