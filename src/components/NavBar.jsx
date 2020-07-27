import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class NavBar extends Component {
  handleLogout = () => {
    localStorage.clear()
    this.props.history.push("/")
  }

  render() {
    if (localStorage.token) {
      return <div className="header">
        <NavLink to="/" exact className="header-link">Home</NavLink><br/>
        <NavLink to="/police-brutality-tracker" exact className="header-link">Police Brutality Tracker</NavLink><br/>
        <NavLink to="/memorial" exact className="header-link">Memorial</NavLink><br/>
        <NavLink to="/resources" exact className="header-link">Resources</NavLink><br/>
        <NavLink to={`/profile`} exact className="header-link">Profile</NavLink><br/>
        <NavLink to='/' onClick={this.handleLogout} className="header-link">Logout</NavLink>
      </div>
    }

    return (
      <div className="header">
        <NavLink to="/" exact className="header-link">Home</NavLink><br/>
        <NavLink to="/police-brutality-tracker" exact className="header-link">Police Brutality Tracker</NavLink><br/>
        <NavLink to="/memorial" exact className="header-link">Memorial</NavLink><br/>
        <NavLink to="/resources" exact className="header-link">Resources</NavLink><br/>
        <NavLink to="/create-account" exact className="header-link">Create Account</NavLink><br/>
        <NavLink to="/login" exact className="header-link">Login</NavLink><br/>
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

let mapStateToProps = (globalState) => {
  return {
    id: globalState.userInformation.id,
    username: globalState.userInformation.username
  }
}

let MagicalComponent = withRouter(NavBar)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)