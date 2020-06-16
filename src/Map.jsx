import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import ReactMapGL, {Marker} from 'react-map-gl'
import MapMarker from './MapMarker.jsx'

class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: 600,
      latitude: 39.0626831,
      longitude: -101.642682,
      zoom: 3
    }
  }

  markerList = [
    {
      lat: 40.717041,
      long: -73.993318,
      name: "ABC Hospitals",
      info: 10
    },
    {
      lat: 17.442889,
      long: 78.396873,
      name: "XYZ Hospitals",
      info: 20
    },
    {
      lat: 17.441681,
      long: 78.394357,
      name: "NRI Hospitals",
      info: 10
    }
  ]

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={'pk.eyJ1IjoibWlzdGVyZ2hvc3QiLCJhIjoiY2tiaThneWhxMGNwNTJybno4bnd0dDg3dCJ9.9nLOE6d4gp6VT-cXYAYkAQ'}
          onViewportChange={(viewport) => this.setState({viewport})
          }
        >
          <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
            <span role="img" aria-label="flame">⚫️</span>
          </Marker>
          <Marker latitude={43.275746} longitude={-73.897480} offsetLeft={-20} offsetTop={-10}>
            <span role="img" aria-label="flame">⚫️</span>
          </Marker>
        </ReactMapGL>
        
        {/* { this.markerList.map((marker, index)=>{
        return (
          <div key={index} >
          <MapMarker
            longitude={marker.long}
            latitude={marker.lat}>
          </MapMarker>
          </div>
          )
        })
      } */}
      </div>
    )
  }
}

export default Map