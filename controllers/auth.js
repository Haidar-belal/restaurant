const { User } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email,
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(404).json({ message: 'Password incorrect' });
        }
        const token = jwt.sign({ id: user.id.toString(), email: user.email, password: user.password }, process.env.SECRET_KEY, {
            expiresIn: "10h",
        });
        return res.status(200).json({ token: token, user: user });
    } catch (error) {

    }
};