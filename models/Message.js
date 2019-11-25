const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

module.exports = sequelize.define(
    'messages',
    {
        ID: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
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