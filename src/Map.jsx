import React, { Component } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import moment from 'moment'

class Map extends Component {
  state = {
    selectedYear: 2019,
    selectedGender: "all",
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

  eventsYear = () => {
    let arr = []
    let year = this.state.selectedYear
    arr = this.props.events.filter((event, index) => {
      let date = moment(event["Date of Incident"])
      let firstDay = moment(`${year}-01-01`)
      let lastDay = moment(`${year}-12-31`)      
      let boolean = moment(date).isBetween(firstDay, lastDay)
      return boolean === true
    })
    return arr
  }

  renderEvents = () => {
    let arr = this.eventsYear()
    let eventsYear = []
    eventsYear = arr.map((event, index) => {
      return <Marker key={index} latitude={event["Latitude"]} longitude={event["Longitude"]} offsetLeft={-20} offsetTop={-10}> <span role="img" aria-label="flame">⚫️</span></Marker>
    })
    return eventsYear

  }

  // "Victim's gender": "Male",
  // "Victim's race": "White",

  render() {
    return (
      <div className="map-container">
        <div className="resources-filter">
          <h3><strong>Filter by year</strong></h3>
          <div className="btn-group">
            <button onClick={this.handleChange} name="selectedYear" value="2019">2019</button>
            <button onClick={this.handleChange} name="selectedYear" value="2018">2018</button>
            <button onClick={this.handleChange} name="selectedYear" value="2017">2017</button>
            <button onClick={this.handleChange} name="selectedYear" value="2016">2016</button>
            <button onClick={this.handleChange} name="selectedYear" value="2015">2015</button>
            <button onClick={this.handleChange} name="selectedYear" value="2014">2014</button>
            <button onClick={this.handleChange} name="selectedYear" value="2013">2013</button>
          </div>

          <h3><strong>Filter by gender</strong></h3>
          <p>This data does not accurately represent genderqueer people, especially trans folks, as police reports and criminal intake forms do not reflect gender options outside of the male/female binary.</p>

          <div className="btn-group">
            <button onClick={this.handleChange} name="selectedGender" value="All">All</button>
            <button onClick={this.handleChange} name="selectedGender" value="Male">Male</button>
            <button onClick={this.handleChange} name="selectedGender" value="Female">Female</button>
          </div>
        </div>

        <p><strong>Showing {this.renderEvents().length} murders by the police</strong></p>

        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          onViewportChange={(viewport) => this.setState({viewport})
          }
        >

        {this.renderEvents()}
        </ReactMapGL>
        
      </div>
    )
  }
}

export default Map