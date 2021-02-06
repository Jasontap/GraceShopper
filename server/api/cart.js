const router = require('express').Router()
const Cart = require('../db/models/cart')
module.exports = router

//all users all carts
router.get('/', async (req, res, next) => {
  try {
    res.send(await Cart.findAll());
  } 
  catch (ex) {
    next(ex)
  }
});

//delete item in cart
router.delete('/', async (req, res, next) => {
  try {
    console.log(req.body.bookId)
    const book = await Cart.findOne({where: {id: req.body.bookId}})
    console.log(book)
    await book.destroy()
    res.status(200)

  } 
  catch (ex) {
    next(ex)
  }
});

router.get('/:id/cart', async (req, res, next) => {
  try {
    res.send(await Cart.findAll({
      where: {
        userId: req.params.id
      }
    }));
  }
  catch(ex) {
    next(ex)
  }
});