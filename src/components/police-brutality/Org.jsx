import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Org extends Component {
  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  render() {
    let {id, location, name, tagline} = this.props.org

    return (
      <div className="police-brutality-resource">
        <Link to={`/organizations/${id}`}>
          <div className="thin-rule"/>
          <h4 className="card">{location}</h4>
          <h2 className="card">{name}</h2>
        </Link>
        <p className="card">{tagline}</p>
      </div>
    )
  }
}

export default Org