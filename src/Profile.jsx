import React, {Component} from 'react'
import {connect} from 'react-redux'
import Pluralize from 'react-pluralize'
import DonationChallenge from './DonationChallenge'

class Profile extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/nominations")
    .then(r => r.json())
    .then((nominations) => {
      this.props.setAllNominations(nominations)
    })
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
  }

  usersNominations = () => {
    let nominations = [...this.props.nominations]

    nominations = this.props.nominations.filter((nom) => {
      return nom.user_id === this.props.userInformation.id
    })

    return nominations.length
  }

  render() {
    let currentUser = this.props.userInformation
    let {username, created_at} = currentUser
    console.log(currentUser, this.usersNominations())

    return (
      <div>
        <h1>Your profile</h1>
        <h3>@{username}</h3>
        <p>Joined on {created_at}</p>
        <p>Nominated <Pluralize singular={'organization'} count={this.usersNominations()} /></p>

        {/* <p>Verified {verifications.length} organizations</p>
        <p>Sent {donations.length} donation match challenges</p> */}

        <DonationChallenge
          users={this.props.users}
          orgs={this.props.orgs}
        />
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

let setAllNominations = (nominations) => {
  return {
    type: "SET_ALL_NOMINATIONS",
    payload: nominations
  }
}

let mapDispatchToProps = {
  setAllUsers: setAllUsers,
  setAllNominations: setAllNominations,
  setAllOrganizations: setAllOrganizations
}

let mapStateToProps = (globalState) => {
  return {
    users: globalState.userInformation.users,
    userInformation: globalState.userInformation,
    nominations: globalState.nominationInformation.nominations,
    orgs: globalState.orgInformation.orgs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)