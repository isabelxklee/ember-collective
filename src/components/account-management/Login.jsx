import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
 

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      username: "",
      password: ""
    }
  }

  handleChange = (event) => {
    let errors = this.state.errors

    switch (event.target.name) {
      case 'username': 
        errors.username = 
        event.target.value.length < 1
            ? "Username can't be empty."
            : ""
        break

      case 'password': 
        errors.password = 
          event.target.value.length < 1
            ? "Password can't be empty."
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

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      username: "",
      password: ""
    })
    fetch(`${ this.props.deploy}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((userInfo) => {
      this.handleResponse(userInfo)
    })
  }

  handleResponse = (response) => {
    if (response.user) {
      localStorage.token = response.token
      this.props.setUserInfo(response)
      this.props.history.push(`/profile`)  
    } else {
      alert(response.message)
    }
  }

  render() {
    let {errors} = this.state

    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <br />
          <input
            className="account"
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

        { errors.username.length > 0 || errors.password.length > 0 ?
          <button type="submit" className="submit-button" id="invalid" disabled>Login</button>
          :
          <button type="submit" className="submit-button">Login</button>
        }
      </form>
      </div>
    )
  }
}

let setUserInfo = (response) => {
  return {
    type: "SET_USER_INFO",
    payload: response
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo
}

let MagicalComponent = withRouter(Login)

export default connect(null, mapDispatchToProps)(MagicalComponent)