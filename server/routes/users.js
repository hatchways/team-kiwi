const router = require('express').Router();
let User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const passport = require('../passport')
require('dotenv').config()

router.get('/', (req, res, next) => {
    // console.log('===== user!!======')
    // console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.route('/add').post((req, res) => {

    // const username = req.body.username;
    // const password = req.body.password;
    const { username, userEmail, password } = req.body;

    // ADD VALIDATION
    User.findOne({ userEmail: userEmail }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            console.log("already exist")
            res.json({
                error: `Sorry, ${userEmail} is already exist email address`
            })
        }
        else {

            const newUser = new User({
                username: username,
                userEmail: userEmail,
                password: password
            })
            //Create a JWT token
            const token = jwt.sign({ newUser }, process.env.ACCESS_TOKEN_SIGNIN);
            res.cookie('token', token, { httpOnly: true });

            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                //console.log(savedUser);
                res.json(savedUser)
            })
        }
    })
});
router.post('/protected', authenticateToken, (req, res) => {
    res.json(req.userInfo)
})
router.post(
    '/login',
    function (req, res, next) {
        console.log("here", req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            userEmail: req.user.userEmail,
            password: req.user.password
        };

        //////////////////// jwt start //////////////
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_LOGIN)
        res.json({ accessToken: accessToken });
    }
)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_LOGIN, (err, userInfo) => {
        if (err) return res.sendStatus(403)
        req.userInfo = userInfo
        next()
    })
}
router.post('/logout', (req, res) => {
    if (req.user) {
        req.logOut()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router;