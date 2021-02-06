import React from "react"
import { connect } from "react-redux"
import { fetchBooks} from '../store/books'
import { Link } from 'react-router-dom'

export class AllBooks extends React.Component{
    componentDidMount(){
        this.props.getBooks() 
    }
    addToCart(productId,num=1){
        
    }
    render(){
        const books = this.props.books 
        return(
            <div >
                <div >
                {
                    books.map( book => {
                    return (
                        <div key={book.id} >
                            <Link to={`/books/${book.id}`}><img src={book.img}/></Link>
                            <Link to={`/books/${book.id}`}><h3>{ book.title }</h3></Link>
                            <p>{book.author}</p>
                            <p>{book.price}</p>
                            <img src={ book.imageUrl } />
                            <button 
                                // onClick={()=>{this.props.addToCart(productId)}
                            >Add to Cart</button>
                        </div>
                    );
                    })
                }
                </div>
      </div>
        )
    }
}

const mapState = ({books}) => {
    return {books};
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getBooks: ()=> dispatch(fetchBooks()),
    //   addToCart: (book)=>dispatch(addToCart(book))
    };
  };
  
  export default connect(mapState, mapDispatch)(AllBooks);