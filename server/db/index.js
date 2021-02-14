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
      User.create({name: 'Murphy', email: 'murphy@email.com', password: '123'}),
      User.create({name: 'Jason Williams', email: 'jason@email.com', password: '123', adminAuth: true, githubId: 123456789}),
      User.create({name: 'Kayla Frankum', email: 'kayla@email.com', password: '123', adminAuth: true}),
      User.create({name: 'Taylor Mckeel', email: 'taylor@email.com', password: '123', adminAuth: true})
    ])
    const [cody, murphy] = users;
    
    const fiction = (await axios.get('https://openlibrary.org/subjects/fiction.json?subject=fiction')).data.works;
    const nonFiction = (await axios.get('https://openlibrary.org/subjects/non-fiction.json?subject=non-fiction')).data.works;
    const love = (await axios.get('http://openlibrary.org/subjects/love.json?subject=love')).data.works;
    const cats = (await axios.get('https://openlibrary.org/subjects/cats.json?subject=cats')).data.works;
    const dogs = (await axios.get('https://openlibrary.org/subjects/dogs.json?subject=dogs')).data.works;
    const architecture = (await axios.get('https://openlibrary.org/subjects/architecture.json?subject=architecture')).data.works;
    const artInstruction = (await axios.get('https://openlibrary.org/subjects/art_instruction.json?subject=art_instruction')).data.works;
    
    const allBooks = [...fiction, ...love, ...nonFiction, ...cats, ...dogs, ...architecture, ...artInstruction]
    
    const createBook = (book) => {
      return {
        title: book.title,
        author: book.authors.reduce((acc, i) => acc += ', ' + i.name, ''),
        genre: 'fiction',
        price: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence(),
        stock: Math.floor(Math.random() * 10),
        review: Math.floor(Math.random() * 10),
        img: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
        coverId: book.cover_id
      }
    }
    
    await Promise.all(
      allBooks.map( book => {
        if(book.title && book.cover_id){
          Book.create(createBook(book));
          }
        })
    );


    const cartBook = await Cart.create({book: 'book-title-in-cart-here', quantity: 2, price: 5});
    cartBook.userId = 2;
    await cartBook.save();
  
} catch(ex){
    console.log(ex);
  }

}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Book,
    Cart
  }
}
