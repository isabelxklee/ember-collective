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