import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'
 

class Settings extends Component {
  state = {
    email_address: this.props.email_address,
    password: "",
    password_confirmation: "",

    errors: {
      email_address: "",
      password: "",
      password_confirmation: ""
    }
  }

  email_regex = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i

  componentDidMount() {
    fetch(`${ this.props.deploy}/donation_challenges`)
    .then(r => r.json())
    .then((donations) => {
      this.props.setAllDonations(donations)
    })
    fetch(`${ this.props.deploy}/users`)
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
  }

  handleChange = (event) => {
    let errors = this.state.errors

    switch (event.target.name) {
      case 'email_address': 
        errors.email_address = 
        this.email_regex.test(event.target.value)
            ? ''
            : 'Email address must be a valid format.'
        break

      case 'password': 
        errors.password = 
          event.target.value.length < 6
            ? 'Password must be at least 6 characters long.'
            : ''
        break

      case 'password_confirmation': 
      errors.password_confirmation = 
        event.target.value !== this.state.password
          ? 'Password confirmation must match the password.'
          : ''
      break
      
      default:
        break
    }

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    
    fetch(`${ this.props.deploy}/users/${this.props.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(() => {
      alert("Your account settings have been updated!")
      this.props.history.push(`/profile`)
    })
  }

  handleDelete = () => {
    fetch(`${ this.props.deploy}/users/${this.props.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      alert("Your account has been deleted.")
      this.deleteDonations()
      localStorage.clear()
      this.props.history.push(`/`)
    })
  }

  deleteDonations = () => {
    let sentDonations = this.sentDonations()
    let receivedDonations = this.receivedDonations()

    sentDonations.forEach((donation) => {
      fetch(`${ this.props.deploy}/donation_challenges/${donation.id}`, {
        method: "DELETE"
      })
      .then(r => r.json())
      .then(console.log)
    })

    receivedDonations.forEach((donation) => {
      fetch(`${ this.props.deploy}/donation_challenges/${donation.id}`, {
        method: "DELETE"
      })
      .then(r => r.json())
      .then(console.log)
    })
  }

  sentDonations = () => {
    let userID = this.props.id
    let sentDonations = this.props.donation_challenges.filter((donation) => {
      return userID === donation.sender_id
    })
    return sentDonations
  }

  receivedDonations = () => {
    let userID = this.props.id
    let receivedDonations = this.props.donation_challenges.filter((donation) => {
      return userID === donation.receiver_id
    })
    return receivedDonations
  }

  validateForm = (errors) => {
    let valid = true
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    )
    return valid
  }

  render() {
    let {errors} = this.state

    return (
      <div className="container">
        <h1>Account Settings</h1>
        
        <form onSubmit={this.handleSubmit}>
        
        <label>Email Address</label><br />
        <input
        className="account"
          name="email_address"
          type="text"
          autoComplete="off"
          value={this.state.email_address}
          onChange={this.handleChange} />
        <br />
        {errors.email_address.length > 0 && 
          <p className='error'>{errors.email_address}</p>
        }
        <br />

        <label>Password</label>
        <br />
        <input
        className="account"
          name="password"
          type="password"
          autoComplete="off"
          value={this.state.password}
          onChange={this.handleChange} />
        <br />
        {errors.password.length > 0 && 
          <p className='error'>{errors.password}</p>
        }
        <br />

        <label>Confirm Password</label>
        <br />
          <input
          className="account"
            name="password_confirmation"
            type="password"
            autoComplete="off"
            value={this.state.password_confirmation}
            onChange={this.handleChange} />
        <br />
        {errors.password_confirmation.length > 0 && 
          <p className='error'>{errors.password_confirmation}</p>
        }
        <br />

        { errors.email_address.length > 0 || errors.password.length > 0 || errors.password_confirmation.length > 0 ?
          <button type="submit" className="submit-button" id="invalid" disabled>Save changes</button>
          :
          <button type="submit" className="submit-button">Save changes</button>
        }
        
      </form>
      
      <div className="donations">
        <h2>Danger Zone!</h2>
        <p>If you'd like to delete your account, click on the button below. This action is permanent and will also remove your donation match challenges.</p>
        <button className="danger" onClick={this.handleDelete}>Delete account</button>
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

let setAllDonations = (donations) => {
  return {
    type: "SET_ALL_DONATIONS",
    payload: donations
  }
}

let updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user
  }
}

let mapDispatchToProps = {
  updateUser: updateUser,
  setAllDonations: setAllDonations,
  setAllUsers: setAllUsers
}

let mapStateToProps = (globalState) => {
  return {
    users: globalState.userInformation.users,
    donation_challenges: globalState.donationInformation.donation_challenges,
  }
}

let MagicalComponent = withRouter(Settings)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)