import React from 'react'


class BookShelfChanger extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectValue: ''
      }
        this.handleClick = this.handleClick.bind(this)

    }
      handleClick = (e) => {
        e.preventDefault()
        this.setState({selectValue: e.target.value},
          (state) => ({books: (this.state.books.map((shelf) => console.log(shelf)))})
        )
          //()=> {(this.state.books.map((this.shelf) = this.state.selectValue)})
      }

      render() {
        return (
          <div className="book-shelf-changer">
            <select onClick={this.props.handleClick}>
              <option value="move" disabled>Move to...</option>
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
