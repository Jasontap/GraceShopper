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
    genre: {
        type: Sequelize.ENUM('fiction','nonfiction','fantasy'),

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