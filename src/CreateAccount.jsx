import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

class CreateAccount extends Component {
  state = {
    username: "",
    email_address: "",
    password: "",
    password_confirmation: "",
    errors: {
      password: "",
      password_confirmation: "",
      email_address: ""
    }
  }

  validEmailRegex = RegExp(/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i)

  handleChange = (event) => {
    let errors = this.state.errors

    switch (event.target.name) {
      case 'email_address': 
        errors.email_address = 
        this.validEmailRegex.test(event.target.value)
            ? 'Email address must be a valid format.'
            : ''
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
    console.log(event.target.value)
  }

  validateForm = (errors) => {
    let valid = true
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    )
    return valid
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      username: "",
      email_address: "",
      password: "",
      password_confirmation: ""
    })

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((response) => {
      this.props.handleResponse(response)
    })
    console.log("You've successfully created an account!")
  }

  render() {
    let {errors} = this.state
    return (
      <div className="container">
        <h1>Create an account</h1>
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
          type="text"
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
            type="text"
            autoComplete="off"
            value={this.state.password_confirmation}
            onChange={this.handleChange} />
        <br />
        {errors.password_confirmation.length > 0 && 
          <p className='error'>{errors.password_confirmation}</p>
        }
        <br />

        <button type="submit" className="submit-button">Create account</button>
      </form>
      </div>
    )
  }
}

let createUser = (user) => {
  return {
    type: "CREATE_USER",
    payload: user
  }
}

let mapDispatchToProps = {
  propsCreateUser: createUser
}

let MagicalComponent = withRouter(CreateAccount)

export default connect(null, mapDispatchToProps)(MagicalComponent)