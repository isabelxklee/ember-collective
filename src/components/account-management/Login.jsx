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
    this.props.handleLoginSubmit(this.state)
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
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
        
        <label>Password</label>
        <br />
          <input
            name="password"
            type="password"
            autoComplete="off"
            value={this.state.password}
            onChange={this.handleChange} />
        <br />
        
        <button type="submit" className="submit-button">Login</button>
      </form>
      </div>
    )
  }
}

export default Login