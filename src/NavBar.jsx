import React, { Component } from 'react'
import {NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to="/" exact>Browse the Hub</NavLink><br/>
        <NavLink to="/nominate" exact>Nominate an Organization</NavLink><br/>
        <NavLink to="/create-account" exact>Create Account</NavLink><br/>
        <NavLink to="/login" exact>Login</NavLink><br/>
      </div>
    )
  }
}

export default NavBar