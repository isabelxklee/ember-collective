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

  findCategoryJoiners = () => {
    let joiners = []

    joiners = this.props.category_joiners.filter((joiner) => {
      return joiner.resource_id === this.props.resource.id
    })
    return joiners
  }

  findCategoryTags = () => {
    let joiners = this.findCategoryJoiners()
    let arr = []
    joiners.forEach((joiner) => {
      this.props.categories.filter((category) => {
        return joiner.category_id === category.id ? arr.push(category) : null
      })
    })
    return arr
  }

  render() {
    let {title, author, description, link, img_url} = this.props.resource
    let tags = this.findCategoryTags().map((category) => {
      return <CategoryTag key={category.id} category={category} handleCategoryFilter={this.props.handleCategoryFilter}/>
    })
  
    return (
      <div>
        {img_url
        ?
        <>
          <img src={img_url} alt={title} className="resource-img" />
            <div className="resource-tile">
              <div className="btn-group">
                {tags}
              </div>
              <a href={link} target="blank" className="small-button"><h2>{title}</h2></a>
              <h4>By {author}</h4>
              <p>{this.truncateString(description, 200)}</p>
              <button className="small-button"><a href={link} target="blank" className="small-button">See more</a></button>
            </div>
        </>
        :
        <>
          <div className="resource-tile-no-image">
            <div className="btn-group">
              {tags}
            </div>
            <a href={link} target="blank" className="small-button"><h2>{title}</h2></a>
            <h4>By {author}</h4>
            <p>{this.truncateString(description, 200)}</p>
            <button className="small-button"><a href={link} target="blank" className="small-button">See more</a></button>
          </div>
        </>
        }
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