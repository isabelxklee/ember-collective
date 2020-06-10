import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

class CreateAccount extends Component {
  state = {
    username: "",
    email_address: "",
    password: "",
    password_confirmation: ""
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
      this.props.history.push("/profile")
    })
    console.log("You've successfully created an account!")
  }

  render() {
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

        <label>Password</label>
        <br />
        <input
          name="password"
          type="text"
          autoComplete="off"
          value={this.state.password}
          onChange={this.handleChange} />
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