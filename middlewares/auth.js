const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_KEY;

const authJWT = async (req, res, next) => {
    try {
        let token = req.get('Authorization') || req.query.token || req.body.token;
        token = token.replace('Bearer ', '');
        const user = await jwt.verify(token, SECRET);
        if (!user) return res.status(400).json({ error: 'Not Authorized' });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate first.' });
    }
};

const createJWT = (user) => jwt.sign({ _id: user._id }, SECRET, { expiresIn: '1 day' });

module.exports = {
    authJWT,
    createJWT
};
