const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devtask_secret_key_123';

const login = async (req, res) => {
    try{
        const {email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password tidak boleh kosang'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false, 
                message: 'Email atau password salah!'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Email atau password salah!'
                });
            }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                role: user.role
            },
            JWT_SECRET, 
            {expiresIn: '1d'} //satu hari saja untuk tokennya
        );

        return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role: user.role
            }
        })
    } catch (error){
        console.error('Error saat login :', error);
        return res.status(500).json({
            success: false,
            message:'Terjadi kesalahan login'
        })
    }
}
module.exports = {login}
