import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {withRouter } from 'react-router-dom'

class CardOrg extends Component {
  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  render() {
    let {id, name, website, location, tagline, donation_link} = this.props.org
    return (
      <div className="org-tile">
        <Link to={`/organizations/${id}`}>
          <h4 className="org-tile-title">{location}</h4>
          <h2 className="org-tile-title">{name}</h2>
          <p className="org-tile-title">{this.truncateString(tagline, 175)}</p>
        </Link>
      
        <div className="btn-group">
          <button className="small-button"><a href={website} target="blank" className="small-button">Website</a></button>
          <button className="small-button"><a href={donation_link} target="blank" className="small-button">Donate</a></button>
        </div>
      </div>
    )
  }
}

export default withRouter(CardOrg)