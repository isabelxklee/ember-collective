import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker.jsx'
import PoliceBrutalityForm from './PoliceBrutalityForm.jsx'

class PoliceBrutalityTracker extends Component {
  state={
    center: {
      lat: 40.7,
      lng: -73.9
    },
    zoom: 11
  }

  render() {
    return (
      <div className="container">
        <h1>Police Brutality Tracker</h1>
        <p>Police brutality is a rampant problem in America. In 2019, the police killed approximately 1,000 people. Black people are disproportionately targeted and attacked by the police, and are 3x as likely to be killed than white people. However, most incidents go unreported and unexamined, and police officers are rarely tried for their crimes.</p>
        
        <p>It is paramount that we expose this injustice and violence.</p>
          <div style={{ height: '75vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDrI8MOHdu_EM8ENvZ3z4Qkk7nFMR2L3ik" }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            <MapMarker
              lat={40.6}
              lng={-73.9}
            />
            <MapMarker
              lat={40.7}
              lng={-73.8}
            />
          </GoogleMapReact>
        </div>

        <PoliceBrutalityForm />
      </div>
    )
  }
}

export default PoliceBrutalityTracker