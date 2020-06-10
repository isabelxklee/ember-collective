import React, { Component } from 'react'
// import {Route, Link, Switch} from 'react-router-dom'
// import OrgProfile from './OrgProfile'

class OrgTile extends Component {
  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  render() {
    let {name, website, location, tagline, donation_link} = this.props.org
    return (
      <div className="org-tile">
        {/* <Link to={`/organizations/${id}`}> <h2>{name}</h2> </Link> */}
        <h4>{location}</h4>
        <h2>{name}</h2>
        <p>{this.truncateString(tagline, 100)}</p>

        <div className="btn-group">
          <button className="small-button"><a href={website} target="blank" className="small-button">Website</a></button>
          <button className="small-button"><a href={donation_link} target="blank" className="small-button">Donate</a></button>
        </div>
      </div>
    )
  }
}

export default OrgTile