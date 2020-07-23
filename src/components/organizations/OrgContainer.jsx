import React, { Component } from 'react'
import CardOrg from './CardOrg.jsx'

class OrgContainer extends Component {
 render() {
    let orgsArr = this.props.orgs.map((org) => {
      return <CardOrg key={org.id} org={org} handleCategory={this.props.handleCategory} local={ this.props.deploy} deploy={this.props.deploy}/>
    })

    return (
      <>
        <div className="org-container">
          {orgsArr}
        </div>
      </>
    )
  }
}

export default OrgContainer