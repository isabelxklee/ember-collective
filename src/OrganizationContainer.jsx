import React, { Component } from 'react'
import {connect} from 'react-redux'
import OrgTile from './OrgTile.jsx'

class OrganizationContainer extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrgs(orgs)
    })
  }

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

let setAllOrgs = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgInformation.orgs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationContainer)