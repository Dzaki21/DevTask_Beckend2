const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const MONGO_URI = 'mongodb://localhost:27017/devtask_db';

const seedUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI);
    
        await User.deleteMany({});

        const dataUsers = [
            {
                name: 'Dzaki Ramadan',
                email: 'dzaki@gmail.com',
                password: 'dzaki123',
                role: 'Backend'
            },
            {
                name: 'Daffa Taufiq',
                email: 'daffa@gmail.com',
                password: 'daffa123',
                role: 'Frontend'
            },
            {
                name: 'Naufal Daffa Musyafa',
                email: 'naufal@gmail.com',
                password: 'naufal123',
                role: 'Project manager'
            },
            {
                name: 'Razzan Firdaus',
                email: 'razzan@gmail.com',
                password: 'razzan123',
                role: 'DevOps'
            },
            {
                name: 'Habibie Rasya',
                email: 'habibi@gmail.com',
                password: 'habibi123',
                role: 'QA'
            }
        ];

        const salt = await bcrypt.genSalt(10);
        const hashedUsers = await Promise.all(
            dataUsers.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return {
                    ...user,
                    password: hashedPassword
                };
            })
        );

        await User.insertMany(hashedUsers);
        console.log('Berhasil memasukan 5 data akun dengan password terenkripsi!');

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.log('Gagal melakukan seeding:', error);
        process.exit(1);
    }
};

seedUsers();