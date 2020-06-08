import React, {Component} from 'react'
import {connect} from 'react-redux'

class Profile extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
  }
  render() {
    let currentUser = this.props.users.find(id => id = 1)
    console.log(currentUser)
    return (
      <div>
        <h1>Your profile</h1>
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
    users: globalState.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)