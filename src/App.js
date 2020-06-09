import React, {Component} from 'react'
import {Route, withRouter } from 'react-router-dom'
import './App.css'
import {connect} from 'react-redux'
import BrowseTheHub from './BrowseTheHub.jsx'
import NavBar from './NavBar.jsx'
import CreateAccount from './CreateAccount.jsx'
import Login from './Login.jsx'
import Nominate from './Nominate.jsx'
import Profile from './Profile.jsx'

class App extends Component {

  componentDidMount() {
    if (localStorage.token) {
      console.log("there's a token")
      fetch("http://localhost:3000/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)
    }
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  handleResponse = (response) => {
    localStorage.token = response.jwt
    this.props.setUserInfo(response)
    console.log(response)
    this.props.history.push("/profile")
  }

  render () {
    return (
      <div>
        <NavBar handleResponse={this.handleResponse}/>
        <Route exact path="/"> <BrowseTheHub/> </Route>
        <Route path="/nominate"> <Nominate/> </Route>
        <Route path="/create-account"> <CreateAccount handleResponse={this.handleResponse}/> </Route>
        <Route path="/login"> <Login handleLoginSubmit={this.handleLoginSubmit}/> </Route>
        <Route path="/profile"> <Profile/> </Route>
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
    username: globalState.userInformation.username,
    email_address: globalState.userInformation.email_address,
    created_at: globalState.userInformation.created_at,
    token: globalState.userInformation.token
  }
}

let MagicalComponent = withRouter(App)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)