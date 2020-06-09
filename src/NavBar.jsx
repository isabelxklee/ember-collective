import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'

class NavBar extends Component {
  handleLogout = () => {
    localStorage.clear()
    this.props.history.push("/")
  }

  render() {
    if (localStorage.token) {
      return <>
        <NavLink to="/" exact>Browse the Hub</NavLink><br/>
        <NavLink to="/nominate" exact>Nominate an Organization</NavLink><br/>
        <NavLink to="/profile" exact>My profile</NavLink><br/>
        <NavLink to='/' onClick={this.handleLogout}>Logout</NavLink>
      </>
    }

    return (
      <div>
        <NavLink to="/" exact>Browse the Hub</NavLink><br/>
        <NavLink to="/create-account" exact>Create Account</NavLink><br/>
        <NavLink to="/login" exact>Login</NavLink><br/>
      </div>
    )
  }
}

export default withRouter(NavBar)