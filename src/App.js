import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }


  render() {
    const readStatus = [
      {status: 'Currently Reading'},
      {status: 'Want to read'},
      {status: 'Read'}
    ]
    return (
      <div className="app">
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
              <div>
                {/* One bookshelf */}
                <BookCategory/>
                {/*Want to read */}
                <BookCategory/>
                {/* Read */}
                <BookCategory/>
              </div>
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

class BookCategory extends React.Component {
  render() {
    const books = [
              {title: 'To kill a Mockingbird',
               author: 'Harper Lee'},
              {title: 'Romeo and Juliet',
               author: 'William Shakespeare'},
              /*{title: 'Buddenbrooks',
              author: 'Thomas Mann'},
              {title: 'Ghosthouse',
              author: 'Isabel Allende'},
              {title: 'Purple Hibiscus',
              author: 'Amamanda Ngozi Adichie'} */
            ]
    return (
      <div>
          <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                    {books.map(book =>(
                              <li>
                                <div className="book">
                                  <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}>
                                    </div>
                                    <div className="book-shelf-changer">
                                      <select>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="book-title">{book.title}</div>
                                  <div className="book-authors">{book.author}</div>
                                </div>
                              </li>
                    ))}

                </ol>
              </div>
            </div>
      </div>  // Closing the main div
    )
  }
}

export default BooksApp
