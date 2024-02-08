const jwt = require('jsonwebtoken');
const User = require('../models/user');

const admin = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No auth token, assess denied' })
        }
        const verified = jwt.verify(token, process.env.KEY1)
        if (!verified) {
            return res.status(401).json({ msg: 'Token verification failed, authorization denied' })

        }
        const user = await User.findById(verified.id)
        if (user.type == 'user' || user.type == "seller") {
            res.status(401).json({ msg: "you are not an admin!" });
        }
        req.userId = verified.id;
        req.token = token;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = admin;