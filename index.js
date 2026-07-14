const require = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;
const Task = require('./models/task')

dotenv.config();
connectDB();

app.use(cors())
app.use(express.json());

app.use('api/task', taskRoutes)

const MONGO_URI = process.env.MONGO_URI || 5000;
app.listen(PORT, () =>{
    console.log(`Server siap di port ${PORT}`);
});
