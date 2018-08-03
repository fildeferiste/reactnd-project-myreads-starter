import React from 'react'
import * as BooksAPI from './BooksAPI'

class SearchBooksList extends React.Component {
  state = {
    bookSearch: [],
    query: ''
  }
  componentDidUpdate(prevProps, prevState){
    this.setState((newState) =>
    { if (newState !== prevState) {
      //console.log(newState.query + prevState.query)
        if (String(newState.query) !== String(prevState.query)) {
               BooksAPI.search(String(this.state.query)).then((bookSearch) => {
                  this.setState({bookSearch})
        })}
         }
        else{console.log('This went wrong')}
      })
}

  // Search bar - write input in state.query
    onSearch = (e) => {
      e.preventDefault()
      this.setState({
        query: this.search.value
      })
    }



  render() {
    return (
      <div>
        <div> Search book </div>
        <div> {console.log(this.state.bookSearch)} </div>
          <div className="search-books-input-wrapper">
              <input
                  type = "text"
                  placeholder = "Search by title or author"
                  onChange = {this.onSearch}
                  ref = {input => this.search = input}
                  />
          </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{}</h2>      {/* Fix this!*/}
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.bookSearch.map( book => (
                            <li key={book.id}>
                              {/*console.log(book)*/}
                              <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                              </div>
                                  <div className="book-shelf-changer">
                                    <select onClick={this.props.handleClick}>
                                      <option value="move" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
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
