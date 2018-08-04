import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import BookShelfChanger from './BookShelfChanger'
import {Link} from 'react-router-dom'



class SearchBooksList extends React.Component {
  state = {
    bookSearch: [],
    query: ''
  }

  ifclause = (bookSearch) =>{
    console.log('workaround' +bookSearch)
    if (bookSearch) {
      this.state.bookSearch = bookSearch
    }
    else if (bookSearch === undefined || bookSearch === []) {
      bookSearch => this.setState({})
    }
  }


componentDidUpdate(prevProps, prevState){
  this.setState((newState)=>
  // only update bookSearch, when state and query have changed
    {if (prevState !== newState && newState.query !== prevState.query){
      console.log('Something has changed')
      // get Books from search API
      BooksAPI.search(this.state.query).then(
        // return a value for book search
        (response) => this.ifclause(response)

    ).catch('nope')}
    else {
      //console.log('Nothing has changed.')
      ({bookSearch : []})
    }}
)
}



/*  componentDidUpdate(prevProps, prevState){
    this.setState(

      (newState) =>
    { if (newState !== prevState) {
        if (String(newState.query) !== String(prevState.query)) {
               BooksAPI.search(String(this.state.query)).then((bookSearch) => {
                  this.setState({bookSearch})

        }).catch(
            this.state.bookSearch = [])
            }
         }
        else{console.log('This went wrong')}
      })
} */

  // Search bar - write input in state.query
    onSearch = (e) => {
      this.setState({
        query: e.trim()})
    }



  render() {
/*    let searchResults = []
      if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      console.log(this.state.bookSearch)
                  if (this.state.bookSearch.length === 0) {
                    console.log('only one book left')
                  }
      searchResults = this.state.bookSearch.filter((book) => match.test(book.title))



      }

      else {
          searchResults = []
          } */



    return (
      <div>
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
              <div className="search-books-input-wrapper">
                <input
                    type = "text"
                    placeholder = "Search by title or author"
                    value = {this.state.query}
                    onChange = {(event) => this.onSearch(event.target.value)}
                    ref = {input => this.search = input}
                    />
              </div>
            </div>
          </div>


        <div className="bookshelf">
          <h2 className="bookshelf-title">Search Results</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.bookSearch.map( book => (
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                              </div>
                                  <BookShelfChanger handleClick={this.props.handleClick}/>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
                            </li> )) }
                        </ol>
                      </div>
                    </div>

        </div>

    )
  }

}

export default SearchBooksList


// Great thanks to:
//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
