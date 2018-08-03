import React from 'react'
import * as BooksAPI from './BooksAPI'

class SearchBooksList extends React.Component {
  state = {
    bookSearch: [],
    query: ''
  }
  componentDidUpdate(){
      BooksAPI.search(this.state.query).then((bookSearch) => {
        this.setState({bookSearch})
      })
  }
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
        </div>
    )
  }

}

export default SearchBooksList


// Great thanks to:
//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
