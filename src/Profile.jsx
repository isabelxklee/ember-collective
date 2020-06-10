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
    fetch("http://localhost:3000/donation_challenges")
    .then(r => r.json())
    .then((donations) => {
      this.props.setAllDonations(donations)
    })
  }

  usersNominations = () => {
    let nominations = [...this.props.nominations]

    nominations = this.props.nominations.filter((nom) => {
      return nom.user_id === this.props.userInformation.id
    })

    return nominations.length
  }

  usersDonationChallenges = () => {
    let donations = [...this.props.donation_challenges]

    donations = this.props.donation_challenges.filter((challenge) => {
      return challenge.sender_id === this.props.userInformation.id
    })

    return donations.length
  }

  render() {
    let currentUser = this.props.userInformation
    let {id, username, created_at} = currentUser
    console.log(currentUser, this.usersNominations())

    return (
      <div>
        <h1>Your profile</h1>
        <h3>@{username}</h3>
        <p>Joined on {created_at}</p>
        <p>Nominated <Pluralize singular={'organization'} count={this.usersNominations()} /></p>
        <p>Sent <Pluralize singular={'challenge'} count={this.usersDonationChallenges()} donation match challenges/></p>

        {/* <p>Verified {verifications.length} organizations</p> */}
        <DonationChallenge
          // currentUserId={id}
          currentUser={currentUser}
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

let setAllDonations = (donations) => {
  return {
    type: "SET_ALL_DONATIONS",
    payload: donations
  }
}

let mapDispatchToProps = {
  setAllUsers: setAllUsers,
  setAllNominations: setAllNominations,
  setAllOrganizations: setAllOrganizations,
  setAllDonations: setAllDonations
}

let mapStateToProps = (globalState) => {
  return {
    users: globalState.userInformation.users,
    userInformation: globalState.userInformation,
    nominations: globalState.nominationInformation.nominations,
    orgs: globalState.orgInformation.orgs,
    donation_challenges: globalState.donationInformation.donation_challenges
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)