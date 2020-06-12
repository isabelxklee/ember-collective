import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FilterOrgs from './FilterOrgs.jsx'
import OrganizationContainer from './OrganizationContainer'
import Pluralize from 'react-pluralize'

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
    return (
      <div className="App">
        <h1 className="welcome">Resources for Black Lives Matter</h1>
        <h2 className="welcome">
          This is a place to consolidate resources for supporting the Black Lives Matter movement. If you are a non-Black person in America, you must commit to Black liberation and fight for the freedom of Black folks. <Link to="/resources" className="welcome"> Here are some more resources</Link> on fighting racism, protesting safely, and ending the carceral state.
        </h2>
        <FilterOrgs
          searchTerm={this.state.searchTerm}
          handleSearchTerm={this.handleSearchTerm}
        />
        <p className="results">Showing <Pluralize singular={'organization'} count={this.props.orgs.length} /></p>
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