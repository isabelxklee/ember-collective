import React, { Component } from 'react'
import {connect} from 'react-redux'

class FilterOrgs extends Component {
  handleChange = (event) => {
    this.props.handleSearchTerm(event.target.value)
  }

  handleReset = () => {
    this.props.handleSearchTerm("")
  }

  render() {

    return (
      <div className="filter">
        <label><h2>Find an organization or bail fund</h2></label>
        <input
          type="text"
          name="searchTerm"
          placeholder="Enter a name"
          value={this.props.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleReset}>Clear search terms</button>
      </div>
    )
  }
}

let mapStateToProps = (globalState) => {
  return {
    searchTerm: globalState.searchTerm
  }
}

export default connect(mapStateToProps)(FilterOrgs)