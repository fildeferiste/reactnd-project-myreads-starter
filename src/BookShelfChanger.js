import React from 'react'

class BookShelfChanger extends React.Component {

// Dropdown Menu added to each book on main-page and search page
  render() {
    let book = this.props.book

    return (
      <div className="book-shelf-changer">
        <select onChange={this.props.handleClick.bind(this, {book})}>
          <option value="move" style={{color: 'gray'}}>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
