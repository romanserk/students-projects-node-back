const express = require('express');
const projectTools = express.Router();
const ProjectTools = require('../models/Tool_p');





projectTools.get(`/tools`, (req, res) => {

    ProjectTools.findAll({})
        .then(projectTools => {
            if (projectTools) {
                res.json({
                    data: projectTools
                })
            } else {
                res.send(err);
                return;
            }
        });

});


projectTools.get(`/tools/user`, (req, res) => {
    ProjectTools.findAll({})
        .then(projectTools => {
            if (projectTools) {
                res.json({
                    data: projectTools
                })
            } else {
                res.send(err);
                return;
            }
        });

});



projectTools.post('/tools/add', (req, res) => {

    const PID = req.body.ID;
    Promise.all(req.body.tools.map(elem => {
        return ProjectTools.create({
            tool: elem,
            projectID: PID
        })
    })).then(response => {
        res.json(response.dataValues)
    })
        .catch(err => {
            res.send('error: ' + err)
        });

})


module.exports = projectTools