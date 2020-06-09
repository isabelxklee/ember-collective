import React, { Component } from 'react'
import {connect} from 'react-redux'

class DonationChallenge extends Component {
  state = {
    sender_id: this.props.currentUserId,
    amount: "",
    org_id: "",
    receiver_id: ""
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      amount: "",
      org_id: "",
      receiver_id: ""
    })

    fetch("http://localhost:3000/donation_challenges", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((newDonation) => {
      this.props.propsCreateDonation(newDonation)
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <h2>Donation Match Challenge</h2>
        <p>Challenge your friends to match your donation!</p>

        <form onSubmit={this.handleSubmit}>
          <label>
            Donation Amount
            <input
              name="amount"
              type="text"
              autoComplete="off"
              value={this.state.amount}
              onChange={this.handleChange} />
          </label>
          <br />

          <label>Pick an Org_id</label>

          <select value={this.state.org_id} onChange={this.handleChange} name="org_id">
            { this.props.orgs.map((org) =>
              <option key={org.id} value={org.name}>{org.name}</option>)
            }
          </select>
          <br />

          <label>Friend's Username</label>

          <select value={this.state.receiver_id} onChange={this.handleChange} name="receiver_id">
            { this.props.users.map((user) =>
              <option key={user.id} value={user.username}>{user.username}</option>)
            }
          </select><br />

          <input type="submit" value="Send" />
        </form>
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