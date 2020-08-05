import React, { PureComponent } from 'react'
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl'
import moment from 'moment'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY

class Map extends PureComponent {
  state = {
    selectedYear: 2019,
    selectedGender: "All",
    viewport: {
      width: '100%',
      height: 600,
      latitude: 39.0626831,
      longitude: -101.642682,
      zoom: 2
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  eventsFilter = () => {
    let filteredEventsArr = []
    let year = this.state.selectedYear

    filteredEventsArr = this.props.events.filter((event) => {
      let date = moment(event["Date of Incident"])
      let firstDay = moment(`${year}-01-01`)
      let lastDay = moment(`${year}-12-31`)      
      let boolean = moment(date).isBetween(firstDay, lastDay)
      return boolean === true
    })

    if (this.state.selectedGender === "All") {
      return filteredEventsArr
    } else if (this.state.selectedGender === "Female") {
      filteredEventsArr = filteredEventsArr.filter((event) => {
        return event["Victim's gender"] === "Female"
      })
    } else {
      filteredEventsArr = filteredEventsArr.filter((event) => {
        return event["Victim's gender"] === "Male"
      })
    }
    return filteredEventsArr
  }

  renderEvents = () => {
    let arr = this.eventsFilter()
    let filteredEvents = []

    filteredEvents = arr.map((event, index) => {
      return <Marker key={index} latitude={event["Latitude"]} longitude={event["Longitude"]} offsetLeft={-20} offsetTop={-10}> <span role="img" aria-label="flame">⚫️</span></Marker>
    })
    return filteredEvents
  }

  resultsNumber = () => {
    switch(this.state.selectedGender) {
      case "All":
        return <p><strong>Showing {this.renderEvents().length} people murdered by the police in {this.state.selectedYear}</strong></p>
      case "Female":
        return <p><strong>Showing {this.renderEvents().length} women murdered by the police in {this.state.selectedYear}</strong></p>
      case "Male":
        return <p><strong>Showing {this.renderEvents().length} men murdered by the police in {this.state.selectedYear}</strong></p>
      default:
        return <p><strong>Showing {this.renderEvents().length} people murdered by the police in {this.state.selectedYear}</strong></p>
    }
  }

  render() {
    return (
      <div className="map-container">
        <div className="resources-filter">
          <h3><strong>Filter by year</strong></h3>
          <div className="btn-group">
            <button onClick={this.handleChange} name="selectedYear" value="2019" className="card-button">2019</button>
            <button onClick={this.handleChange} name="selectedYear" value="2018" className="card-button">2018</button>
            <button onClick={this.handleChange} name="selectedYear" value="2017" className="card-button">2017</button>
            <button onClick={this.handleChange} name="selectedYear" value="2016" className="card-button">2016</button>
            <button onClick={this.handleChange} name="selectedYear" value="2015" className="card-button">2015</button>
            <button onClick={this.handleChange} name="selectedYear" value="2014" className="card-button">2014</button>
            <button onClick={this.handleChange} name="selectedYear" value="2013" className="card-button">2013</button>
          </div>

          <h3><strong>Filter by gender</strong></h3>
          <p className="card">This data does not accurately represent genderqueer people, especially trans folks, as police reports and criminal intake forms do not reflect gender options outside of the male/female binary.</p>

          <div className="btn-group">
            <button onClick={this.handleChange} name="selectedGender" value="All" className="card-button">All</button>
            <button onClick={this.handleChange} name="selectedGender" value="Male" className="card-button">Male</button>
            <button onClick={this.handleChange} name="selectedGender" value="Female" className="card-button">Female</button>
          </div>

          <p>Map data source: <a href="https://mappingpoliceviolence.org/" target="_blank" rel="noopener noreferrer" id="username">Mapping Police Violence</a></p>
        </div>

        {this.resultsNumber()}

        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(viewport) => this.setState({viewport})
          }
        >

        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl showCompass={false}/>
        </div>

        {this.renderEvents()}

        </ReactMapGL>
        
      </div>
    )
  }
}

export default Map