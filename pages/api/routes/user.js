const express = require('express');
const jwt = require('jsonwebtoken')
const userService = require('../db/services/user')
const JWT_KEY = "nextjs_authentication_mongo"

const router = express()

router.use((req, res, next) => {
    const token = req.headers['authorization'];
    jwt.verify(token, JWT_KEY, function (err, data) {
        if (err) {
            res.status(401).send({ error: "NotAuthorized" })
        } else {
            console.log(data);
            req.user = data;
            next();
        }
    })
})

router.get('/', async (req, res) => {
    user = await userService.findById(req.user.id)
    // console.log(user)
    res.send(user);
})

module.exports = router;