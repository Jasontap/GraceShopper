import axios from 'axios'

//constants

const GET_CART = 'GET_CART'
const ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART'
const REMOVE_BOOK_FROM_CART = 'REMOVE_BOOK_FROM_CART'


//action creators

export const _getCart = (cart) => {
    return {
      type: GET_CART,
      cart
    }
  };


//thunks

export const getCart = (userId) => {
    return async (dispatch)=>{
      const cart = (await axios.get(`api/cart/${userId}/cart`)).data
      dispatch(_getCart(cart))
    }
  };


//reducer

export default function cartReducer(state=[], action) {
    if(action.type === GET_CART){
      return action.cart
    }
  
    return state;
  }