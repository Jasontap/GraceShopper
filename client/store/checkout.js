import axios from 'axios'


//constants
const CREATE_ORDER = 'CREATE_ORDER'

//action creators
export const _createOrder = (order) =>{
    return {
        type: CREATE_ORDER,
        order
    }
}

//thunks
export const createOrder = (order, userId) =>{
    return async (dispatch)=>{
        const newOrder = (await axios.post(`api/checkout/orders/${userId}`, order)).data
        if(newOrder){
            dispatch(_createOrder(newOrder))
        }
    }
}

//reducer

export default function checkoutReducer(state=[], action) {
    if(action.type === CREATE_ORDER){
      return action.order
    }
  
    return state;
  }