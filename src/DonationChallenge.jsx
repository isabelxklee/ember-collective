import React, { Component } from 'react'
import {connect} from 'react-redux'
import DonationStats from './DonationStats.jsx'

class DonationChallenge extends Component {
  state = {
    sender_id: this.props.id,
    amount: 0,
    org_id: 0,
    receiver_id: 0
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      sender_id: this.props.id,
      amount: 0,
      org_id: 0,
      receiver_id: 0
    })

    let {amount, org_id, receiver_id} = this.state

    fetch("http://localhost:3000/donation_challenges", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        sender_id: this.props.id,
        amount: amount,
        org_id: org_id,
        receiver_id: receiver_id
      })
    })
    .then(r => r.json())
    .then((newDonation) => {
      this.props.propsCreateDonation(newDonation)
    })
  }

  render() {
    return (
      <div>
        <h2 className="donations">Donation Match Challenge</h2>
        <p className="donations">Challenge your friends to match your donation!</p>

        <form onSubmit={this.handleSubmit}>

          <label>Donation Amount</label>
          <br />
          <input
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
            { this.props.users.map((user) =>
              <option key={user.id} value={user.id}>{user.username}</option>)
            }
          </select><br />

          <button type="submit" className="submit-button">Send Challenge</button>
        </form>

        <h2 className="donations">Received challenges</h2>
          {this.props.receivers.map((challenge) => {
            return <DonationStats key={challenge.id} challenge={challenge}/>
          })}
      </div>
    )
  }
}

let createDonation = (donation_challenge) => {
  return {
    type: "CREATE_DONATION",
    payload: donation_challenge
  }
}

let mapDispatchToProps = {
  propsCreateDonation: createDonation
}

export default connect(null, mapDispatchToProps)(DonationChallenge)