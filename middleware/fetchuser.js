const jwt = require('jsonwebtoken');
const JWT_SECRETE = 'lazycodersdatabase@#$%2023';


const fetchUser = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token, 'token');

    if (!token) {
        res.status(401).send({ error: 'Invalid Token!' });
    }

    try {
        const verifyToken = jwt.verify(token, JWT_SECRETE);
        req.user = verifyToken.user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send({ error: 'Invalid Token!' })
    }
}


module.exports = fetchUser;