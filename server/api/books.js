const router = require('express').Router()
const { models: { Book }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(await Book.findAll());
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Book.findByPk(req.params.id));
  }
  catch(ex) {
    next(ex);
  }
});