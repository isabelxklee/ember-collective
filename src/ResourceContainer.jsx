import React, { Component } from 'react'
import {connect} from 'react-redux'
import ResourceTile from './ResourceTile.jsx'
import FilterResources from './FilterResources.jsx'
import Pluralize from 'react-pluralize'

class Resources extends Component {
  state = {
    searchTerm: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/resources")
    .then(r => r.json())
    .then((resources) => {
      this.props.setAllResources(resources)
    })
  }

  handleSearchTerm = (inputFromChild) => {
    this.setState({
      searchTerm: inputFromChild
    })
  }

  filterResources = () => {
    let resources = [...this.props.resources]
    if (this.state.searchTerm === "") {
      return resources
    } else {
      resources = this.props.resources.filter((resource) => {
        return Object.keys(resource).some(key =>
          typeof resource[key] === "string"
          ?
          resource[key].toLowerCase().includes(this.state.searchTerm.toLowerCase()) : null
        )
    })     
  }
  return resources
  }

  render() {
    let resourcesArr = this.filterResources()
    resourcesArr = resourcesArr.map((resource) => {
      return <ResourceTile key={resource.id} resource={resource} />
    })

    return (
      <div className="container">
        <h1>Resources</h1>
        <FilterResources
          searchTerm={this.state.searchTerm}
          handleSearchTerm={this.handleSearchTerm}
        />
        <p className="results">Showing <Pluralize singular={'resource'} count={resourcesArr.length} /></p>
          <div className="resource-container">
          {resourcesArr}
        </div>
      </div>
    )
  }
}

let setAllResources = (resources) => {
  return {
    type: "SET_ALL_RESOURCES",
    payload: resources
  }
}

let mapDispatchToProps = {
  setAllResources: setAllResources
}

let mapStateToProps = (globalState) => {
  return {
    resources: globalState.resourceInformation.resources 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources)