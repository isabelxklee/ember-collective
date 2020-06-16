import React, { Component } from 'react'
import MapMarker from './MapMarker.jsx'
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
    })
  }

  renderMapMarkers = () => {
    return this.props.events.map((event) => {
      return <MapMarker
        key={event["Victim's name"]}
        lat={event["Latitude"]}
        lng={event["Longitude"]}
        // onClick={this.onMarkerClick}
      />
    })
  }
  
  render() {
    console.log(this.props.events)
    
    return (
      <div className="container">
        <h1>Police Brutality Tracker</h1>
        <p>Police brutality is a rampant problem in America. In 2019, the police killed approximately 1,000 people. Black people are disproportionately targeted and attacked by the police, and are 3x as likely to be killed than white people. However, most incidents go unreported and unexamined, and police officers are rarely tried for their crimes.</p>
        
        <p>It is paramount that we expose this injustice and violence. To learn more about police brutality, check out <a href="https://mappingpoliceviolence.org/" target="blank">Mapping Police Violence</a> and <Link to="/resources" className="welcome">our Resources.</Link></p>
        <p><strong>Showing {this.props.events.length} police killings from 2013–2019</strong></p>

        <Map />        

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