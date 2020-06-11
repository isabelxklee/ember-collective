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
        <div className="org-container">
          <p className="results">
            Showing <Pluralize singular={'organization'} count={this.props.orgs.length} />
          </p>
          {orgsArr}
        </div>
      </>
    )
  }
}

export default OrganizationContainer