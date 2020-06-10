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
      return nom.user_id === this.props.id
    })

    return nominations.length
  }

  usersDonationChallenges = () => {
    let donations = [...this.props.donation_challenges]

    donations = this.props.donation_challenges.filter((challenge) => {
      return challenge.sender_id === this.props.id
    })

    return donations.length
  }

  render() {
    let username = this.props.username
    let created_at = this.props.created_at

    return (
      <div className="profile">
        
        <div className="user-info">
          <h1 className="profile">Your profile</h1><br/>
          <h3 className="username">@{username}</h3>
          <h5><span role="img" aria-label="star">🌟</span> Joined on {created_at}</h5>
          {/* <h5>✅ Verified {verifications.length} organizations</h5> */}
          <h5><span role="img" aria-label="confetti">🎉</span> Nominated <Pluralize singular={'organization'} count={this.usersNominations()} /></h5>
          <h5><span role="img" aria-label="money">💵</span> Sent <Pluralize singular={'challenge'} count={this.usersDonationChallenges()} donation match challenges/></h5>
        </div>

        <div className="donations">
          <DonationChallenge
            id={this.props.id}
            users={this.props.users}
            orgs={this.props.orgs}
            receivers={this.props.receivers}
          />
        </div>
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
    id: globalState.userInformation.id,
    username: globalState.userInformation.username,
    created_at: globalState.userInformation.created_at,
    receivers: globalState.userInformation.receivers,
    nominations: globalState.nominationInformation.nominations,
    orgs: globalState.orgInformation.orgs,
    donation_challenges: globalState.donationInformation.donation_challenges
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)