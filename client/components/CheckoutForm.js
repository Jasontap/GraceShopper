import React from "react"
import { connect } from "react-redux"
import { getCart } from '../store/cart'


export class CheckoutForm extends React.Component{
    constructor(){
        super()
        this.state = {
            shipFirst: '',
            shipLast:'',
            shipAddy: '',
            shipCity: '',
            shipState: '',
            shipZip: '',
            billFirst: '',
            billLast:'',
            billAddy:'',
            billCity: '',
            billState: '',
            billZip: '',
            cardFirst:'',
            cardLast:'',
            cardNum:'',
            cardExp: '',
            cardCode: '',
            same: false,
            continue: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        this.props.getCart(this.props.auth.id)
        console.log(this.props)
    }
    handleChange(ev){
        const {name, value} = ev.target
        this.setState({[name] : value})
        console.log(this.state)
    }
    handleSubmit(ev){
        ev.preventDefault()
        this.setState({continue: true})
    }
    render(){
        if(!this.state.continue){
            return (<div id='main'>
                <div id='formbox'>
                    <div id='shippingInfo'>
                        <h3>Shipping Address</h3>
                        <form className='checkout'>
                            <div id='name'>
                                <label hmtlFor='shipFirst'>First Name:</label>
                                <input type='text' id='shipFirst' name='shipFirst' onChange= {this.handleChange}/>
                                <label hmtlFor='shipLast'>Last Name:</label>
                                <input type='text' id='shipLast' name='shipLast' onChange= {this.handleChange}/>
                            </div>
                            <label hmtlFor='shipAddy'>Address:</label>
                            <input type='text' id='shipAddy' name='shipAddy' onChange= {this.handleChange}/>
                            <div id='csz'>
                                <label hmtlFor='shipCity'>City:</label>
                                <input type='text' id='shipCity' name='shipCity' onChange= {this.handleChange}/>
                                <label hmtlFor='shipState'>State:</label>
                                <input type='text' id='shipState' name='shipState' onChange= {this.handleChange}/>
                                <label hmtlFor='shipZip'>Zip Code:</label>
                                <input type='text' id='shipZip' name='shipZip' onChange= {this.handleChange}/>
                            </div>
                        </form>
                    </div>
                    <div id='billingAddy'>
                        <h3>Billing Address</h3>
                        <form className='checkout'>
                            <input type="checkbox" id="same" name="same"  onChange={()=>{
                                const checked = !this.state.same
                                if(checked){
                                    this.setState({
                                        billFirst: shipFirst,
                                        billLast: shipLast,
                                        billAddy: shipAddy,
                                        billCity: shipCity,
                                        billState: shipState,
                                        billZip: shipZip,
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
                            }}/>
                            <label hmtlFor="same"> Billing Address same as Shipping?</label>
                            {this.state.same ? '' : (
                                <div>
                                    <div id='name'>
                                        <label hmtlFor='billFirst'>First Name:</label>
                                        <input type='text' id='billFirst' name='billFirst' onChange= {this.handleChange}/>
                                        <label hmtlFor='billLast'>Last Name:</label>
                                        <input type='text' id='billLast' name='billLast' onChange= {this.handleChange}/>
                                    </div>
                                    <label hmtlFor='billAddy'>Address:</label>
                                    <input type='text' id='billAddy' name='billAddy' onChange= {this.handleChange}/>
                                    <div id='csz'>
                                        <label hmtlFor='billCity'>City:</label>
                                        <input type='text' id='billCity' name='billCity' onChange= {this.handleChange}/>
                                        <label hmtlFor='billState'>State:</label>
                                        <input type='text' id='billState' name='billState' onChange= {this.handleChange}/>
                                        <label hmtlFor='billZip'>Zip Code:</label>
                                        <input type='text' id='billZip' name='billZip' onChange= {this.handleChange}/>
                                    </div>
                                </div>
                            )}   
                        </form>
                    </div>
                    <div id='billingInfo'>
                        <h3>Credit Card Information</h3>
                        <div id='name'>
                            <label hmtlFor='cardFirst'>First Name:</label>
                            <input type='text' id='cardFirst' name='cardFirst' onChange= {this.handleChange}/>
                            <label hmtlFor='cardLast'>Last Name:</label>
                            <input type='text' id='cardLast' name='cardLast' onChange= {this.handleChange}/>
                        </div>
                        <div id='cardInfo'>
                            <label hmtlFor='cardNum'>Card Number:</label>
                            <input type='text' id='cardNum' name='cardNum' onChange= {this.handleChange}/>
                            <div id="exp">
                                <label hmtlFor='cardExp'>Expiration Date:</label>
                                <input type='text' id='cardExp' name='cardExp' value='MM/YY' onChange= {this.handleChange}/>
                                <label hmtlFor='cardCode'>Security Code:</label>
                                <input type='text' id='cardCode' name='cardCode' onChange= {this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.handleSubmit}>Complete Checkout</button>
                </div>
                
            </div>
        )}else{
            return (
                <div id='orderSumm'>
                    <h3>Congratulations on Your Order {this.state.shipFirst}</h3>
                    <h5>Your order of: (add cart items here)</h5>
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
        getCart: (userId)=> dispatch(getCart(userId)),
    };
};
  
export default connect(mapState, mapDispatch)(CheckoutForm);

// Order model:

// User info--- association
//products bought--- association
// address
// city
// state
// zip
// card#
// cardExp
// cardCode
