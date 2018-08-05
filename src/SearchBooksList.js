import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelfChanger from './BookShelfChanger'
import {Link} from 'react-router-dom'



class SearchBooksList extends React.Component {
  state = {
    bookSearch: [],
    query: [],
    noMatch: true,
    newBook: {},
  }

  // Search bar - write input in state.query
    onSearch = (e) => {
      if (e || e === '') {
        if (e === '') {
          this.setState({query: e})
          this.setState({noMatch: false})
        }
        else if (e !== '') {
          this.setState({query: e})
          this.updateBookSearch(e)
        }
      }
     else if (typeof(e) === undefined) {
          this.setState({query: ' '})
          this.setState({noMatch: false})
        }
    }

updateBookSearch = (query) => {
    BooksAPI.search(String(query)).then( (bookSearch) => {
      console.log(typeof(query))
            if (!bookSearch || bookSearch.error){
              this.setState({bookSearch : []})
              this.setState({noMatch: false})
              return bookSearch}
          /*  else if (Array.isArray(bookSearch) && bookSearch!==[]) {
              this.setState({noMatch: false})
            } */
            if (this.state.bookSearch !== bookSearch) {
              this.setState({bookSearch: bookSearch})
              this.setState({noMatch: true})
            }

          }).catch(e => console.log(e))
      }


  render() {
    let books = this.state.bookSearch
    console.log(books)
    if (books) {
      for(let n=0; n<books.length; n++) {
        if (typeof(books[n].title) === undefined) {
          books[n].title = 'Title unknown'
        }
        if (books[n].authors === undefined) {
          books[n].authors = 'Author unknown'
        }
        if (books[n].imageLinks === undefined) {
          books[n].imageLinks= {}
          books[n].imageLinks.smallThumbnail = '/icon/add.svg'
        }
      }
    }


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
            <div style={{marginTop: '100px', textAlign: 'center'}}>
              <p>Sorry, we couldn't find any books that match</p>
              <p>Search by author or title with the search bar</p>
            </div>

          )}
        </div>
      )
    }

  }

export default SearchBooksList


// Great thanks to:
//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
                    {/*ref = {input => this.search = input}     join(' ')*/}
