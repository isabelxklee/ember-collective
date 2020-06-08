import React, { Component } from 'react'
import {connect} from 'react-redux'

class Login extends Component {
  state = {
    username: "",
    password: "",
    token: ""
  }

  // this is making sure that the user is logged in
  // refactor this to take redux into account
  // throw the token in global state
  // componentDidMount() {
  //   if (localStorage.token) {
  //     fetch("http://localhost:3000/users/stay_logged_in", {
  //       headers: {
  //         "Authorization": localStorage.token
  //       }
  //     })
  //     .then(r => r.json())
  //     .then(this.handleResponse)
  //   }
  // }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  handleResponse = (r) => {
    if (r.message) {
      alert(r.message)
    } else {
      localStorage.token = r.token
      // this.props.history.push("/profile")
    }
  }

  // renderProfile = (routerProps) => {
  //   if (this.state.token) {
  //     return <ProfileContainer user={this.state.user} token={this.state.token} addNewSnack={this.addNewSnack}/>
  //   } else {
  //     this.props.history.push("/login")
  //   }
  // }

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