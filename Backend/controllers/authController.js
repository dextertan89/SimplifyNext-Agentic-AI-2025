const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.register_get = (req, res) => {
    res.json({ message: "Register" });
}

module.exports.register_post = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received", req.body);
    try{
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: {
            id: user._id,
            email: user.email
        }
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

module.exports.login_get = (req, res) => {
    res.json({ message: "Login"});
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });;
        res.status(200).json({ 
            user: {
                id: user._id,
                email: user.email
            }
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out', redirect: '/' });
}