import React, { Component } from 'react'
import {connect} from 'react-redux'
import OrgTile from './OrgTile.jsx'

class OrganizationContainer extends Component {
 render() {
    let orgsArr = this.props.orgs.map((org) => {
      return <OrgTile key={org.id} org={org}/>
    })

    return (
      <div>
        <p>Showing {this.props.orgs.length} organizations</p>
        {orgsArr}
      </div>
    )
  }
}

export default OrganizationContainer