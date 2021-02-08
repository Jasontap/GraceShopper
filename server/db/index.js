//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user');
const Book = require('./models/book');
const Cart = require('./models/cart');
const faker = require('faker');
const axios = require('axios');

//associations could go here!
Cart.belongsTo(User)

const syncAndSeed =  async()=> {
  try{
    await db.sync({force: true});
    const users = await Promise.all([
      User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
      User.create({name: 'Murphy', email: 'murphy@email.com', password: '123'})
    ])
    const [cody, murphy] = users;
    
    const fictionBookLibrary = (await axios.get('https://openlibrary.org/subjects/fiction.json?subject=fiction')).data;

    fictionBookLibrary.works.map( async book => {
      await Book.create({
        title: book.title,
        author: book.authors[0].name,
        genre: 'fiction',
        price: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence(),
        stock: Math.floor(Math.random() * 10),
        review: Math.floor(Math.random() * 10),
        img: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
        coverId: book.cover_id
      });
    });
    
    const loveBookLibrary = (await axios.get('http://openlibrary.org/subjects/love.json?subject=love')).data;

    loveBookLibrary.works.map( async book => {
      await Book.create({
        title: book.title,
        author: book.authors[0].name,
        genre: 'love',
        price: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence(),
        stock: Math.floor(Math.random() * 10),
        review: Math.floor(Math.random() * 10),
        img: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
        coverId: book.cover_id
      });
    });

    const nonFictionBookLibrary = (await axios.get('https://openlibrary.org/subjects/non-fiction.json?subject=non-fiction')).data;

    nonFictionBookLibrary.works.map( async book => {
      await Book.create({
        title: book.title,
        author: book.authors[0].name,
        genre: 'non-fiction',
        price: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence(),
        stock: Math.floor(Math.random() * 10),
        review: Math.floor(Math.random() * 10),
        img: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
        coverId: book.cover_id
      });
    });

    

    const cartBook = await Cart.create({book: 'book-title-in-cart-here', quantity: 2});
    cartBook.userId = 2;
    await cartBook.save();
  
} catch(ex){
    // next(ex)
  }

  // return {
  //   users: {
  //     cody,
  //     murphy
  //   }
  //}
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Book
  }
}
