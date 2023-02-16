const router = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10
const {isAuthenticated} = require('../middleware/jwt.middleware')

router.post('/register', (req, res, next) => {

    const { email, password, firstName, lastName } = req.body

    if (password.length < 7) {
        res.status(400).json({ message: 'Password must have at least 7 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, firstName, lastName })
        })
        .then((createdUser) => {
       
            res.status(201).json({ createdUser })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

router.post('/signin', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Enter your email and password!' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: 'User not found.' })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, firstName, role, lastName } = foundUser

                const payload = {  _id, email, firstName, role, lastName }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken: authToken })
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }

        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }))
})

router.get('/verify', isAuthenticated, (req, res) => {

    res.status(200).json(req.payload)

})


module.exports = router