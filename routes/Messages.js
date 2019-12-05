const express = require('express');
const message = express.Router();
const Message = require('../models/Message');
const User = require('../models/User')



message.get(`/messages`, (req, res) => {

    Message.findAll({
        where: {
            projectID: req.query.projectID
        },
        include: [{
            model: User,
            attributes: ['user_name']
        }]

    })
        .then(messages => {
            res.json({
                data: messages
            })
        });

});

message.post('/message/add', (req, res) => {
    const today = new Date()
    const messageData = {
        content: req.body.content,
        created_date: today,
        projectID: req.body.projectID,
        userID: req.body.userID,
    }

    Message.create(messageData)
        .then(response => {
            res.json(response.dataValues)
        })
        .catch(err => {
            res.send('error: ' + err)
        });



})

module.exports = message