import React from "react"
import { connect } from "react-redux"

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
    }
    componentDidMount(){

    }
    render(){
        if(!this.state.continue){
            return (<div id='main'>
                <div id='formbox'>
                    <div id='shippingInfo'>
                        <h3>Shipping Address</h3>
                        <form>
                            <div id='name'>
                                <label hmtlFor='shipFirst'>First Name:</label>
                                <input type='text' id='shipFirst' name='shipFirst' onChange= {(ev)=>{
                                    this.setState({shipFirst: ev.target.value})
                                }}/>
                                <label hmtlFor='shipLast'>Last Name:</label>
                                <input type='text' id='shipLast' name='shipLast' onChange= {(ev)=>{
                                    this.setState({shipLast: ev.target.value})
                                }}/>
                            </div>
                            <label hmtlFor='shipAddy'>Address:</label>
                            <input type='text' id='shipAddy' name='shipAddy' onChange= {(ev)=>{
                                    this.setState({shipAddy: ev.target.value})
                                }}/>
                            <div id='csz'>
                                <label hmtlFor='shipCity'>City:</label>
                                <input type='text' id='shipCity' name='shipCity' onChange= {(ev)=>{
                                    this.setState({shipCity: ev.target.value})
                                }}/>
                                <label hmtlFor='shipState'>State:</label>
                                <input type='text' id='shipState' name='shipState' onChange= {(ev)=>{
                                    this.setState({shipState: ev.target.value})
                                }}/>
                                <label hmtlFor='shipZip'>Zip Code:</label>
                                <input type='text' id='shipZip' name='shipZip' onChange= {(ev)=>{
                                    this.setState({shipZip: ev.target.value})
                                }}/>
                            </div>
                        </form>
                    </div>
                    <div id='billingAddy'>
                        <h3>Billing Address</h3>
                        <form>
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
                                        <input type='text' id='billFirst' name='billFirst' onChange= {(ev)=>{
                                            this.setState({billFirst: ev.target.value})
                                        }}/>
                                        <label hmtlFor='billLast'>Last Name:</label>
                                        <input type='text' id='billLast' name='billLast' onChange= {(ev)=>{
                                            this.setState({billLast: ev.target.value})
                                        }}/>
                                    </div>
                                    <label hmtlFor='billAddy'>Address:</label>
                                    <input type='text' id='billAddy' name='billAddy' onChange= {(ev)=>{
                                            this.setState({billAddy: ev.target.value})
                                        }}/>
                                    <div id='csz'>
                                        <label hmtlFor='billCity'>City:</label>
                                        <input type='text' id='billCity' name='billCity' onChange= {(ev)=>{
                                            this.setState({billCity: ev.target.value})
                                        }}/>
                                        <label hmtlFor='billState'>State:</label>
                                        <input type='text' id='billState' name='billState' onChange= {(ev)=>{
                                            this.setState({billState: ev.target.value})
                                        }}/>
                                        <label hmtlFor='billZip'>Zip Code:</label>
                                        <input type='text' id='billZip' name='billZip' onChange= {(ev)=>{
                                            this.setState({billZip: ev.target.value})
                                        }}/>
                                    </div>
                                </div>
                            )}   
                        </form>
                    </div>
                    <div id='billingInfo'>
                        <div id='name'>
                            <label hmtlFor='cardFirst'>First Name:</label>
                            <input type='text' id='cardFirst' name='cardFirst' onChange= {(ev)=>{
                                this.setState({cardFirst: ev.target.value})
                            }}/>
                            <label hmtlFor='cardLast'>Last Name:</label>
                            <input type='text' id='cardLast' name='cardLast' onChange= {(ev)=>{
                                this.setState({cardLast: ev.target.value})
                            }}/>
                        </div>
                        <div id='cardInfo'>
                            <label hmtlFor='cardNum'>Card Number:</label>
                            <input type='text' id='cardNum' name='cardNum' onChange= {(ev)=>{
                                this.setState({cardNum: ev.target.value})
                            }}/>
                            <label hmtlFor='cardExp'>Expiration Date:</label>
                            <input type='text' id='cardExp' name='cardExp' value='MM/YY' onChange= {(ev)=>{
                                this.setState({cardExp: ev.target.value})
                            }}/>
                            <label hmtlFor='cardCode'>Security Code:</label>
                            <input type='text' id='cardCode' name='cardCode' onChange= {(ev)=>{
                                this.setState({cardCode: ev.target.value})
                                console.log(this.state)
                            }}/>
                        </div>
                    </div>
                </div>
                
            </div>
        )}else{
            return (
                <div id='orderSumm'>

                </div>
            )
        }
    }
}

const mapState = ({auth}) => {
    return {auth};
  };
  
const mapDispatch = (dispatch) => {
    return {
        getCart: (userId)=> dispatch(getCart(userId)),
    };
};
  
export default connect(mapState, mapDispatch)(CheckoutForm);