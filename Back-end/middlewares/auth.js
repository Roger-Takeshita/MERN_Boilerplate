const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_KEY;

const authJWT = async (req, res, next) => {
    try {
        let token = req.get('Authorization') || req.query.token || req.body.token;
        if (token) {
            token = token.replace('Bearer ', '');
            const user = await jwt.verify(token, SECRET);
            if (!user) return res.status(400).json({ message: 'Not Authorized' });
            req.user = user;
            return next();
        }
        res.status(401).json({ message: 'Please authenticate first.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

const createJWT = (user) =>
    jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, SECRET, {
        expiresIn: '1 day'
    });

module.exports = {
    authJWT,
    createJWT
};
