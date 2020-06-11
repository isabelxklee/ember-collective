import React, { Component } from 'react'

class FilterOrgs extends Component {
  handleChange = (event) => {
    this.props.handleSearchTerm(event.target.value)
  }

  handleReset = (event) => {
    this.props.handleSearchTerm("")
  }

  render() {
    return (
      <div className="filter">
        <label><h3>Find an organization to support</h3></label>
        <input
          className="filter-input"
          type="text"
          name="searchTerm"
          placeholder="Start typing a name, location, or description"
          autoComplete="off"
          value={this.props.searchTerm}
          onChange={this.handleChange}
        /><br />
        <button onClick={this.handleReset} className="filter-button">Clear search terms</button>
      </div>
    )
  }
}

export default FilterOrgs