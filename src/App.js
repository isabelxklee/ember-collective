import React, {Component} from 'react'
import {Route, withRouter } from 'react-router-dom'
import './App.css'
import {connect} from 'react-redux'
import { trackPromise } from 'react-promise-tracker'
import Home from './components/Home.jsx'
import NavBar from './components/NavBar.jsx'
import CreateAccount from './components/account-management/CreateAccount.jsx'
import Login from './components/account-management/Login.jsx'
import Profile from './components/account-management/Profile.jsx'
import Resources from './components/resources/ResourceContainer.jsx'
import ProfileOrg from './components/organizations/ProfileOrg.jsx'
import PoliceBrutalityTracker from './components/police-brutality/PoliceBrutalityTracker.jsx'
import Memorial from './components/police-brutality/Memorial.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Verify from './components/organizations/Verify.jsx'
import Nominate from './components/organizations/Nominate.jsx'
import Settings from './components/account-management/Settings.jsx'
import OtherProfile from './components/account-management/OtherProfile.jsx'

class App extends Component {

  componentDidMount() {
    trackPromise(
    fetch(`${ this.deployUrl}/organizations`)
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    }))

    trackPromise(
    fetch(`${ this.deployUrl}/users`)
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    }))
    
    if (localStorage.token) {
      fetch(`${ this.deployUrl}/users/stay_logged_in`, {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)
    }
  }

  handleResponse = (response) => {
    if (response.user) {
      localStorage.token = response.token
      this.props.setUserInfo(response)
    } else {
      alert(response.message)
    }
  }

  renderOrgRoutes = () => {
    let orgs = this.props.orgs
    let allRoutes = []
    allRoutes = orgs.map((org) => {
      return <Route exact path={`/organizations/${org.id}`} key={org.id}> <ProfileOrg key={org.id} org={org} local={this.localUrl} deploy={this.deployUrl}/> </Route>
    })
    return allRoutes
  }

  renderOrgEditRoutes = () => {
    let orgs = this.props.orgs
    let allEditRoutes = []
    allEditRoutes = orgs.map((org) => {
      return <Route exact path={`/organizations/${org.id}/edit`} key={org.id}> <Verify key={org.id} org={org} local={this.localUrl} deploy={this.deployUrl}/> </Route>
    })
    return allEditRoutes
  }

  renderUserRoutes = () => {
    let users = this.props.users
    let allUsers = []
    allUsers = users.map((user) => {
      return <Route exact path={`/users/${user.username}`} key={user.id}> <OtherProfile key={user.id} user={user} local={this.localUrl} deploy={this.deployUrl}/> </Route>
    })
    return allUsers
  }

  deployUrl = `https://ember-collective.herokuapp.com`
  localUrl = `http://localhost:3000`

  render () {
    return (
      <div className="app">
        <NavBar handleResponse={this.handleResponse}/>
        <Route exact path="/"> <Home local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route exact path="/police-brutality-tracker"> <PoliceBrutalityTracker local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route exact path="/memorial"> <Memorial local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route path="/resources"> <Resources local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route path="/create-account"> <CreateAccount handleResponse={this.handleResponse} local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route path="/login"> <Login handleResponse={this.handleResponse} local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route path="/about"> <About local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route path="/profile"> <Profile local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route path="/nominate"> <Nominate local={this.localUrl} deploy={this.deployUrl}/> </Route>
        <Route path="/account-settings">
          <Settings
            id={this.props.id}
            username={this.props.username}
            email_address={this.props.email_address}
            created_at={this.props.created_at}
            local={this.localUrl}
            deploy={this.deployUrl}
          />
        </Route>
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