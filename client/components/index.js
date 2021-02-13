/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Home} from './home'
export {Login, Signup} from './auth-form'
export {default as AllBooks} from './AllBooks'
export {default as Cart} from './Cart'
export {default as SingleBook} from './SingleBook'
export {default as Users} from './Users'
<<<<<<< HEAD
<<<<<<< HEAD
export {default as AddBook} from './AddBook'
export {default as SingleUser} from './SingleUser'
=======
>>>>>>> 50f90de... Created Users component to display all users at /users, accessible by admin only
=======
export {default as AddBook} from './AddBook'
>>>>>>> d26341b... Admin can add New Books to database
