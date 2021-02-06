import axios from 'axios'

//constants

const GET_CART = 'GET_CART'
const ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART'
const REMOVE_BOOK_FROM_CART = 'REMOVE_BOOK_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'


//action creators

export const _getCart = (cart) => {
    return {
      type: GET_CART,
      cart
    }
  };

  export const _addToCart = (book) => {
    return {
      type: ADD_BOOK_TO_CART,
      book
    }
  };

  export const _removeFromCart = (book) => {
    return {
      type: REMOVE_BOOK_FROM_CART,
      book
    }
  };


//thunks

export const getCart = (userId) => {
    return async (dispatch)=>{
      const cart = (await axios.get(`api/cart/${userId}/cart`)).data
      dispatch(_getCart(cart))
    }
};

  export const removeFromCart = (book) => {
    return async (dispatch)=>{
      const bookId=book.id;
      await axios.delete(`api/cart`,{data: {bookId}})
      dispatch(_removeFromCart(book))
      history.push('/mycart');
    }
  };

  export const addToCart = (userId, bookToCart) => {
    return async (dispatch)=>{
      const book = (await axios.post(`api/cart/${userId}/cart`, {book: bookToCart.title , quantity: 1})).data
      dispatch(_addToCart(book))
    }
};


//reducer

export default function cartReducer(state=[], action) {
    if(action.type === GET_CART){
      return action.cart
    }
    if(action.type === REMOVE_BOOK_FROM_CART){
      state = state.filter(book => book.id !== action.book.id)
    }
    if(action.type === ADD_BOOK_TO_CART){
      return [...state, action.book]
    }
  
    return state;
  }