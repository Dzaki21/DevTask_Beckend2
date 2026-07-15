require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/task', taskRoutes)

mongoose.connect(process.env.MONGO_URI);
app.listen(PORT, () =>{
    console.log(`Server siap di port ${PORT}`);
});
