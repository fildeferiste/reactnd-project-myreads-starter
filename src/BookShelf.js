import React, {Component} from 'react'
import Books from './Books.js'
import BookShelfChanger from './BookShelfChanger'


class BookShelf extends React.Component {


  render() {
    if (this.props.readStatus.map(subarray => subarray.map(book=> book)) !== []) {
  return (
      <div key='123'>
        {this.props.readStatus.map(subarray =>(
        <div className="bookshelf">
          <h2 className="bookshelf-title">{}</h2>      {/* Fix this!*/}
          <div className="bookshelf-books">
            <ol className="books-grid">
              {subarray.map( book => (
                            <li key={book.id}>
                              {/*console.log(book)*/}
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
                  ))}
          </div>  // Closing the main div
)}
else {return (<div>Error</div>)
}
}
}
  export default BookShelf
