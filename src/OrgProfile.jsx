import React, { Component } from 'react'

class OrgProfile extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.org.name}</h1>
      </div>
    )
  }
}

export default OrgProfile