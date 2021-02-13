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
        type: INTEGER,
        allowNull: false
    },
    cardNum: {
        type: INTEGER,
        allowNull: false
    },
    cardExp: {
        type: STRING,
        allowNull: false
    },
    cardCode: {
        type: INTEGER,
        allowNull: false
    }
})

module.exports = Order

// Order model:

// User info--- association
//products bought--- association
// address
// city
// state
// zip
// card#
// cardExp
// cardCode