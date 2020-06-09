import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import OrgProfile from './OrgProfile'

class OrgTile extends Component {
  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  render() {
    let {id, name, website, location, tagline, donation_link} = this.props.org
    return (
      <div>
        <>
        <Link to={`/organizations/${id}`}> <h2>{name}</h2> </Link>
        <p>Location: {location}</p>
        <p><a href={website} target="blank">Website</a></p>
        <p><a href={donation_link} target="blank">Donate</a></p>
        <p>{tagline}</p>
        </>
      
      <>
      <Route path={`/organizations/${id}`}>
        <OrgProfile
          org = {this.props.org}
        />
      </Route>
      </>
      </div>
    )
  }
}

export default OrgTile