import React from "react"
import { connect } from "react-redux"
import {addToCart} from '../store/cart'


export class SingleBook extends React.Component{
  render(){
    const { book } = this.props;
    return(
      <div>
        <div>
          <div>
            <img src={ book.img } />
          </div>
          <div>
            <p>Title: { book.title }</p>
          </div>
          <div>
            <p>Author: { book.author }</p>
          </div>
          <div>
            <p>Genre: { book.genre }</p>
          </div>
          <div>
            <p>Description: { book.description }</p>
          </div>
          <div>
            <p>Reviews: { book.review }</p>
          </div>
        </div>
        <div>
          <div>
            <p>${ book.price }</p>
          </div>
          <button 
            // onClick={()=>this.props.addToCart(userId, book)}
            >Add to Cart
          </button>
        </div>
    </div>
    )
  }
}

const mapState = (state, { match })=> {
  const book = state.books.find( book => book.coverId === match.params.id * 1 ) || {};
  return {
    book,
  };
};
  
  const mapDispatch = (dispatch) => {
    return {
      addToCart: (userId, book) => dispatch(addToCart(userId, book)),
    };
  };
  
  export default connect(mapState, mapDispatch)(SingleBook);