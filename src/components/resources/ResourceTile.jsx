import React, { Component } from 'react'
import CategoryTag from './CategoryTag.jsx'
import {connect} from 'react-redux'

class ResourceTile extends Component {
  componentDidMount() {
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

  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  renderAllCategories = () => {
    
  }

  render() {
    let {title, author, description, link} = this.props.resource

    return (
      <div className="resource-tile">
        {/* <CategoryTag category={category}/> */}
        {/* include array of category tags */}
        <a href={link} target="blank" className="small-button"><h2>{title}</h2></a>
        <h4>By {author}</h4>
        <p>{this.truncateString(description, 200)}</p>
        <button className="small-button"><a href={link} target="blank" className="small-button">Source</a></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResourceTile)