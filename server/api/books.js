const router = require('express').Router()
const { db, models: { Book }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(await Book.findAll());
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/fiction', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'fiction'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/non-fiction', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'non-fiction'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/love', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'love'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/cats', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'cats'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/dogs', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'cats'
      }
    }));
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
    res.send(await book.destroy());
  }
  catch(ex) {
    next(ex);
  }
})