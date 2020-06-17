import React, { Component } from 'react'

class PoliceBrutalityTable extends Component {
  componentDidMount() {
    fetch("../map_data_geocoded.json", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(r => r.json())
    .then((arr) => {
      this.geocodeAddress(arr)
    })
  }

  geocodeAddress = (arr) => {
    arr.forEach((person) => {
      let geocodeURL = ""

      let streetAddress = person["Street Address of Incident"]
      streetAddress = streetAddress.replace(/\s+/g, '+')
  
      let city = person["City"]
      city = city.replace(/\s+/g, '+')
  
      let stateValue = person["State"]
  
      geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${streetAddress},
      +${city},+${stateValue}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`

      return geocodeURL
    })
  }

  render() {
    return (
      <div>
        <p>hello world</p>
      </div>
    )
  }
}

export default PoliceBrutalityTable