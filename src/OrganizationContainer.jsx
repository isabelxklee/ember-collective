import React, { Component } from 'react'
// import {Route, Link, Switch} from 'react-router-dom'
import OrgTile from './OrgTile.jsx'

class OrganizationContainer extends Component {
 render() {
    let orgsArr = this.props.orgs.map((org) => {
      return <OrgTile key={org.id} org={org}/>
    })

    return (
      <>
        <p>Showing {this.props.orgs.length} organizations</p>
        <div className="org-container">
          {orgsArr}
        </div>
      </>
    )
  }
}

export default OrganizationContainer