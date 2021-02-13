import axios from 'axios'

//constants

const SET_USERS = 'SET_USERS'


//action creators

export const setUsers = (users) => {
    return {
      type: SET_USERS,
      users
    }
  };


//thunks

export const fetchUsers = () => {
  return async (dispatch)=>{
    const users = (await axios.get('/api/users')).data;
    dispatch(setUsers(users))
  }
};



//reducer

export default function usersReducer(state=[], action) {
  if(action.type === SET_USERS){
    state = action.users
  }

  return state;
}