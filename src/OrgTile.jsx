import React, { Component } from 'react'

class OrgTile extends Component {
  render() {
    let {name, website} = this.props.org
    return (
      <div>
        <h1>{name}</h1>
        <p>{website}</p>
      </div>
    )
  }
}

export default OrgTile