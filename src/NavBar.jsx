import React, { Component } from 'react'
import {NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to="/" exact>Browse the Hub</NavLink>
        <NavLink to="/create-account" exact>Create Account</NavLink>
        <NavLink to="/login" exact>Login</NavLink>
      </div>
    )
  }
}

export default NavBar