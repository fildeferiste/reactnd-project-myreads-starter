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

//----------------------------------BookShelfs sort-------------------------//

// sort the books according to their shelf
  bo = (books) => {
    console.log('called')
    this.setState( {
    currentlyReading: this.state.books.filter((b) => b.shelf ===  'currentlyReading'),
    wantToRead: this.state.books.filter((b) => b.shelf === 'wantToRead'),
    read: this.state.books.filter((b) => b.shelf === 'read')
  })}

  // Change selectValue on dropdown menu click
  handleClick = (bookNewShelf, e) => {
    let x, y,z
    console.log(e)
    console.log(bookNewShelf.book.id)
          //e.preventDefault()
          x = e.target.value
          this.setState({selectValue: x}),
            console.log(this.state.books),
            y=  this.state.books.filter((book) => book.id == bookNewShelf.book.id),
            console.log(y)
            y=y[0]
            y.shelf = x
            this.setState((state) => {
             books:  {this.state.books.forEach(function(book, index){
                if (book.id === y.id) {
                  book=y
                }
                else if (book.id !== y.id) {
                  book = book
                }
              })}
            })

  }

  // if book shelf = none
  removeBook = (book) => {
      this.setState((stateNew) => {
        books: this.state.books.filter((b) => b.id !== book.id)
      })
    }


  componentDidUpdate(){
    console.log('updated '+ this.state.books)
    this.setState((prevState) =>
    {if (prevState.books !== this.state.books){
            this.setState( {
            currentlyReading: this.state.books.filter((b) => b.shelf ===  'currentlyReading'),
            wantToRead: this.state.books.filter((b) => b.shelf === 'wantToRead'),
            read: this.state.books.filter((b) => b.shelf === 'read')
          })
        console.log(this.state.books)
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


  render() {
    return (
      <div className="app">

        {/*Search Page*/}
        <Route path="/search" render={()=> (
              <SearchBooksList handleClick={this.handleClick}/>
        )}/>

        {/*Bookshelves*/}
        <Route exact path="/" render={()=> (
          <div>
            {/*Heading/Banner*/}
            <Header/>

            {/* All bookshelves and Categories */}
            <BookShelf books={this.state.books}
            changeCategory={this.changeCategory}
            bookshelf={this.bo}
            handleClick={this.handleClick}
            readStatus= { this.state.books.filter((b) => b.shelf ===  'currentlyReading')}
            heading = {'Currently Reading'}/>

            <BookShelf books={this.state.books}
            changeCategory={this.changeCategory}
            bookshelf={this.bo}
            handleClick={this.handleClick}
            readStatus= { this.state.books.filter((b) => b.shelf ===  'wantToRead')}
            heading= {'Want to read'}/>

            <BookShelf books={this.state.books}
            changeCategory={this.changeCategory}
            bookshelf={this.bo}
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
