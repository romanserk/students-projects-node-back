const express = require('express');
const projects = express.Router();
const Project = require('../models/Project');
const Tool_p = require('../models/Tool_p');
const User = require('../models/User')
const Participant = require('../models/Participant');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;





projects.get('/projects', (req, res) => {

    Project.findAll({
        include: [{ model: Tool_p }]
    })
        .then(projects => {
            if (projects) {
                res.json({
                    data: projects
                })
            } else {
                res.send(err);
                return;
            }
        });
});



projects.get('/projects/user', (req, res) => {

    Project.findAll({
        where: {
            user_name: req.query.user_name
        },
        include: [{ model: Tool_p }]
    })
        .then(projects => {
            Participant.findAll({
                where: {
                    userID: req.query.userID
                }, include: [
                    {
                        model: Project,
                        include: [{ model: Tool_p }]
                    }
                ]

            }).then(participants => {
                projects = {
                    opned_projects: projects,
                    prticipant_in: participants
                }
                res.json(projects)
            }).catch(err => {
                res.status(400).json({ error: err })
            });

        })
        .catch(err => {
            res.status(400).json({ error: err })
        });
});




projects.post('/projects/add', (req, res) => {
    const today = new Date()
    const projectData = {
        project_name: req.body.project_name,
        description: req.body.description,
        userID: req.body.userID,
        created_date: today,
        used_name: ''
    }

    User.findOne({
        where: {
            ID: projectData.userID
        }
    })
        .then(user => {
            projectData.user_name = user.dataValues.user_name
            Project.create(projectData)
                .then(response => {
                    res.json(response.dataValues)
                })
                .catch(err => {
                    res.send('error: ' + err)
                });

        })
        .catch(err => {
            res.send('error: ' + err)
        })



})



projects.post('/projects/remove', (req, res) => {

    Tool_p.destroy({
        where: {
            projectID: req.body.projectID
        }
    })
        .then(response => {
            Participant.destroy({
                where: {
                    projectID: req.body.projectID
                }
            })
                .then(response => {
                    Project.destroy({
                        where: {
                            ID: req.body.projectID
                        }
                    })
                        .then(projectID => {
                            res.json({ projectID })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        });
                }).catch(err => {
                    res.send('error: ' + err)
                });

        })
        .catch(err => {
            res.send('error: ' + err)
        });

})



projects.get('/projects/single_project', (req, res) => {
    Project.findOne({
        where: {
            project_name: req.query.project_name
        },
        include: [
            { model: Tool_p },
            {
                model: Participant,
                include: [{
                    model: User,
                    required: false
                }]
            }
        ]
    })
        .then(project => {
            res.json({
                data: project
            })

        }).catch(err => {
            res.send('error: ' + err)
        });
});



projects.post('/projects/leave', (req, res) => {

    Participant.destroy({
        where: {
            projectID: req.body.projectID,
            UserID: req.body.userID
        }
    }).then(prt => {
        res.json(prt)
    }).catch(err => {
        res.send('error: ' + err)
    });
})



projects.post('/projects/join', (req, res) => {

    const newParticipant = {
        projectID: req.body.projectID,
        userID: req.body.userID
    }

    Participant.findOne({
        where: {
            projectID: req.body.projectID,
            UserID: req.body.userID
        }
    }).then(prt => {
        if (prt) {
            res.status(500).json({ error: 'alrady participant' })
        } else {
            Participant.create(newParticipant)
                .then(response => {
                    res.json(response.newParticipant)
                })
                .catch(err => {
                    res.send('error: ' + err)
                });;
        }
    }).catch(err => {
        res.send('error: ' + err)
    });


})


module.exports = projects