import React, { Component } from 'react'

class DonationStats extends Component {
  render() {
    let {sender_id, receiver_id, amount, org_id } = this.props.challenge
    return (
      <div>
        <p>${amount}</p>
        <p>Organization: {org_id.name}</p>
        <p>Sender: @{sender_id.username}</p>
      </div>
    )
  }
}

export default DonationStats