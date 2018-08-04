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
                                  <div className="book-shelf-changer">
                                    <select onChange={this.props.handleClick.bind(this, {book})}>
                                      <option value="move" style={{color: "gray"}}>Move to...</option>
                                      <option value="currentlyReading">Curren}tly Reading</option>
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
            {/*//))}  */}
          </div>  // Closing the main div

    )
}
}
  export default BookShelf
