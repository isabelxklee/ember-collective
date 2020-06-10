import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'

class NavBar extends Component {
  handleLogout = () => {
    localStorage.clear()
    this.props.history.push("/")
  }

  render() {
    if (localStorage.token) {
      return <div className="header">
        <NavLink to="/" exact className="header-link">Browse the Hub</NavLink><br/>
        <NavLink to="/nominate" exact className="header-link">Nominate an Organization</NavLink><br/>
        <NavLink to="/profile" exact className="header-link">My profile</NavLink><br/>
        <NavLink to='/' onClick={this.handleLogout} className="header-link">Logout</NavLink>
      </div>
    }

    return (
      <div className="header">
        <NavLink to="/" exact className="header-link">Browse the Hub</NavLink><br/>
        <NavLink to="/create-account" exact className="header-link">Create Account</NavLink><br/>
        <NavLink to="/login" exact className="header-link">Login</NavLink><br/>
      </div>
    )
  }
}

export default withRouter(NavBar)