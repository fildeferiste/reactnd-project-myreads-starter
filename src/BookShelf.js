import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'


class BookShelf extends React.Component {
//this.props.books.isRequired
//this.props.handleClick.isReruired

  render() {
let books = this.props.readStatus
console.log(books)
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


    return (
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.heading}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map( (book) => (
                  <li key={book.id}>
                    {console.log(book)}
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                        </div>
                              <BookShelfChanger handleClick={this.props.handleClick} book={book} />
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li> )) }
                </ol>
              </div>
            </div>
            {/*//))}  */}
          </div>  // Closing the main div

    )
}
}
  export default BookShelf
