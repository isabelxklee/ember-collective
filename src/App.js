import React, {Component} from 'react'
import {Route, withRouter } from 'react-router-dom'
import './App.css'
import {connect} from 'react-redux'
import Home from './Home.jsx'
import NavBar from './NavBar.jsx'
import CreateAccount from './CreateAccount.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import Resources from './ResourceContainer.jsx'
import OrgProfile from './OrgProfile.jsx'
import PoliceBrutalityTracker from './PoliceBrutalityTracker.jsx'
import About from './About.jsx'
import Footer from './Footer.jsx'
import Verify from './Verify.jsx'

class App extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
    if (localStorage.token) {
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
    })
  }

  handleResponse = (response) => {
    if (response.user) {
      localStorage.token = response.token
      this.props.setUserInfo(response)  
      this.props.history.push("/profile") 
    } else {
      alert(response.message)
    }
  }

  renderOrgRoutes = () => {
    let orgs = this.props.orgs
    let allRoutes = []
    allRoutes = orgs.map((org) => {
      return <Route exact path={`/organizations/${org.id}`} key={org.id}> <OrgProfile key={org.id} org={org}/> </Route>
    })
    return allRoutes
  }

  renderOrgEditRoutes = () => {
    let orgs = this.props.orgs
    let allEditRoutes = []
    allEditRoutes = orgs.map((org) => {
      return <Route exact path={`/organizations/${org.id}/edit`} key={org.id}> <Verify key={org.id} org={org}/> </Route>
    })
    return allEditRoutes
  }

  renderUserRoutes = () => {
    let users = this.props.users
    let allUsers = []
    allUsers = users.map((user) => {
      return <Route path={`/users/${user.id}`} key={user.id}> <Profile key={user.id} user={user}/> </Route>
    })
    return allUsers
  }

  render () {
    return (
      <div className="app">
        <NavBar handleResponse={this.handleResponse}/>
        <Route exact path="/"> <Home/> </Route>
        <Route exact path="/police-brutality-tracker"> <PoliceBrutalityTracker/> </Route>
        <Route path="/resources"> <Resources/> </Route>
        <Route path="/create-account"> <CreateAccount handleResponse={this.handleResponse}/> </Route>
        <Route path="/login"> <Login handleLoginSubmit={this.handleLoginSubmit}/> </Route>
        <Route path="/profile"> <Profile/> </Route>
        <Route path="/about"> <About/> </Route>
        {this.renderOrgRoutes()}
        {this.renderUserRoutes()}
        {this.renderOrgEditRoutes()}
        <Footer/>
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

let setAllUsers = (users) => {
  return {
    type: "SET_ALL_USERS",
    payload: users
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo,
  setAllOrganizations: setAllOrganizations,
  setAllUsers: setAllUsers
}

let mapStateToProps = (globalState) => {
  return {
    id: globalState.userInformation.id,
    username: globalState.userInformation.username,
    email_address: globalState.userInformation.email_address,
    created_at: globalState.userInformation.created_at,
    token: globalState.userInformation.token,
    orgs: globalState.orgInformation.orgs,
    users: globalState.userInformation.users
  }
}

let MagicalComponent = withRouter(App)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)