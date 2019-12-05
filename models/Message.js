const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

module.exports = sequelize.define(
    'messages',
    {
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        projectID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_date: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)
