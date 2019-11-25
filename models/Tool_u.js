const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

module.exports = sequelize.define(
    'tool_us',
    {
        tool: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)