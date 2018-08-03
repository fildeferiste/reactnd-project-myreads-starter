import React from 'react'
import * as BooksAPI from './BooksAPI'

class SearchBooksList extends React.Component {
  state = {
    bookSearch: [],
    query: ''
  }
  componentDidUpdate(prevProps, prevState){
    this.setState((newState) =>
{        if(newState !== prevState) {
            console.log(newState.query + prevState.query)
              //  BooksAPI.search(this.state.query).then((bookSearch) => {
              //    this.setState({bookSearch})
        }//)
        else{console.log('This went wrong')}
      }//}
    )
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
        </div>
    )
  }

}

export default SearchBooksList


// Great thanks to:
//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
