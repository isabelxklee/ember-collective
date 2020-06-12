import React, { Component } from 'react'

class CategoryTag extends Component {
  render() {
    return (
      <button className="cat-tag">
        #{this.props.category}
      </button>
    )
  }
}

export default CategoryTag