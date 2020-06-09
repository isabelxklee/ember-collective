import React, { Component } from 'react'
import {NavLink } from 'react-router-dom'

class NavBar extends Component {
  state = {
    loggedIn: false
  }
  
  render() {
    if (this.state.loggedIn === false) {
      return <>
      <NavLink to="/" exact>Browse the Hub</NavLink><br/>
      <NavLink to="/create-account" exact>Create Account</NavLink><br/>
      <NavLink to="/login" exact>Login</NavLink><br/>
      </>
    }

    return (
      <div>
        <NavLink to="/" exact>Browse the Hub</NavLink><br/>
        <NavLink to="/nominate" exact>Nominate an Organization</NavLink><br/>
        <NavLink to="/profile" exact>My profile</NavLink><br/>
        <NavLink to="/logout" exact>Logout</NavLink>
      </div>
    )
  }
}

export default NavBar