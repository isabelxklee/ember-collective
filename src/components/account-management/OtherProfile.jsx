import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Pluralize from 'react-pluralize'
import DonationStats from '../donations/DonationStats'
 

class OtherProfile extends Component {
  componentDidMount() {
    fetch(`${ this.props.deploy}/nominations`)
    .then(r => r.json())
    .then((nominations) => {
      this.props.setAllNominations(nominations)
    })
    fetch(`${ this.props.deploy}/users`)
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
    fetch(`${ this.props.deploy}/organizations`)
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
    fetch(`${ this.props.deploy}/donation_challenges`)
    .then(r => r.json())
    .then((donations) => {
      this.props.setAllDonations(donations)
    })
  }

  accountAge = () => {
    let created_at = this.props.user.created_at
    let join_date = moment(created_at)
    let now = moment()

    return join_date.from(now)
  }

  usersNominations = () => {
    let nominations = [...this.props.nominations]

    nominations = this.props.nominations.filter((nom) => {
      return nom.user_id === this.props.user.id
    })

    return nominations.length
  }

  usersDonationChallenges = () => {
    let donations = [...this.props.donation_challenges]

    donations = this.props.donation_challenges.filter((challenge) => {
      return challenge.sender_id === this.props.user.id
    })

    return donations.length
  }

  renderReceivers = () => {
    return this.props.user.receivers.length > 0 ?
      this.props.user.receivers.map((challenge) => {
        return <DonationStats key={challenge.id} challenge={challenge} local={ this.props.deploy} deploy={this.props.deploy}/>
      })
      :
      <p>This user hasn't received any donation match challenges yet.</p>
  }

  renderSenders = () => {
    return this.props.user.senders.length > 0 ?
      this.props.user.senders.map((challenge) => {
        return <DonationStats key={challenge.id} challenge={challenge} local={ this.props.deploy} deploy={this.props.deploy}/>
      })
      :
      <p>This user hasn't sent any donation match challenges yet.</p>
  }

  render() {
    let {username} = this.props.user

    return (
      <div className="container">
        <div className="other-user-info">
          <h1 className="profile">Profile</h1>
          <h3 className="username">Visiting @{username}! <span role="img" aria-label="star">👋</span></h3>
          <h5><span role="img" aria-label="star">🌟</span> Joined { this.accountAge() }</h5>
          <h5><span role="img" aria-label="confetti">🎉</span> Nominated <Pluralize singular={'organization'} count={this.usersNominations()} /></h5>
          <h5><span role="img" aria-label="money">💵</span> Sent <Pluralize singular={'challenge'} count={this.usersDonationChallenges()} donation match challenges/></h5>
        </div>

        <div className="donations">
          <div className="received-challenges">
            <h2>Received challenges</h2>
            { this.renderReceivers() }
          </div>

          <div className="received-challenges">
            <h2>Sent challenges</h2>
            { this.renderSenders() }
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile)