//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user');
const Book = require('./models/book');
const faker = require('faker');

//associations could go here!

const syncAndSeed =  async()=> {
  try{
    await db.sync({force: true})
    const users = await Promise.all([
      User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
      User.create({name: 'Murphy', email: 'murphy@email.com', password: '123'})
    ])
    const [cody, murphy] = users;

    for (let i = 0; i < 100; i++) {
      await Book.create({
        title: faker.lorem.words(),
        author: faker.random.number(),
        price: faker.commerce.price(),
        stock: faker.random.number(),
        review: 3,
        img: faker.image.abstract()
      })
  }
}catch(ex){
    next(ex)
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
