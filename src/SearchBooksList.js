import React from 'react'
import * as BooksAPI from './BooksAPI'

class SearchBooksList extends React.Component {
  state = {
    bookSearch: [],
  }
  componentReceiveProps(){
      BooksAPI.search(this.props.query).then((bookSearch) => {
        this.setState({bookSearch})
      })
  }


  render() {
    return (
      <div>
        <div> Search book </div>
        <div> {console.log(this.state.bookSearch)} </div>
      </div>

    )
  }

}

export default SearchBooksList


// Great thanks to:
//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
