const router = require('express').Router()
const Cart = require('../db/models/cart')
module.exports = router

//all users all carts
router.get('/', async (req, res, next) => {
  try {
    res.status(200).send(await Cart.findAll());
  } 
  catch (ex) {
    next(ex)
  }
});

//delete item in cart
router.delete('/', async (req, res, next) => {
  try {
    const book = await Cart.findOne({where: {id: req.body.bookId}})
    await book.destroy()
    res.sendStatus(200)

  } 
  catch (ex) {
    next(ex)
  }
});

router.get('/:id/cart', async (req, res, next) => {
  try {
    res.status(200).send(await Cart.findAll({
      where: {
        userId: req.params.id
      }
    }));
  }
  catch(ex) {
    next(ex)
  }
});

router.post('/:id/cart', async (req, res, next) => {
  try {
    console.log(req.body);
    const bookInCart = await Cart.findOne({
      where: {
        book: req.body.book,
        userId: req.params.id
      }
    })
    if(bookInCart){
      bookInCart.quantity = bookInCart.quantity + req.body.quantity
      await bookInCart.save()
    }else{
      const book = await Cart.create(req.body)
      book.userId = req.params.id;
      await book.save();
    }
    res.status(201).send(await Cart.findAll())
  }
  catch(ex) {
    next(ex)
  }
});