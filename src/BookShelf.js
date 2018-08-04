import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'


class BookShelf extends React.Component {


  render() {
    return (
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.heading}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.readStatus.map( (book) => (
                  <li key={book.id}>
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
