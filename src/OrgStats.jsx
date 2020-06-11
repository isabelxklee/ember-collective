import React, { Component } from 'react'
import {connect} from 'react-redux'

class OrgStats extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/users")
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

  render() {
    let {amount} = this.props.challenge
    return (
      <div>
        <p>@{this.renderSender()} challenged @{this.renderReceiver()} to donate ${amount}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrgStats)