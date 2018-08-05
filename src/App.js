import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf.js'
import Header from './Header'
import * as BooksAPI from './BooksAPI'
import SearchBooksList from './SearchBooksList'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      books: [],
      selectValue: '',
      newBook: {},
      a: []
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
    }
  //this.handleClick = this.handleClick.bind(this)
  }

// get Books from Server
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    }).then(this.bo)
  }

//----------------------------------BookShelfs sort-------------------------//
  // Change selectValue on dropdown menu click
  handleClick = (bookNewShelf, e) => {
    let x, y,z
          x = e.target.value
          e.preventDefault
          this.setState({selectValue: x})
            console.log(this.state.books)
            y=  this.state.books.filter((book) => book.id === bookNewShelf.book.id)
            console.log(y)
            y=y[0]
            y.shelf = x
            z = this.setState((state) => {
             books:  {this.state.books.forEach(function(book, index){
                if (book.id === y.id) {
                  book=y
                }
                else if (book.id !== y.id) {
                  book = book
                }
              })}
            })
            if (x === 'none') {
              this.removeBook(bookNewShelf)
              console.log('book will be removed')
            }

  }

  // if book shelf = none
  removeBook = (book) => {
      this.setState((stateNew) => {
        books: this.state.books.filter((b) => b.id !== book.id)
      })
    }

handleNewBook = (bookNewShelf, e) => {
  let x, y, z
  z=[]
      console.log('bookNewShelf '+ bookNewShelf.book.id)
      x = e.target.value
      e.preventDefault
      BooksAPI.get(bookNewShelf.book.id).then(
        (response) =>
          {response.shelf = x
          this.setState({newBook:  response})
          y=  this.state.books.filter((book) => book.id === bookNewShelf.book.id)
          if (y) {
            console.log('y '+ this.state.books)
            console.log('z '+z)
            this.setState((state)=>{
              books: this.state.books.push(this.state.newBook)
            })
            // update on server
            BooksAPI.update(this.state.newBook, x)

          }

      }).catch(console.log('A problem.'))
}


  render() {
    return (
      <div className="app">

        {/*Search Page*/}
        <Route path="/search" render={()=> (
              <SearchBooksList handleClick={this.handleClick} books={this.state.books} handleNewBook={this.handleNewBook}/>
        )}/>

        {/*Bookshelves*/}
        <Route exact path="/" render={()=> (
          <div>
            {/*Heading/Banner*/}
            <Header/>

            {/* All bookshelves and Categories */}
            <BookShelf books={this.state.books}
            handleClick={this.handleClick}
            readStatus= { this.state.books.filter((b) => b.shelf ===  'currentlyReading')}
            heading = {'Currently Reading'}/>

            <BookShelf books={this.state.books}
            handleClick={this.handleClick}
            readStatus= { this.state.books.filter((b) => b.shelf ===  'wantToRead')}
            heading= {'Want to read'}/>

            <BookShelf books={this.state.books}
            handleClick={this.handleClick}
            readStatus= { this.state.books.filter((b) => b.shelf ===  'read')}
            heading = {'Read'}/>

            {/*Button to search */}
            <div className="open-search">
            <Link to="/search">Add a book</Link>
            </div>
          </div>
           )
         } />
      </div>
    )
  }
}

export default BooksApp

//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
