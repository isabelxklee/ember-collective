import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'

class Settings extends Component {
  state = {
    username: this.props.user.username,
    email_address: this.props.user.email_address,
    password: this.props.user.password,
    password_confirmation: "",

    errors: {
      username: "",
      email_address: "",
      password: "",
      password_confirmation: ""
    }
  }

  email_regex = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i
  username_regex = /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/i

  handleChange = (event) => {
    let errors = this.state.errors

    switch (event.target.name) {
      case 'username': 
        errors.username = 
        this.username_regex.test(event.target.value)
            ? ''
            : 'Username must be a valid format. It can contain underscores and alphanumeric characters.'
        break

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
        <label>Username</label>
        <br />
        <input
          name="username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange} />
        <br />
        {errors.username.length > 0 && 
          <p className='error'>{errors.username}</p>
        }
        <br />
        
        <label>Email Address</label><br />
        <input
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

        { errors.username.length > 0 || errors.email_address.length > 0 || errors.password.length > 0 || errors.password_confirmation.length > 0 ?
          <button type="submit" className="submit-button" id="invalid" disabled>Save changes</button>
          :
          <button type="submit" className="submit-button">Save changes</button>
        }
        
      </form>
      
      </div>
    )
  }
}

export default Settings