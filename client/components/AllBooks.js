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
<<<<<<< HEAD
        const books = this.props.books.works
        console.log(books)
=======
        const books = this.props.books 
>>>>>>> main
        return(
            <div >
                <div >
                {
                    books && books.map( book => {
                    return (
                        <div key={book.cover_id} >
                            <Link to={`/books/${book.cover_id}`}><img src={`http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}/></Link>
                            <Link to={`/books/${book.cover_id}`}><h3>{ book.title }</h3></Link>
                            Authors: {book.authors.map((author)=>{
                                return(
                                    <p>{author.name}</p>
                                )
                            })}
                            <p>${book.edition_count / 10}</p>
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