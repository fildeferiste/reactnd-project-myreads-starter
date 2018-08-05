import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import BookShelfChanger from './BookShelfChanger'
import {Link} from 'react-router-dom'



class SearchBooksList extends React.Component {
  state = {
    bookSearch: [],
    query: [],
    noMatch: true,
    newBook: {},
    a: []
  }

  // Search bar - write input in state.query
    onSearch = (e) => {
      //e = e.split(' ')
      //console.log('e'+e)
      this.setState({
        query: e})
        this.updateBookSearch(e)
    }

updateBookSearch = (query) => {
  console.log('query '+query)
    BooksAPI.search(String(query)).then( (bookSearch) => {
            if (!bookSearch || bookSearch.error){
              this.setState({bookSearch : []})
              return bookSearch}
            else if (Array.isArray(bookSearch) && bookSearch!==[]) {
            }
            if (this.state.bookSearch !== bookSearch) {
              this.setState({bookSearch: bookSearch})
            }

          }).catch(e => console.log(e))
      }


  render() {

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type = "text"
                placeholder = "Search by title or author"
                value = {this.state.query}
                onChange = {(event) => this.onSearch(event.target.value)}
                />
            </div>
          </div>
        </div>

        {this.state.noMatch ? (  <div className="bookshelf">
          <h2 className="bookshelf-title">Search Results</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.bookSearch.map( book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                      </div>
                      <BookShelfChanger handleClick={this.props.handleNewBook} book={book}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li> )) }
              </ol>
            </div>
          </div>): (
            <div style={{marginTop: '100px', textAlign: 'center'}}>Sorry, we couldn't find any books that match</div>

          )}



        </div>



      )
    }

  }

export default SearchBooksList


// Great thanks to:
//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
                    {/*ref = {input => this.search = input}     join(' ')*/}
