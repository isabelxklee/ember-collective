import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
 

class DonationStats extends Component {
  componentDidMount() {
    fetch(`${ this.props.deploy}/organizations`)
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
    fetch(`${ this.props.deploy}/users`)
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

  renderReceiver = () => {
    let receiverName = ""
    this.props.users.filter((user) => {
      return user.id === this.props.challenge.receiver_id ? receiverName = user.username : null
    })
    return receiverName
  }

  senderLoggedInStatus = () => {
    let loggedInUser = ""
    this.renderSender() === this.props.username ? loggedInUser = "you" : loggedInUser = this.renderSender()
    return loggedInUser
  }

  senderSlug = () => {
    return this.senderLoggedInStatus() === "you" ? '/profile' : `/users/${this.renderSender()}`
  }

  receiverLoggedInStatus = () => {
    let loggedInUser = ""
    this.renderReceiver() === this.props.username ? loggedInUser = "you" : loggedInUser = this.renderReceiver()
    return loggedInUser
  }

  receiverSlug = () => {
    return this.receiverLoggedInStatus() === "you" ? '/profile' : `/users/${this.renderReceiver()}`
  }

  render() {
    return (
      <div className="donation-stat">
        <p className="donation-stat">
          From <Link to={this.senderSlug()} id="username">@{this.senderLoggedInStatus()}</Link> To <Link to={this.receiverSlug()} id="username">@{this.receiverLoggedInStatus()}</Link> 
        </p> 
        <p className="donation-stat">Donate ${this.props.challenge.amount} to <Link to={`/organizations/${this.renderOrgID()}`} id="username"> {this.renderOrgName()}</Link></p>
      </div>
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
    id: globalState.userInformation.id,
    username: globalState.userInformation.username,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationStats)