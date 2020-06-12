import React, { Component } from 'react'
import CategoryTag from './CategoryTag.jsx'

class ResourceTile extends Component {
  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  render() {
    let {title, author, description, link, category} = this.props.resource
    return (
    <>
      <CategoryTag category={category}/>

      <div className="resource-tile">
        <h2>{title}</h2>
        <h4>By {author}</h4>
        <p>{this.truncateString(description, 200)}</p>
        <button className="small-button"><a href={link} target="blank" className="small-button">Source</a></button>
      </div>
    </>
    )
  }
}

export default ResourceTile