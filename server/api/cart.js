const router = require('express').Router()
const Cart = require('../db/models/cart')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    res.send(await Cart.findAll());
  } 
  catch (ex) {
    next(ex);
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
    next(ex);
  }
});