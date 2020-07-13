import React, { Component } from 'react'

class FilterOrgs extends Component {
  state = {
    selectedTag: "",
    searchTerm: ""
  }

  handleSearch = (event) => {
    this.setState({
      selectedTag: "",
      searchTerm: event.target.value
    })
    this.props.handleCategory("")
    this.props.handleSearchTerm(event.target.value)
  }

  handleCategoryChange = (event) => {
    this.setState({
      selectedTag: event.target.value
    })
    this.props.handleCategory(event.target.value)
  }

  handleReset = () => {
    this.setState({
      selectedTag: ""
    })
    this.props.handleSearchTerm("")
    this.props.handleCategory("")
  }

  render() {    
    return (
      <div className="filter">
        <label><h3>Find an organization to support</h3>
        <input
          className="filter-input"
          type="text"
          name="searchTerm"
          placeholder="Start typing a name, location, or description"
          autoComplete="off"
          value={this.props.searchTerm}
          onChange={this.handleSearch}
        /></label>
        <br />

        <label><h3>Filter by category</h3>
        <select value={this.state.selectedTag} onChange={this.handleCategoryChange} name="selectedTag">
          <option key="100" value="">#all</option>)
          { this.props.tags.map((tag) =>
            <option key={tag.id} value={tag.content}>#{tag.content}</option>)
          }
        </select></label>
        <br />

        <button onClick={this.handleReset} className="filter-button">Clear search terms</button>
      </div>
    )
  }
}

export default FilterOrgs