import React, { Component } from 'react'

class FilterResources extends Component {
  handleChange = (event) => {
    this.props.handleSearchTerm(event.target.value)
  }

  handleReset = (event) => {
    this.props.handleSearchTerm("")
  }

  render() {
    return (
      <div className="resources-filter">
        <label><h3>Find a resource</h3></label>
        <input
          className="filter-input"
          type="text"
          name="searchTerm"
          placeholder="Start typing in a title or author"
          autoComplete="off"
          value={this.props.searchTerm}
          onChange={this.handleChange}
        /><br />
        <button onClick={this.handleReset} className="filter-button">Clear search terms</button>
      </div>
    )
  }
}

export default FilterResources