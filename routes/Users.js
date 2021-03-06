const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const User = require('../models/User')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;




users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        github_profile: req.body.github_profile,
        created: today
    }


    User.findOne({
        where: {
            [Op.or]: [
                {
                    email: req.body.email
                },
                {
                    user_name: req.body.user_name
                }
            ]
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json(user)
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                user.user_name === req.body.user_name ? res.status(400).json({ error: 'User with such username already exists' }) : res.status(400).json({ error: 'User with such email already exists' })

            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


users.post('/login', (req, res) => {
    const errors = []
    User.findOne({
        where: {
            user_name: req.body.user_name
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.status(400).json({ error: 'Invalid Password' })
                }
            } else {
                res.status(400).json({ error: 'Invalid username' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})


users.get('/profile', (req, res) => {
    User.findOne({
        where: {
            user_name: req.query.name
        }
    })
        .then(user => {
            if (user) {
                res.json({
                    data: {
                        user_name: user.user_name,
                        email: user.email,
                        github_profile: user.github_profile
                    }
                })
            } else {
                res.status(400)
                res.json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})


users.post('/logged_in', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})





module.exports = users
