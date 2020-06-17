import React, { Component } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import moment from 'moment'

class Map extends Component {
  state = {
    selectedYear: 2019,
    viewport: {
      width: '100%',
      height: 600,
      latitude: 39.0626831,
      longitude: -101.642682,
      zoom: 3
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  events2019 = () => {
    let arr = []
    arr = this.props.events.filter((event, index) => {
      let date = moment(event["Date of Incident"])
      let fromYear = moment("2019-01-01")
      let boolean = moment(date).isBefore(fromYear)
      return boolean === false
    })
    return arr
  }

  renderEvents2019 = () => {
    let arr = this.events2019()
    let events2019 = []
    events2019 = arr.map((event, index) => {
      return <Marker key={index} latitude={event["Latitude"]} longitude={event["Longitude"]} offsetLeft={-20} offsetTop={-10}> <span role="img" aria-label="flame">⚫️</span></Marker>
    })
    return events2019
  }

  render() {
    console.log(this.state.selectedYear)
    return (
      <div>
        <div className="btn-group">
          <button onClick={this.handleChange} name="selectedYear" value="2019">2019</button>
          <button onClick={this.handleChange} name="selectedYear" value="2018">2018</button>
          <button onClick={this.handleChange} name="selectedYear" value="2017">2017</button>
          <button onClick={this.handleChange} name="selectedYear" value="2016">2016</button>
          <button onClick={this.handleChange} name="selectedYear" value="2015">2015</button>
          <button onClick={this.handleChange} name="selectedYear" value="2014">2014</button>
          <button onClick={this.handleChange} name="selectedYear" value="2013">2013</button>
        </div>

        <p><strong>Showing {this.renderEvents2019().length} murders by the police</strong></p>

        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          onViewportChange={(viewport) => this.setState({viewport})
          }
        >

        {this.renderEvents2019()}
        </ReactMapGL>
        
      </div>
    )
  }
}

export default Map