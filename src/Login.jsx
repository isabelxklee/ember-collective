import React, { Component } from 'react'
import {connect} from 'react-redux'

class Login extends Component {
  state = {
    username: "",
    password: ""
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
      password: ""
    })
    this.props.propsLogin(this.state)
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLoginSubmit}>
        <label>
          Username
          <input
            name="username"
            type="text"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Password
          <input
            name="password"
            type="text"
            autoComplete="off"
            value={this.state.password}
            onChange={this.handleChange} />
        </label><br />
        <input type="submit" value="Create" />
      </form>
      </div>
    )
  }
}

let login = (user) => {
  return {
    type: "LOGIN",
    payload: user
  }
}

let mapDispatchToProps = {
  propsLogin: login
}

export default connect(null, mapDispatchToProps)(Login)