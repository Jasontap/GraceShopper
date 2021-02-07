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

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Book.create(req.body));
  }
  catch(ex) {
    next(ex);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.send(await book.update(req.body));
  }
  catch(ex) {
    next(ex);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
  }
  catch(ex) {
    next(ex);
  }
})