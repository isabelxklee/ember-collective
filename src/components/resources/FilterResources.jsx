import React, { Component } from 'react'
import {connect} from 'react-redux'
import CategoryTag from './CategoryTag.jsx'
 

class FilterResources extends Component {
  componentDidMount() {
    fetch(`${ this.props.deploy}/categories`)
    .then(r => r.json())
    .then((categories) => {
      this.props.setAllCategories(categories)
    })
    fetch(`${ this.props.deploy}/category_joiners`)
    .then(r => r.json())
    .then((category_joiners) => {
      this.props.setAllCategoryJoiners(category_joiners)
    })
  }

  handleReset = () => {
    this.props.handleCategoryFilter("")
  }

  render() {
    let categories = this.props.categories.map((category) => {
      return <CategoryTag key={category.id} category={category} handleCategoryFilter={this.props.handleCategoryFilter} local={ this.props.deploy} deploy={this.props.deploy}/>
    })

    return (
      <div className="resources-filter">
        <h3>View resources by category</h3>
        <div className="btn-group">
          { categories }
        </div>
        <button onClick={this.handleReset} className="filter-button">See all resources</button>
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

let mapDispatchToProps = {
  setAllCategories: setAllCategories,
  setAllCategoryJoiners: setAllCategoryJoiners
}

let mapStateToProps = (globalState) => {
  return {
    categories: globalState.categoryInformation.categories,
    category_joiners: globalState.categoryInformation.category_joiners
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterResources)