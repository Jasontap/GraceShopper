import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../store/checkout";
import { orderCart } from '../store/cart'



//put this in single user component

export class OrderHistory extends React.Component{
    componentDidMount(){
        const userId = this.props.auth.id
        this.props.getOrders(userId)
        this.props.orderCart(userId)
    }
    render(){
        const orders = this.props.checkout
        const cart = this.props.cart

        return(
            <div id='allOrders'>
                <h1 id='orderHist'>Order History</h1>
                {orders.length > 0 ? <ol className='orderBox'>
                {orders.map(order=>{
                    const books = cart.filter(book=> book.orderId === order.id)
                    
                    return(
                        <li key={order.id} className='orderItem'>
                            <h2>Order {order.id}</h2>
                            <div className='orderInfo'>
                                <h3 className='shipped'>Shipped to:</h3>
                                <p className='orderP'>{order.address}</p>
                                <p className='orderP'>{order.city}, {order.state} {order.zip}</p>
                            </div>
                            <div className='orderInfo'>
                                <h3 className='shipped'>Books Purchased:</h3>
                                <ul className='bookBox'>
                                    {books.map(book=>{
                                        return(
                                            <li key={book.id} className='orderList'>
                                                <h4 className='orderTitle'>{book.book}</h4>
                                                <div className='bookInfo'>
                                                    <p className='bookPrice'>Price: {book.price} </p>
                                                    <p>Quantity: {book.quantity}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </li>
                    )
                })}
            </ol> : <h4>You do not currently have any orders</h4>}
                
            </div>
            
        )
    }
}


const mapState = ({auth, checkout, cart}) => {
    return { auth, checkout, cart};
};

const mapDispatch = (dispatch) => {
    return {
        getOrders: (userId) => dispatch(fetchOrders(userId)),
        orderCart: (userId) => dispatch(orderCart(userId))
    };
};

export default connect(mapState, mapDispatch)(OrderHistory);