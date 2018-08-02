import React from 'react'
import './App.css'
import BookShelf from './BookShelf.js'
import Books from './Books.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
  this.state = {
  books: [],
   readStatus: [],
   selectValue: '',
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  showSearchPage: false
  }
  this.handleClick = this.handleClick.bind(this)

  }


// get Books from API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    }).then(this.bo)
  }

  handleClick = (e) => {
    //e.preventDefault()
    this.setState({selectValue: e.target.value}, ()=> {console.log('this is e')})
  }


  sortBooks = [
    {statusShelf: 'currentlyReading'},
    {statusShelf: 'wantToRead'},
    {statusShelf: 'read'}
  ]

  bo = (books) => {
    this.setState((state, readStatus, books) => ({  //this.setState((state) => ({
    readStatus:
      ([state.books.filter((b) => b.shelf ===  'currentlyReading'), //this.sortBooks.map((a => a.statusShelf))
      state.books.filter((b) => b.shelf === 'wantToRead'),
      state.books.filter((b) => b.shelf === 'read') ])
      }))}

  changeCategory = (readStatus) => {
    this.setState((state, readStatus) =>
    {readStatus: "book1"}
  )
  }

  //BooksAPI.changeShelf(book)

  /*removeBook = (readStatus) => {
    this.setState((state, readStatus) => {
      readStatus:
      state.readStatus.filter((b) => b.id !== readStatus.id)
    })
  } */

  render() {
    return (
      <div className="app">
        {/*Search Page*/}
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
               */}
              <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1 onClick={()=>{console.log('A heading')}}>MyReads</h1>
            </div>

        {/*List of books*/}
            <div className="list-books-content">
                {/* All bookshelves and Categories */}
                <BookShelf books={this.state.books} changeCategory={this.changeCategory} sortBooks={this.sortBooks}
                  bookshelf={this.bo} readStatus={this.state.readStatus} handleClick={this.handleClick}
                  value={this.state.value}/>
            </div>

        {/*Search */}
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}


//}

export default BooksApp
