import React from 'react'
import {connect} from 'react-redux'
import OrgTile from './OrgTile.jsx'

const OrganizationContainer = (props) => {
  let arr = props.orgs.map((org) => {
    return <OrgTile key={org.id} org={org}/>
  })

  return (
    <div>
      {arr}
    </div>
  )
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgs
  }
}

export default connect(mapStateToProps)(OrganizationContainer)