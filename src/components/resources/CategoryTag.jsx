import React, { Component } from 'react'

class CategoryTag extends Component {
  state = {
    selectedTag: ""
  }

  handleChange = (event) => {
    this.setState({
      selectedTag: event.target.value
    })
  }

  // we have the category, which is just a string and id
  // find all the joiners that match that category's id
  // extrapolate all the resources tied to those joiners
  // render that list of resources

  render() {
    return (
      <button
        className="tag"
        onClick={this.handleChange}
        value={this.props.category.content}
      >
        #{this.props.category.content}
      </button>
    )
  }
}

export default CategoryTag