import React, { Component } from 'react'

class OrgTile extends Component {
  render() {
    let {name, website, location, description, donation_link} = this.props.org
    return (
      <div>
        <h1>{name}</h1>
        <p>Location: {location}</p>
        <p>Website: {website}</p>
        <p>Donate: {donation_link}</p>
        <p>{description}</p>
      </div>
    )
  }
}

export default OrgTile