import React, { Component } from 'react'

class Resource extends Component {
  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  render() {
    let {title, author, description, link} = this.props.resource

    return (
      <div className="police-brutality-resource">
        <a href={link} target="_blank" rel="noopener noreferrer" className="small-button"><h3 className="username">{title}</h3></a>
        <h4 id="police-brutality">By {author}</h4>
        {description ? <p className="card">{this.truncateString(description, 150)}</p> : null}
      </div>
    )
  }
}

export default Resource