import React, { Component } from 'react'
import {connect} from 'react-redux'
import FilterOrgs from './FilterOrgs.jsx'
import OrganizationContainer from './OrganizationContainer'

class BrowseTheHub extends Component {
  state = {
    searchTerm: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrgs(orgs)
    })
  }

  handleSearchTerm = (inputFromChild) => {
    this.setState({
      searchTerm: inputFromChild
    })
  }

  filterOrgsArray = () => {
    let orgs = [...this.props.orgs]
    if (this.state.searchTerm === "") {
      return orgs
    } else {
      orgs = this.props.orgs.filter((org) => {
        return Object.keys(org).some(key =>
          typeof org[key] === "string"
          && org[key] !== "description"
          ?
          org[key].toLowerCase().includes(this.state.searchTerm.toLowerCase()) : null
        )
    })     
  }
  return orgs
  }

  render() {
    console.log(this.state.searchTerm)
    return (
      <div className="App">
        <h1 className="welcome">Welcome to the Black Liberation Hub</h1>
        <FilterOrgs
          searchTerm={this.state.searchTerm}
          handleSearchTerm={this.handleSearchTerm}
        />
        <OrganizationContainer orgs={this.filterOrgsArray()}/>
      </div>
    )
  }
}

let setAllOrgs = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgInformation.orgs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseTheHub)