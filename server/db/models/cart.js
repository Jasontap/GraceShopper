const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  book: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Cart