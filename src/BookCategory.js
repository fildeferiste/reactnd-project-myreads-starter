import React, {Component} from 'react'

class BookCategory extends React.Component {
  render() {

  const readStatus = [
    {status: 'Currently Reading', },
    {status: 'Want to read'},
    {status: 'Read'}
  ]

  return (
      <div key='123'>
        {readStatus.map(category=> (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{category.status}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">

                {this.props.books.map(book =>(
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                          </div>
                          <div className="book-shelf-changer">
                            <select>
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
                    </li>
                ))}

              </ol>
            </div>
          </div>))}
      </div>  // Closing the main div
    )
  }
}
  export default BookCategory
