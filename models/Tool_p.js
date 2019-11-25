const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

module.exports = sequelize.define(
    'tool_ps',
    {
        tool: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_needed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        timestamps: false
    }
)