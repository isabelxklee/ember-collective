import React, { Component } from 'react'
import OrgTile from './OrgTile.jsx'
import Pluralize from 'react-pluralize'

class OrganizationContainer extends Component {
 render() {
    let orgsArr = this.props.orgs.map((org) => {
      return <OrgTile key={org.id} org={org}/>
    })

    return (
      <>
        <h4 className="results">Showing <Pluralize singular={'organization'} count={this.props.orgs.length} /></h4>
        <div className="org-container">
          {orgsArr}
        </div>
      </>
    )
  }
}

export default OrganizationContainer