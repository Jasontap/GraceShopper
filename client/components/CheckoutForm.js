import React from "react"
import { connect } from "react-redux"
import { getCart} from '../store/cart'
import {createOrder, fetchOrders} from '../store/checkout'
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export class CheckoutForm extends React.Component{
    constructor(){
        super()
        this.state = {
            shipFirst: '', shipLast:'', shipAddy: '', shipCity: '', shipState: '', shipZip: '', billFirst: '', billLast:'', billAddy:'',
            billCity: '', billState: '', billZip: '', cardFirst:'', cardLast:'', cardNum:'', cardExp: '', cardCode: '', same: false, continue: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
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
            console.log(alerts)
            const string = alerts.reduce((acc,item)=>{
                acc += `${item}\n`
                return acc
            },'Please fill out the following:\n')
            alert(string)
        }
        if(alerts.length === 0){
            this.props.createOrder(order, userId)
            this.setState({continue: true})
        }

    }
    render(){
        if(!this.state.continue){
            return (<div id='main'>
                <div id='formbox'>
                    <div id='shippingInfo'>
                        <h3>Shipping Address</h3>
                        <form className='checkout'  noValidate autoComplete="off">
                            <div id='name'>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                                    <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='shipFirst'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                    <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='shipLast'  />
                                </FormControl>
                            </div>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='shipAddy'  />
                            </FormControl>
                            <div id='csz'>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">City</InputLabel>
                                    <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='shipCity'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">State</InputLabel>
                                    <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='shipState'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Zip Code</InputLabel>
                                    <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='shipZip'  />
                                </FormControl>
                            </div>
                        </form>
                    </div>
                    <div id='billingAddy'>
                        <h3>Billing Address</h3>
                        <form className='checkout'>
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
                            
                            {this.state.same ? '' : (
                                <div>
                                    <div id='name'>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-simple">First name</InputLabel>
                                            <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='billFirst' label='First Name'  />
                                        </FormControl>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                            <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='billLast'  />
                                        </FormControl>
                                    </div>
                                    <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">Address</InputLabel>
                                            <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='billAddy'  />
                                    </FormControl>
                                    <div id='csz'>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">City</InputLabel>
                                            <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='billCity'  />
                                        </FormControl>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">State</InputLabel>
                                            <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='billState'  />
                                        </FormControl>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="component-outlined">Zip Code</InputLabel>
                                            <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='billZip'  />
                                        </FormControl>
                                    </div>
                                </div>
                            )}   
                        </form>
                    </div>
                    <div id='billingInfo'>
                        <h3>Credit Card Information</h3>
                        <div id='name'>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                                <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='cardFirst'  />
                            </FormControl>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                                <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='cardLast'  />
                            </FormControl>
                        </div>
                        <div id='cardInfo'>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="component-outlined">Card Number</InputLabel>
                                <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='cardNum'  />
                            </FormControl>
                            <div id="exp">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Expiration Date</InputLabel>
                                    <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='cardExp' placeholder='MM/YY'  />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="component-outlined">Security Code</InputLabel>
                                    <OutlinedInput id="component-outlined"  onChange={this.handleChange} name='cardCode'   />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <Button onClick={this.handleSubmit}>Complete Checkout</Button>
                </div>
                
            </div>
        )}else{
            return (
                <div id='orderSumm'>
                    <h3>Congratulations on Your Order {this.state.shipFirst}</h3>
                    <h5>Your order of: </h5>
                    <ul>
                        {this.props.cart.map(item=>{
                            return (
                                <li key={item.id}>Title:{item.book}, Quantity:{item.quantity}</li>
                            )
                        })}
                    </ul>
                    <h5>Will be shipped to:</h5>
                    <p>{this.state.shipAddy}</p>
                    <p>{`${this.state.shipCity}, ${this.state.shipState} ${this.state.shipZip}`}</p>
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


