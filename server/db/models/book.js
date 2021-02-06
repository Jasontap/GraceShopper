const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    review: {
      type: Sequelize.INTEGER,
    },
    img: {
      type: Sequelize.STRING
    }
  })
  
  module.exports = Book