import axios from 'axios'


//constants
const CREATE_ORDER = 'CREATE_ORDER'
const GET_ORDERS = 'GET_ORDERS'


//action creators
export const _createOrder = (order) =>{
    return {
        type: CREATE_ORDER,
        order
    }
}

export const _fetchOrders = (orders) =>{
    return {
        type: GET_ORDERS,
        orders
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

export const fetchOrders = (userId)=>{
    return async (dispatch)=>{
        const orders = (await axios.get(`api/checkout/orders/${userId}`)).data
        dispatch(_fetchOrders(orders))
    }
}

//reducer

export default function checkoutReducer(state=[], action) {
    if(action.type === CREATE_ORDER){
      return action.order
    }
    if(action.type === GET_ORDERS){
        state = action.orders
      }
    return state;
  }