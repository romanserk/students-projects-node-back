const sequelize = require('../database/db.js')

module.exports = sequelize.define(
    'participants',
    {

    },
    {
        timestamps: false
    })