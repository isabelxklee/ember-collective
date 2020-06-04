import React, { Component } from 'react'
import {connect} from 'react-redux'

class FilterOrgs extends Component {
  state = {
    search_term: ""
  }

  handleChange = (event) => {
    this.setState({
      search_term: event.target.value
    })
    console.log(event.target.value)
  }

  handleReset = () => {
    this.setState({
      search_term: ""
    })
  }

  render() {

    return (
      <div className="filter">
        <label><h2>Find an organization or bail fund</h2></label>
        <input
          type="text"
          name="search_term"
          placeholder="Enter a name"
          value={this.state.search_term}
          onChange={this.handleChange}
        />
        <button onClick={this.handleReset}>Clear search terms</button>
      </div>
    )
  }
}

let mapStateToProps = (globalState) => {
  return {
    search_term: globalState.search_term
  }
}

export default connect(mapStateToProps)(FilterOrgs)