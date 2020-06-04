import React, {Component} from 'react'
import './App.css'
import OrganizationContainer from './OrganizationContainer.jsx'

class App extends Component {
  render () {
    return (
      <div className="App">
        <p>hello world</p>
        <OrganizationContainer/>
      </div>
    )  
  }
}

export default App