import React, {Component} from 'react'
import './App.css'
import OrganizationContainer from './OrganizationContainer.jsx'
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrgs(orgs)
    })
  }

  render () {
    return (
      <div className="App">
        <OrganizationContainer/>
      </div>
    )  
  }
}

let setAllOrgs = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)