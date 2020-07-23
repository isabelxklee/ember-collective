import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'
import DonationStats from './DonationStats.jsx'
 

class DonationChallenge extends Component {
  state = {
    sender_id: this.props.id,
    amount: "0",
    org_id: "0",
    receiver_id: "0"
  }

  componentDidMount() {
    fetch(`${ this.props.deploy}/organizations`)
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
  }

  firstReceiverID = () => {
    if (this.state.receiver_id === "0" && this.props.firstUserId !== null) {
      this.setState({
        receiver_id: this.props.firstUserId
      })
    }
  }

  handleChange = (event) => {
    this.firstReceiverID()

    if (this.state.receiver_id === 0) {
      this.setState({
        sender_id: this.props.id,
        org_id: this.props.firstOrgId,
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        sender_id: this.props.id
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch(`${ this.props.deploy}/donation_challenges`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((newDonation) => {
      this.props.propsCreateDonation(newDonation)
      alert(newDonation.message)
      window.location.reload(false)
    })
  }
  
  renderUsers = () => {
    let usersArr = []
    usersArr = this.props.users.filter((user) => {
      return user.id !== this.props.id
    })
    return usersArr
  }

  renderReceivers = () => {
    return this.props.receivers.length > 0 ?
      this.props.receivers.map((challenge) => {
        return <DonationStats key={challenge.id} challenge={challenge} local={ this.props.deploy} deploy={this.props.deploy}/>
      })
      :
      <p>This user hasn't received any donation match challenges yet.</p>
  }

  renderSenders = () => {
    return this.props.senders.length > 0 ?
      this.props.senders.map((challenge) => {
        return <DonationStats key={challenge.id} challenge={challenge} local={ this.props.deploy} deploy={this.props.deploy}/>
      })
      :
      <p>This user hasn't sent any donation match challenges yet.</p>
  }

  render() {
    return (
      <>
        <div className="send-challenge">
        <h2>Donation Match Challenge</h2>
        <p>Challenge your friends to match your donation!</p>

        <form onSubmit={this.handleSubmit} className="donation">

          <label>Donation Amount</label>
          <br />
          <input
            className="account"
            name="amount"
            type="text"
            autoComplete="off"
            value={this.state.amount}
            onChange={this.handleChange} />
          <br />

          <label>Pick an Org</label><br />
          <select value={this.state.org_id} onChange={this.handleChange} name="org_id">
            { this.props.orgs.map((org) =>
              <option key={org.id} value={org.id}>{org.name}</option>)
            }
          </select>
          <br />

          <label>Friend's Username</label><br />
          <select value={this.state.receiver_id} onChange={this.handleChange} name="receiver_id">
            { this.renderUsers().map((user) =>
              <option key={user.id} value={user.id}>{user.username}</option>)
            }
          </select><br />

          <button type="submit" className="submit-button">Send Challenge</button>
        </form>
        </div>

        <div className="received-challenges">
          <h2>Received challenges</h2>
          { this.renderReceivers() }
        </div>

        <div className="received-challenges">
          <h2>Sent challenges</h2>
          { this.renderSenders() }
        </div>
      </>
    )
  }
}

let setAllOrganizations = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let createDonation = (donation_challenge) => {
  return {
    type: "CREATE_DONATION",
    payload: donation_challenge
  }
}

let mapDispatchToProps = {
  propsCreateDonation: createDonation,
  setAllOrganizations: setAllOrganizations,
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgInformation.orgs,
  }
}

let MagicalComponent = withRouter(DonationChallenge)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)