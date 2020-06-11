import React, { Component } from 'react'
import {connect} from 'react-redux'

class PoliceBrutalityForm extends Component {
  state = {
    date: "",
    time: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    police_name: "",
    badge_number: "",
    checked: "yes"
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      date: "",
      time: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "",
      police_name: "",
      badge_number: "",
      checked: "yes"
    })

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((newEvent) => {
      this.props.createEvent(newEvent)
    })
  }

  render() {
    return (
      <div className="police-form">
        <h2>Report police brutality</h2>
        <p>Please only share what you are comfortable sharing. Logging an instance of police brutality will display it on the map above.</p>
        <form onSubmit={this.handleSubmit}>
        <label>Date</label>
        <br />
        <input
          name="date"
          type="text"
          autoComplete="off"
          value={this.state.date}
          onChange={this.handleChange} />
        <br />

        <label>Time</label>
        <br />
        <input
          name="time"
          type="text"
          autoComplete="off"
          value={this.state.time}
          onChange={this.handleChange} />
        <br />

        <label>What happened?</label><br />
        <input
          name="description"
          type="text"
          autoComplete="off"
          value={this.state.description}
          onChange={this.handleChange} />
        <br />

        <h3>Location</h3>
        <p>If you can't remember the precise location, try to enter the cross streets.</p>
        <label>Street address</label><br />
        <input
          name="address"
          type="text"
          autoComplete="off"
          value={this.state.address}
          onChange={this.handleChange} />
        <br />

        <label>City</label>
        <br />
        <input
          name="city"
          type="text"
          autoComplete="off"
          value={this.state.city}
          onChange={this.handleChange} />
        <br />

        <label>State</label>
        <br />
          <input
            name="state"
            type="text"
            autoComplete="off"
            value={this.state.state}
            onChange={this.handleChange} />
        <br />

        <label>Country</label>
        <br />
          <input
            name="country"
            type="text"
            autoComplete="off"
            value={this.state.country}
            onChange={this.handleChange} />
        <br />

        <h3>Police Information</h3>
        <label>Do you know the police officer's name or badge number?</label><br />
        <div className="radio">
          <label>
          <input
            className="radio"
            type="radio"
            value="yes"
            checked={this.state.checked === "yes"}
            name="checked"
            onChange={this.handleChange}/>
            Yes
          </label>
          </div>

          <div className="radio">
            <label>
            <input
              className="radio"
              type="radio"
              value="no"
              checked={this.state.checked === "no"}
              name="checked"
              onChange={this.handleChange}/>
              No
            </label>
      
        </div>
        <br />

        {this.state.checked === "yes"
        ?
        <>
          <label>Name of Police Officer</label><br />
          <input
            name="police_name"
            type="text"
            autoComplete="off"
            value={this.state.police_name}
            onChange={this.handleChange} />
          <br />

          <label>Badge number</label><br />
          <input
            name="badge_number"
            type="text"
            autoComplete="off"
            value={this.state.badge_number}
            onChange={this.handleChange} />
          <br />
        </>
        :
        null
        }

        <button type="submit" className="submit-button">Log event</button>
      </form>
      </div>
    )
  }
}

let createEvent = (event) => {
  return {
    type: "CREATE_EVENT",
    payload: event
  }
}

let mapDispatchToProps = {
  createEvent: createEvent
}

export default connect(null, mapDispatchToProps)(PoliceBrutalityForm)