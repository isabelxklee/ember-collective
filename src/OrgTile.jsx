import React, { Component } from 'react'

class OrgTile extends Component {
  render() {
    let {name, website, location, description, donation_link} = this.props.org
    return (
      <div>
        <h1>{name}</h1>
        <p>Location: {location}</p>
        <p><a href={website} target="blank">Website</a></p>
        <p><a href={donation_link} target="blank">Donate</a></p>
        <p>{description}</p>
      </div>
    )
  }
}

export default OrgTile