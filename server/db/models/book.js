const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.ENUM('fiction','non-fiction','fantasy','love')
    },
    price: {
      type: Sequelize.FLOAT
    },
    description: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
    review: {
      type: Sequelize.INTEGER
    },
    img: {
      type: Sequelize.STRING
    },
    coverId: {
      type: Sequelize.INTEGER
    }
  })
  
  module.exports = Book