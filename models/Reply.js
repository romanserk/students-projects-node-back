const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

module.exports = sequelize.define(
    'replys',
    {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING(1024)
        }
    },
    {
        timestamps: false
    }
)