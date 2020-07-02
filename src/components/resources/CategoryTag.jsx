import React, { Component } from 'react'

class CategoryTag extends Component {
  handleChange = (event) => {
    this.props.handleCategoryFilter(event.target.value)
  }

  render() {
    return (
      <button
        className="card-button"
        onClick={this.handleChange}
        value={this.props.category.content}
      >
        #{this.props.category.content}
      </button>
    )
  }
}

export default CategoryTag