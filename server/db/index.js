//this is the access point for all things database related!

const db = require('./db')
const Order = require('./models/order')
const User = require('./models/user');
const Book = require('./models/book');
const Cart = require('./models/cart');
const faker = require('faker');
const axios = require('axios');

//associations could go here!
Cart.belongsTo(User)
Order.belongsTo(User)
Cart.belongsTo(Order)
Order.hasMany(Cart)

const syncAndSeed =  async()=> {
  try{
    await db.sync({force: true});
    const users = await Promise.all([
      User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
      User.create({name: 'Murphy', email: 'murphy@email.com', password: '123'}),
      User.create({name: 'Jason Williams', email: 'jason@email.com', password: '123', adminAuth: true, githubId: 123456789}),
      User.create({name: 'Kayla Frankum', email: 'kayla@email.com', password: '123', adminAuth: true}),
      User.create({name: 'Taylor Mckeel', email: 'taylor@email.com', password: '123', adminAuth: true})
    ])
    const [cody, murphy] = users;
    
    const fiction = (await axios.get('https://openlibrary.org/subjects/fiction.json?subject=fiction')).data;
    const nonFiction = (await axios.get('https://openlibrary.org/subjects/non-fiction.json?subject=non-fiction')).data;
    const love = (await axios.get('http://openlibrary.org/subjects/love.json?subject=love')).data;
    const cats = (await axios.get('https://openlibrary.org/subjects/cats.json?subject=cats')).data;
    const dogs = (await axios.get('https://openlibrary.org/subjects/dogs.json?subject=dogs')).data;
    const architecture = (await axios.get('https://openlibrary.org/subjects/architecture.json?subject=architecture')).data;
    const artInstruction = (await axios.get('https://openlibrary.org/subjects/art_instruction.json?subject=art_instruction')).data;
    const dance = (await axios.get('https://openlibrary.org/subjects/dance.json?subject=dance')).data;
    const design = (await axios.get('https://openlibrary.org/subjects/design.json?subject=design')).data;
    const music = (await axios.get('https://openlibrary.org/subjects/music.json?subject=music')).data;
    const musicTheory = (await axios.get('https://openlibrary.org/subjects/music_theory.json?subject=music_theory')).data;
    const kittens = (await axios.get('https://openlibrary.org/subjects/kittens.json?subject=kittens')).data;
    const puppies = (await axios.get('https://openlibrary.org/subjects/puppies.json?subject=puppies')).data;
    const fantasy = (await axios.get('https://openlibrary.org/subjects/fantasy.json?subject=fantasy')).data;
    const horror = (await axios.get('https://openlibrary.org/subjects/horror.json?subject=horror')).data;
    const scienceFiction = (await axios.get('https://openlibrary.org/subjects/science_fiction.json?subject=science_fiction')).data;
    const poetry = (await axios.get('https://openlibrary.org/subjects/poetry.json?subject=poetry')).data;
    const mathematics = (await axios.get('https://openlibrary.org/subjects/mathematics.json?subject=mathematics')).data;
    const programming = (await axios.get('https://openlibrary.org/subjects/programming.json?subject=programming')).data;
    
    const allBooks = [
      fiction,
      love, 
      nonFiction, 
      cats, 
      dogs, 
      architecture, 
      artInstruction, 
      dance, 
      design, 
      music, 
      musicTheory, 
      kittens, 
      puppies, 
      fantasy, 
      horror, 
      scienceFiction, 
      poetry, 
      mathematics, 
      programming
    ]


    const createBook = (book, genre) => {
      return {
        title: book.title,
        author: book.authors.reduce((acc, i) => acc += ', ' + i.name, ''),
        genre: genre,
        price: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence(),
        stock: Math.floor(Math.random() * 10),
        review: Math.floor(Math.random() * 10),
        img: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
        coverId: book.cover_id
      }
    }

    
    await Promise.all(
      allBooks.map( bookObj => {
        const books = bookObj.works;
        const genre = bookObj.name;
        
        books.forEach(book => {
          if(book.title && book.cover_id){
            Book.create(createBook(book, genre));
          }
        })
      })
    );

  
} catch(ex){
    throw(ex);
  }

}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Book,
    Cart,
    Order
  }
}
