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

  /*ifclause = (bookSearch) =>{
    console.log('workaround')
    if (bookSearch) {
      this.state.bookSearch = bookSearch
      console.log(bookSearch)
      if (bookSearch.error){
        console.log('error in if in if')
        this.state.bookSearch = []}
    }
    else if (bookSearch === undefined || bookSearch === []) {
      bookSearch => this.setState({})
    }
    else if (bookSearch.error){
      console.log('error!!!!!!!!!!!!')
    }
  } */


/*componentDidUpdate(prevProps, prevState){
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
} */



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
      e = e.split(' ')
      console.log('e'+e)
      this.setState({
        query: e})
        this.updateBookSearch(e)
    }

updateBookSearch = (query) => {
  //let searchResults = []
//  if(query.length === 1) {
    //query[0]
    BooksAPI.search("shakespeare").then( (bookSearch) => {
            if (!bookSearch || bookSearch.error){
              this.setState({bookSearch : []})
              return bookSearch}
            else if (Array.isArray(bookSearch) && bookSearch!==[]) {
            }
            if (this.state.bookSearch !== bookSearch) {
              this.setState({bookSearch: bookSearch})
            }

          }).catch(e => console.log(e))
      //  }
  /*  else if (query.length > 1) {
      /*let searchForThis = ''
      for (let n=0; n< query.length; n++) {
        searchForThis = searchForThis+'&&' +query[n]
        console.log(searchForThis)
      } */
    /*      BooksAPI.search('Kafka in Love').then( (bookSearch) => {
                  if (!bookSearch || bookSearch.error){
                    console.log('if-clause')
                    this.setState({bookSearch : []})
                    return bookSearch}
                  else if (Array.isArray(bookSearch) && bookSearch!==[]) {
                    console.log('yes')
                  }
                  if (this.state.bookSearch !== bookSearch) {
                    this.setState({bookSearch: bookSearch})
                  }
                  // where to place this?
                  if (this.state.bookSearch === []) {
                    this.setState({ noMatch:  false})
                  } */

              //  }
            //  ).catch(e => console.log(e))
  //  }

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
                    value = {this.state.query.join(' ')}
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
                    {/*ref = {input => this.search = input}*/}
