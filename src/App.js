import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf.js'
import Books from './Books.js'
import * as BooksAPI from './BooksAPI'
import SearchBooksList from './SearchBooksList'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      books: [],
      query: '',
      selectValue: '',
      currentlyReading: [],
      wantToRead: [],
      read: []
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


// sort the books according to their shelf
  bo = (books) => {
    console.log('called')
    this.setState( {      //(state, books) =>
    currentlyReading: this.state.books.filter((b) => b.shelf ===  'currentlyReading'),
    wantToRead: this.state.books.filter((b) => b.shelf === 'wantToRead'),
    read: this.state.books.filter((b) => b.shelf === 'read')
  })}

  // Change selectValue on dropdown menu click
  handleClick = (bookNewShelf, e) => {
    let x, y,z
    console.log(e)
    console.log(bookNewShelf.book.id)
          e.preventDefault()
          x = e.target.value
          this.setState({selectValue: x}),
            console.log(this.state.books),
            y=  this.state.books.filter((book) => book.id == bookNewShelf.book.id),
            console.log(y)
            y[0].shelf = x
            z=this.state.books.forEach(function(book, index){
              if (book.id === y[0].id) {
                book=y
              }
              else if (book.id !== y[0].id) {
                book = book
              }
            })
  }


  componentWillUpdate(prevProps, prevState){
    console.log('updated '+ this.state.books)
    this.setState((newState) =>
    {if (prevState !== newState){
          this.bo(newState.books)
    }})
  }

  changeCategory = (book) => {}//(readStatus) => {
    //this.setState((state, value, readStatus) =>
    // {if book.id === e.target
    //   console.log(book.id)
    // if (book.id === this.state.book.id)
    // { book.shelf = this.state.selectValue}
    //}
//  )
  //}

// Search bar
  onSearch = (e) => {
    e.preventDefault()
    this.setState({
      query: this.search.value
    })
    console.log('search-submit')
  }


// TODO: Can I be deleted?
  sortBooks = [
    {statusShelf: 'currentlyReading'},
    {statusShelf: 'wantToRead'},
    {statusShelf: 'read'}
  ]




  /*removeBook = (readStatus) => {
    this.setState((state, readStatus) => {
      readStatus:
      state.readStatus.filter((b) => b.id !== readStatus.id)
    })
  } */

  render() {
    return (
      <div className="app">
        {/*Heading/Banner*/}
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          </div>

        {/*Search Page*/}
        <Route path="/search" render={()=> (
              <SearchBooksList queryEx={this.state.query} handleClick={this.handleClick}/>
        )}/>


        {/*Bookshelves*/}
                        {/* All bookshelves and Categories */}

        <Route exact path="/" render={()=> (
          <div>
            <BookShelf books={this.state.books}
            changeCategory={this.changeCategory}
            sortBooks={this.sortBooks}
            bookshelf={this.bo}
            handleClick={this.handleClick}
            value={this.state.value}
            readStatus= {this.state.currentlyReading}
            heading = {'Currently Reading'}/>

            <BookShelf books={this.state.books}
            changeCategory={this.changeCategory}
            sortBooks={this.sortBooks}
            bookshelf={this.bo}
            handleClick={this.handleClick}
            value={this.state.value}
            readStatus={this.state.wantToRead}
            heading= {'Want to read'}/>

            <BookShelf books={this.state.books}
            changeCategory={this.changeCategory}
            sortBooks={this.sortBooks}
            bookshelf={this.bo}
            handleClick={this.handleClick}
            value={this.state.value}
            readStatus={this.state.read}
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


//}

export default BooksApp

//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
