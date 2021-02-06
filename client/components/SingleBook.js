import React from "react"
import { connect } from "react-redux"
// import { fetchBooks} from '../store/allbooks'
// import { Link } from 'react-router-dom'

export class SingleBook extends React.Component{
  componentDidMount(){
      // this.props.getBook() need to make this function
  }
  render(){
    const { book } = this.props;
    return(
      <div>
        <div>
          <div>
            <img src={ book.img } />
          </div>
          <div>
            <p>Author: { book.author }</p>
          </div>
          <div>
            <p>Description: { book.description }</p>
          </div>
        </div>
        <div>
          <div>
            <p>Price: { book.price }</p>
          </div>
          <button 
            // onClick={()=>{this.props.addToCart()}
            >Add to Cart
          </button>
        </div>
    </div>
    )
  }
}

const mapState = (state, { match })=> {
  const book = state.books.find( book => book.id === match.params.id * 1 ) || {};
  return {
    book
  };
};
  
  const mapDispatch = (dispatch) => {
    return {
    //   getBook: ()=> dispatch(fetchBook()),
    //   addToCart: (book)=>dispatch(addToCart(book))
    };
  };
  
  export default connect(mapState, mapDispatch)(SingleBook);