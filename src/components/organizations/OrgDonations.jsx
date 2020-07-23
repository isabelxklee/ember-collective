import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
 

class OrgDonations extends Component {
  componentDidMount() {
    fetch(`${ this.props.deploy}/users`)
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
  }

  renderSender = () => {
    let sender = ""
    this.props.users.filter((user) => {
      return user.id === this.props.challenge.sender_id ? sender = user.username : null
    })
    return sender
  }

  renderReceiver = () => {
    let receiver = ""
    this.props.users.filter((user) => {
      return user.id === this.props.challenge.receiver_id ? receiver = user.username : null
    })
    return receiver
  }

  senderSlug = () => {
    return `/users/${this.renderSender()}`
  }

  receiverSlug = () => {
    return `/users/${this.renderReceiver()}`
  }

  render() {
    let {amount} = this.props.challenge
    return (
      <div>
        <p className="donation-stat">
          <Link to={this.senderSlug()} id="username">@{this.renderSender()}</Link> challenged <Link to={this.receiverSlug()} id="username">@{this.renderReceiver()}</Link> to donate ${amount}
        </p>
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

let mapDispatchToProps = {
  setAllUsers: setAllUsers
}

let mapStateToProps = (globalState) => {
  return {
    users: globalState.userInformation.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrgDonations)