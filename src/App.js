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
import Resources from './Resources.jsx'
import OrgProfile from './OrgProfile.jsx'

class App extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
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
    .then((response) => {
      this.handleResponse(response)
      this.props.history.push("/profile")
    })
  }

  handleResponse = (response) => {
    localStorage.token = response.token
    this.props.setUserInfo(response)
  }

  renderOrgRoutes = () => {
    let orgs = this.props.orgs
    let allRoutes = []
    allRoutes = orgs.map((org) => {
      return <Route path={`/organizations/${org.id}`} key={org.id}> <OrgProfile key={org.id} org={org}/> </Route>
    })
    return allRoutes
  }

  render () {
    return (
      <div className="app">
        <NavBar handleResponse={this.handleResponse}/>
        <Route exact path="/"> <BrowseTheHub/> </Route>
        <Route path="/nominate"> <Nominate/> </Route>
        <Route path="/resources"> <Resources/> </Route>
        <Route path="/create-account"> <CreateAccount handleResponse={this.handleResponse}/> </Route>
        <Route path="/login"> <Login handleLoginSubmit={this.handleLoginSubmit}/> </Route>
        <Route path="/profile"> <Profile/> </Route>
        {this.renderOrgRoutes()}
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

let setAllOrganizations = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo,
  setAllOrganizations: setAllOrganizations
}

let mapStateToProps = (globalState) => {
  return {
    id: globalState.userInformation.id,
    username: globalState.userInformation.username,
    email_address: globalState.userInformation.email_address,
    created_at: globalState.userInformation.created_at,
    token: globalState.userInformation.token,
    orgs: globalState.orgInformation.orgs,
  }
}

let MagicalComponent = withRouter(App)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)