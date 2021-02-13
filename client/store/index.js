import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import booksReducer from './books'
import cartReducer from './cart'

import checkoutReducer from './checkout'

import usersReducer from './users'


const reducer = combineReducers({
  auth: auth,
  books: booksReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  users: usersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
