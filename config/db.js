const mongoose = require('mongoose');

const coonectDB = async () => {
    try {
        const conn = await mongose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
}