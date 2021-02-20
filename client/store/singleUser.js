import axios from 'axios'

//constants

const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';

//action creators


export const _setSingleUser = (user) => {
  return {
    type: SET_USER,
    user
  }
};

export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
};


//thunks

export const setSingleUser = (email) => {
  return async (dispatch)=>{
    const users = (await axios.get('/api/users')).data;
    const user = users.find( user => user.email === email)
    dispatch(_setSingleUser(user))
  }
}

export const updateUser = (user) => {
  return async (dispatch)=> {
    const updated = (await axios.put(`/api/users/${user.id}`, user)).data;
    dispatch(_updateUser(updated))
  }
}

//reducer

export default function singleUserReducer(state=[], action) {
  if(action.type === SET_USER){
    state = action.user
  }
  if(action.type === UPDATE_USER) {
    state = state.map(user => action.user.id === user.id ? action.user : user);
  }

  return state;
}