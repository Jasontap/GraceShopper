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

router.get('/page', async (req, res, next) => {
  try {
    const idx = req.query.idx ? req.query.idx * 1 : 0;
    const [books, count] = await Promise.all([
      Book.findAll({
        limit: 10,
        offset: idx * 10,
        order: [['title']]
      }),
      Book.count()
    ]);
    res.send({ count, books });
  } 
  catch (ex) {
    next(ex);
  }
});


// const books = [await Book.findAll();]
// const genres = books.map(book => book.genre);
// const uniqueGenres = [...new Set(genres)];
// uniqueGenres.forEach(genre => {
//   return (
//     router.get(`/${genre}`, async (req, res, next) => {
//       try {
//         res.send(await Book.findAll({
//           where: {
//             genre: genre
//           }
//         }));
//       }
//       catch(ex){
//         next(ex);
//       }
//     })
//   )
// })


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
        genre: 'dogs'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/architecture', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'architecture'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/artInstruction', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'art instruction'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/dance', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'dance'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/design', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'design'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/music', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'music'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/musictheory', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'music theory'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/kittens', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'kittens'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/puppies', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'puppies'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/fantasy', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'fantasy'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/horror', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'horror'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/sciencefiction', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'science fiction'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/poetry', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'poetry'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/mathematics', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'mathematics'
      }
    }));
  } 
  catch (ex) {
    next(ex);
  }
});

router.get('/programming', async (req, res, next) => {
  try {
    res.send(await Book.findAll({ 
      where: {
        genre: 'programming'
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