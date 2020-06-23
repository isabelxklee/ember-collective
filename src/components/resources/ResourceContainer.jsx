import React, { Component } from 'react'
import {connect} from 'react-redux'
import ResourceTile from './ResourceTile.jsx'
import FilterResources from './FilterResources.jsx'
import Pluralize from 'react-pluralize'

class Resources extends Component {
  state = {
    selectedTag: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/resources")
    .then(r => r.json())
    .then((resources) => {
      this.props.setAllResources(resources)
    })
    fetch("http://localhost:3000/categories")
    .then(r => r.json())
    .then((categories) => {
      this.props.setAllCategories(categories)
    })
    fetch("http://localhost:3000/category_joiners")
    .then(r => r.json())
    .then((category_joiners) => {
      this.props.setAllCategoryJoiners(category_joiners)
    })
  }

  handleCategoryFilter = (inputFromChild) => {
    this.setState({
      selectedTag: inputFromChild
    })
  }

  findCategory = () => {
    let selectedCategory = ""

    if (this.state.selectedTag !== "") {
      let categories = [...this.props.categories]
      categories.filter((category) => {
        return category.content === this.state.selectedTag ? selectedCategory = category : null
      })
    }

    return selectedCategory
  }

  findJoiners = () => {
    let joiners = []
    let selectedCategory = this.findCategory()

    if (this.props.category_joiners) {
      this.props.category_joiners.filter((joiner) => {
        return joiner.category_id === selectedCategory.id ? joiners.push(joiner) : null
      })
    }

    return joiners
  }

  filterResources = () => {
    let joiners = this.findJoiners()
    let resources = this.props.resources
    let filteredResources = []

    if (this.state.selectedTag !== "") {
      joiners.forEach((joiner) => {
        resources.filter((resource) => {
          return joiner.resource_id === resource.id ? filteredResources.push(resource) : null
        })
      })
    } else if (this.state.selectedTag === "") {
      return resources
    }

  return filteredResources
  }

  render() {
    let resourcesArr = this.filterResources()
    resourcesArr = resourcesArr.map((resource) => {
      return <ResourceTile key={resource.id} resource={resource} resources={this.props.resources} handleCategoryFilter={this.handleCategoryFilter}/>
    })

    console.log(this.filterResources())

    return (
      <div className="container">
        <h1>Resources</h1>
        <FilterResources
          handleCategoryFilter={this.handleCategoryFilter}
        />
        <p><strong>Showing <Pluralize singular={'resource'} count={resourcesArr.length} /></strong></p>
          <div className="resource-container">
          {resourcesArr}
        </div>
      </div>
    )
  }
}

let setAllCategories = (categories) => {
  return {
    type: "SET_ALL_CATEGORIES",
    payload: categories
  }
}

let setAllCategoryJoiners = (category_joiners) => {
  return {
    type: "SET_ALL_CATEGORY_JOINERS",
    payload: category_joiners
  }
}

let setAllResources = (resources) => {
  return {
    type: "SET_ALL_RESOURCES",
    payload: resources
  }
}

let mapDispatchToProps = {
  setAllResources: setAllResources,
  setAllCategories: setAllCategories,
  setAllCategoryJoiners: setAllCategoryJoiners
}

let mapStateToProps = (globalState) => {
  return {
    resources: globalState.resourceInformation.resources,
    categories: globalState.categoryInformation.categories,
    category_joiners: globalState.categoryInformation.category_joiners
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources)