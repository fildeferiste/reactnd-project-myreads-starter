import React from 'react'
import './App.css'
import BookShelf from './BookShelf.js'
import Books from './Books.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    /* readStatus: [
          {},
          {},
          {}
        ], */
    readStatus: '',

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }


// get Books from API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
          this.setState( //(state) => {
            // readStatus: state.books.filter((b) => b.shelf === 'read'))
            {readStatus: 'read'})
  }

  sortBooks = [
    {status: 'Currently Reading'},
    {status: 'Want to read'},
    {status: 'Read'},
  ]


  // BooksAPI.changeShelf(book)

  removeBook = (book) => {   //maybe add one as well?
    this.setState((state) => {
      books: state.books.filter((b) => b.id === book.id)
    })
  }

  // status = (readStatus) => {
  //   this.setstate
  //     }
  //componentDidMount(){
      //(readStatus) =>
  //    this.setState( //(state) => {
        // readStatus: state.books.filter((b) => b.shelf === 'read'))
  //      readStatus: 'read'
  //    )}
  //}




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
              <h1>MyReads</h1>
            </div>

        {/*List of books*/}
            <div className="list-books-content">
                {/* All bookshelves and Categories */}
                <BookShelf books={this.state.books} deleteBook={this.removeBook} sortBooks={this.sortBooks}/>
                <div>{console.log(this.status)}</div>
            </div>

        {/*Search */}
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              {/*<a onClick={() => this.setState(this.status)}></a>*/}
            </div>
          </div>
        )}
      </div>
    )
  }
}


//}

export default BooksApp
