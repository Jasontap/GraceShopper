import React from "react"
import { connect } from "react-redux"
import { getCart} from '../store/cart'
import {createOrder, fetchOrders} from '../store/checkout'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {CheckoutCart} from './CheckoutCart'
import {Elements,CardElement,} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


export class CheckoutForm extends React.Component{
    constructor(){
        super()
        this.state = {
            shipFirst: '', shipLast:'', shipAddy: '', shipCity: '', shipState: '', shipZip: '', billFirst: '', billLast:'', billAddy:'',
            billCity: '', billState: '', billZip: '', cardFirst:'', cardLast:'', cardNum:'', cardExp: '', cardCode: '', same: false, continue: false, localcart: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        let localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
        if(localcart){
            const cart = []
            for(let key in localcart){
                cart.push({book: key, quantity: localcart[key].quantity, price: localcart[key].price})
            }
            this.setState({localcart: cart})
        }
        const userId = this.props.auth.id
        this.props.getCart(userId)
    }
    handleChange(ev){
        const {name, value} = ev.target
        this.setState({[name] : value})
    }
    handleSubmit (ev){
        ev.preventDefault()
        const userId = this.props.auth.id
        const order = {
            address: this.state.shipAddy,
            city: this.state.shipCity,
            state: this.state.shipState,
            zip: this.state.shipZip,
            cardNum: this.state.cardNum,
            cardExp: this.state.cardExp,
            cardCode: this.state.cardCode
        }
        const alerts = []
        for(const [key,val] of Object.entries(order)){
            if(val === ''){
                alerts.push(key)
            }
        }
        if(alerts.length > 0){
            const string = alerts.reduce((acc,item)=>{
                acc += `${item}\n`
                return acc
            },'Please fill out the following:\n')
            alert(string)
        }
        if(alerts.length === 0){
            this.props.createOrder(order, userId)
            this.setState({continue: true})
            localStorage.clear()
        }

    }
    render(){
        if(!this.state.continue){
            return (
            <div id='orderMain'>
                <div id='checkoutCart'>
                    <CheckoutCart />
                </div>
                <div id='formbox'>
                    <div id='shippingInfo'>
                        <h3>Shipping Address</h3>
                        <form className='checkout'  noValidate autoComplete="off">
                            <div className='inputForm'>
                                <FormControl variant="outlined">
                                    <InputLabel  htmlFor="component-outlined">First Name</InputLabel>
                                    <OutlinedInput className='inputBox' onChange={this.handleChange} name='shipFirst'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                    <OutlinedInput className='inputBox'  onChange={this.handleChange} name='shipLast'  />
                                </FormControl>
                            </div>
                            <div className='inputForm'>
                                <FormControl variant="outlined" >
                                    <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                    <OutlinedInput className='inputBox inputAddy'  onChange={this.handleChange} name='shipAddy'  />
                                </FormControl>
                            </div>
                            <div className='inputForm'>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">City</InputLabel>
                                    <OutlinedInput  className='inputBox' onChange={this.handleChange} name='shipCity'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">State</InputLabel>
                                    <OutlinedInput className='inputBox inputState'  onChange={this.handleChange} name='shipState'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Zip Code</InputLabel>
                                    <OutlinedInput className='inputBox inputZip'  onChange={this.handleChange} name='shipZip'  />
                                </FormControl>
                            </div>
                        </form>
                    </div>
                    <div id='billingAddy'>
                        <h3>Billing Address</h3>
                        <form className='checkout'>
                            <div className='inputForm'>
                                <FormControlLabel
                                    control={<Checkbox checked={this.state.same} onChange={()=>{
                                        const checked = !this.state.same
                                        if(checked){
                                            this.setState({
                                                billFirst: this.state.shipFirst,
                                                billLast: this.state.shipLast,
                                                billAddy: this.state.shipAddy,
                                                billCity: this.state.shipCity,
                                                billState: this.state.shipState,
                                                billZip: this.state.shipZip,
                                                same: checked
                                            })
                                        }else{
                                            this.setState({
                                                billFirst: '',
                                                billLast:'',
                                                billAddy:'',
                                                billCity: '',
                                                billState: '',
                                                billZip: '',
                                                same: checked
                                            })
                                    }
                                    }} name="same" />}
                                    label="Billing address same as shipping?"
                                />
                            </div>
                            
                            {this.state.same ? '' : (
                                <div className='checkout'>
                                    <div className='inputForm'>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-simple">First name</InputLabel>
                                            <OutlinedInput className='inputBox'  onChange={this.handleChange} name='billFirst' label='First Name'  />
                                        </FormControl>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                            <OutlinedInput className='inputBox'  onChange={this.handleChange} name='billLast'  />
                                        </FormControl>
                                    </div>
                                    <div className='inputForm'>
                                        <FormControl variant="outlined">
                                                <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                                <OutlinedInput className='inputBox inputAddy'  onChange={this.handleChange} name='billAddy'  />
                                        </FormControl>
                                    </div>
                                    <div className='inputForm'>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">City</InputLabel>
                                            <OutlinedInput className='inputBox'  onChange={this.handleChange} name='billCity'  />
                                        </FormControl>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">State</InputLabel>
                                            <OutlinedInput  className='inputBox inputState' onChange={this.handleChange} name='billState'  />
                                        </FormControl>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">Zip Code</InputLabel>
                                            <OutlinedInput className='inputBox inputZip'  onChange={this.handleChange} name='billZip'  />
                                        </FormControl>
                                    </div>
                                </div>
                            )}   
                        </form>
                    </div>
                    <div id='addyinput'>
                        <h3>Credit Card Information</h3>
                        <div className='checkout'>
                            <div className='inputForm'>
                                <FormControl variant="outlined" className='MuiFormControl-root'>
                                    <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                                    <OutlinedInput className='inputBox'  onChange={this.handleChange} name='cardFirst'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                    <OutlinedInput className='inputBox'  onChange={this.handleChange} name='cardLast'  />
                                </FormControl>
                            </div>
                            <div className='cardForm'>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Card Number</InputLabel>
                                    <OutlinedInput className='inputBox inputCard'  onChange={this.handleChange} name='cardNum'  />
                                </FormControl>
                            </div>
                            <div className='inputForm'>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Expiration Date</InputLabel>
                                    <OutlinedInput className='inputBox'  onChange={this.handleChange} name='cardExp' placeholder='MM/YY'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Security Code</InputLabel>
                                    <OutlinedInput className='inputBox'  onChange={this.handleChange} name='cardCode'   />
                                </FormControl>
                            </div>
                                
                            
                        </div>
                    </div>
                    <div id='formbutton'>
                        <Button onClick={this.handleSubmit}>Complete Checkout</Button>
                    </div>
                </div>
                
            </div>
        )}else{
            return (
                <div id='orderSumm'>
                    <h1>Congratulations on Your Order {this.state.shipFirst}</h1>
                    <h3>Your order of: </h3>
                    {this.props.cart.length > 0 ? (
                    <div>
                        <ul id='bookList'>
                            {this.props.cart.map(item=>{
                                return (
                                    <li key={item.id} className='bookList'>{item.book}, Quantity:{item.quantity}</li>
                                )
                            })}
                        </ul>
                        <h4 className='orderTot'>Total: ${this.props.cart.reduce((acc, item)=>{
                            acc += (item.price * item.quantity)
                            return acc
                        }, 0)}</h4>
                    </div>
                    ) : (
                    <div>
                        <ul id='bookList'>
                            {this.state.localcart.map((item,idx)=>{
                                return (
                                    <li key={idx} className='bookList'>{item.book}, Quantity:{item.quantity}</li>
                                )
                            })}
                        </ul>
                        <h4 className='orderTot'>Total: ${this.state.localcart.reduce((acc, item)=>{
                            acc += (item.price * item.quantity)
                            return acc
                        }, 0)}</h4>
                    </div>
                    )}
                    
                    <h3>Will be shipped to:</h3>
                    <p className='orderAddy'>{this.state.shipAddy}</p>
                    <p className='orderAddy'>{`${this.state.shipCity}, ${this.state.shipState} ${this.state.shipZip}`}</p>
                </div>
            )
        }
    }
}

const mapState = ({auth, cart}) => {
    return {auth, cart};
  };
  
const mapDispatch = (dispatch) => {
    return {
        createOrder: (userId, order)=> dispatch(createOrder(userId, order)),
        getCart: (userId)=> dispatch(getCart(userId)),
        fetchOrders: (userId)=> dispatch(fetchOrders(userId))
    };
};
  
export default connect(mapState, mapDispatch)(CheckoutForm);


