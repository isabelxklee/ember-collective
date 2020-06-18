import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class DonationStats extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
  }

  renderOrgName = () => {
    let orgName = ""
    this.props.orgs.filter((org) => {
      return org.id === this.props.challenge.org_id ? orgName = org.name : null
    })
    return orgName
  }

  renderOrgID = () => {
    let orgID = 0
    this.props.orgs.filter((org) => {
      return org.id === this.props.challenge.org_id ? orgID = org.id : null
    })
    return orgID
  }

  renderSender = () => {
    let senderName = ""
    this.props.users.filter((user) => {
      return user.id === this.props.challenge.sender_id ? senderName = user.username : null
    })
    return senderName
  }

  render() {
    return (
      <>
        <h4>From @{this.renderSender()}</h4>
        <p>Donate ${this.props.challenge.amount} to <Link to={`/organizations/${this.renderOrgID()}`} className="welcome"> {this.renderOrgName()}</Link></p>
      </>
    )
  }
}

let setAllUsers = (users) => {
  return {
    type: "SET_ALL_USERS",
    payload: users
  }
}

let setAllOrganizations = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let mapDispatchToProps = {
  setAllUsers: setAllUsers,
  setAllOrganizations: setAllOrganizations
}

let mapStateToProps = (globalState) => {
  return {
    users: globalState.userInformation.users,
    orgs: globalState.orgInformation.orgs,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationStats)