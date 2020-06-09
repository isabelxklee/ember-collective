import React, { Component } from 'react'

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

export default Login