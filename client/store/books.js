import axios from 'axios'

//constants

const SET_BOOKS = 'SET_BOOKS'


//action creators

export const setBooks = (books) => {
    return {
      type: SET_BOOKS,
      books
    }
  };


//thunks

export const fetchBooks = () => {
  return async (dispatch)=>{
    const books = (await axios.get('/api/books/')).data;
    dispatch(setBooks(books))
  }
};



//reducer

export default function booksReducer(state=[], action) {
  if(action.type === SET_BOOKS){
    state = action.books
  }

  return state;
}