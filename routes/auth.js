const express = require('express')
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRETE = 'lazycodersdatabase@#$%2023';
const fetchUser = require('../middleware/fetchuser');

// ####### ROUTE-1 #######
// This is a post call "POST" can be accessed by ==> (/app/auth/addUser)
router.post('/addUser', [
    body('email', 'Please enter a valid Email e.g. test@gmail.com').trim().isEmail(),
    body('name', 'Name must be 5 characters').trim().isLength({ min: 5 }),
    body('password', 'Test@123').trim().isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors, 'errors');
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ error: 'This Email Id is already exist' })
        }

        const salt = await bcrypt.genSalt(10);
        const setPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            password: setPassword,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRETE);

        success = true;
        res.json({ success, token });
    } catch (error) {
        succes = false
        // res.json({ error: 'Email Id is already exist', message: error.message })
        res.status(500).send('Some Error Occured!')
        console.log(error)
    }
});

// ####### ROUTE-2 #######

// ###### Authenticate a user using: POST call "/app/auth/login" 

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors) {
        return res.ststus(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'Please enter a valid credential!' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: 'Please enter a valid credential!' })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, JWT_SECRETE);
        success = true;
        res.json({ success, token });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE - 3

// Get Autherised user details, Using POST call ("/app/auth/login") 
router.post('/getOneUser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select('-password');
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;