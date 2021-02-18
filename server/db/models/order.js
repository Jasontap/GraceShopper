const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER} = Sequelize

const Order = db.define('order', {
    address: {
        type: STRING,
        allowNull: false
    },
    city: {
        type: STRING,
        allowNull: false
    },
    state: {
        type: STRING,
        allowNull: false
    },
    zip: {
        type: STRING,
        allowNull: false
    },
    cardNum: {
        type: STRING,
        allowNull: false
    },
    cardExp: {
        type: STRING,
        allowNull: false
    },
    cardCode: {
        type: STRING,
        allowNull: false
    }
})

module.exports = Order

