import React, { Component } from 'react'

export default class DonationChallenge extends Component {
  state = {
    donation_amount: "",
    organization: "",
    friends_username: ""
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

        <form>
          <label>
            Donation Amount
            <input
              name="donation_amount"
              type="text"
              autoComplete="off"
              value={this.state.donation_amount}
              onChange={this.handleChange} />
          </label>
          <br />

          <label>Pick an Organization</label>

          <select value={this.state.organization} onChange={this.handleChange} name="organization">
            { this.props.orgs.map((org) =>
              <option key={org.id} value={org.name}>{org.name}</option>)
            }
          </select>
          <br />

          <label>Friend's Username</label>

          <select value={this.state.friends_username} onChange={this.handleChange} name="friends_username">
            { this.props.users.map((user) =>
              <option key={user.id} value={user.username}>{user.username}</option>)
            }
          </select>

          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}
