import React, { Component } from 'react'

class FilterOrgs extends Component {
  handleChange = (event) => {
    this.props.handleSearchTerm(event.target.value)
    console.log(event.target.value)
  }

  handleReset = (event) => {
    this.props.handleSearchTerm("")
  }

  render() {
    return (
      <div className="filter">
        <label><h2>Find an organization by name or location</h2></label>
        <input
          type="text"
          name="searchTerm"
          placeholder="Start typing a name, location, or description"
          autoComplete="off"
          value={this.props.searchTerm}
          onChange={this.handleChange}
        /><br />
        <button onClick={this.handleReset}>Clear search terms</button>
      </div>
    )
  }
}

export default FilterOrgs