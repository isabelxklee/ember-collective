import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Pluralize from 'react-pluralize'
import DonationChallenge from '../donations/DonationChallenge'
 

class Profile extends Component {
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

  renderFirstUser = () => {
    let firstUser = this.props.users[0]
    return firstUser === undefined || firstUser === null ? null : firstUser["id"]
  }

  renderFirstOrg = () => {
    let firstOrg = this.props.orgs[0]
    return firstOrg === undefined ? null : firstOrg["id"]
  }

  accountAge = () => {
    let created_at = this.props.created_at
    let join_date = moment(created_at)
    let now = moment()

    return join_date.from(now)
  }

  nominateToggle = () => {
    let created_at = this.props.created_at
    let join_date = moment(created_at)
    let now = moment()

    return now.diff(join_date, 'days') >= 2 ?
      <button className="submit-button"><Link to={`/nominate`} className="card">Nominate Organization</Link></button>
      :
      null
  }

  render() {
    let username = this.props.username
    
    return (
      <div className="container">
        <div className="user-info">
          <h1 className="profile">Your Profile</h1>
          <h3 className="username">Hello, @{username}! <span role="img" aria-label="star">👋</span></h3>
          <h5><span role="img" aria-label="star">🌟</span> Joined { this.accountAge() }</h5>
          {/* <h5>✅ Verified {verifications.length} organizations</h5> */}
          <h5><span role="img" aria-label="confetti">🎉</span> Nominated <Pluralize singular={'organization'} count={this.usersNominations()} /></h5>
          <h5><span role="img" aria-label="money">💵</span> Sent <Pluralize singular={'challenge'} count={this.usersDonationChallenges()} donation match challenges/></h5>
          
          <div className="btn-group">
            <button className="submit-button"><Link to={`/account-settings`} className="card">Account Settings</Link></button>
            {this.nominateToggle()}
          </div>
        </div>

        <div className="donations">
          <DonationChallenge
            local={ this.props.deploy} deploy={this.props.deploy}
            id={this.props.id}
            firstUserId={this.renderFirstUser()}
            firstOrgId={this.renderFirstOrg()}
            users={this.props.users}
            orgs={this.props.orgs}
            receivers={this.props.receivers}
            senders={this.props.senders}
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
    senders: globalState.userInformation.senders,
    nominations: globalState.nominationInformation.nominations,
    orgs: globalState.orgInformation.orgs,
    donation_challenges: globalState.donationInformation.donation_challenges
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)