const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

module.exports = sequelize.define(
    'projects',
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        project_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        user_name: {
            type: Sequelize.STRING
        },
        git_link: {
            type: Sequelize.STRING
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