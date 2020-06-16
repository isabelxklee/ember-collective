import React, { Component } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'

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

  renderMapMarkers = () => {
    return this.props.events.map((event, index) => {
      return <Marker key={index} latitude={event["Latitude"]} longitude={event["Longitude"]} offsetLeft={-20} offsetTop={-10}><span role="img" aria-label="flame">⚫️</span></Marker>
    })
  }

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          onViewportChange={(viewport) => this.setState({viewport})
          }
        >

        {this.renderMapMarkers()}
        </ReactMapGL>
        
      </div>
    )
  }
}

export default Map