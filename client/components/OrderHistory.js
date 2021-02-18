import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../store/checkout";
import { getCart } from '../store/cart'



//put this in single user component

export class OrderHistory extends React.Component{
    componentDidMount(){
        const userId = this.props.auth.id
        this.props.getOrders(userId)
        this.props.getCart(userId)
    }
    render(){
        const orders = this.props.checkout
        const cart = this.props.cart
        console.log(cart)
        return(
            <div>
                <h3>Order History</h3>
                <ul>
                {orders.map(order=>{
                    const books = cart.filter(book=> book.orderId === order.id)
                    console.log(books)
                    return(
                        <li>
                            <h4>Order {order.id}</h4>
                            <p>Shipped to:</p>
                            <p>{order.address}</p>
                            <p>{order.city}, {order.state} {order.zip}</p>
                            <p>Books Purchased:</p>
                            <ul>
                                {books.map(book=>{
                                    return(
                                        <li>
                                            <h5>{book.book}</h5>
                                            <p>Price: {book.price}</p>
                                            <p>Quantity: {book.quantity}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
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
        getCart: (userId) => dispatch(getCart(userId))
    };
};

export default connect(mapState, mapDispatch)(OrderHistory);