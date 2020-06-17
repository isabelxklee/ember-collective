import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Map from './Map.jsx'

class PoliceBrutalityTracker extends Component {
  componentDidMount() {
    fetch("../map_data_geocoded.json", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(r => r.json())
    .then((mapArr) => {
      this.props.setAllEvents(mapArr)
      // alert("Trigger warning: This page includes content relating to racial violence, murder, police violence, police brutality, and racism.")
    })
  }
  
  render() {    
    return (
      <div className="container">
        
        <h1>Police Brutality Tracker</h1>
        <h2 className="welcome" id="police-brutality">Police brutality is a rampant problem in America. Every year, the police kill approximately 1,000 people. Black people are disproportionately targeted and attacked by the police, and are 3x as likely to be killed than white people. However, most incidents go unreported and unexamined, and police officers are rarely tried for their crimes.</h2>
        
        {/* <p>It is paramount that we expose this injustice and violence. To learn more about police brutality, check out <a href="https://mappingpoliceviolence.org/" target="blank">Mapping Police Violence</a> and <Link to="/resources" className="welcome">our Resources.</Link></p> */}

        <Map events={this.props.events} />        

        <p>Map data source: <a href="https://mappingpoliceviolence.org/" target="blank">Mapping Police Violence</a></p>
      </div>
    )
  }
}

let setAllEvents = (events) => {
  return {
    type: "SET_ALL_EVENTS",
    payload: events
  }
}

let mapDispatchToProps = {
  setAllEvents: setAllEvents
}

let mapStateToProps = (globalState) => {
  return {
    events: globalState.eventInformation.events
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoliceBrutalityTracker)