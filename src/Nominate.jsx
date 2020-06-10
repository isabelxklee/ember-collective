import React, { Component } from 'react'
import {connect} from 'react-redux'

class Nominate extends Component {
  state = {
    name: "",
    location: "",
    website: "",
    donation_link: "",
    description: ""
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
      name: "",
      location: "",
      website: "",
      donation_link: "",
      description: ""
    })

    fetch("http://localhost:3000/organizations", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((newOrg) => {
      this.props.propsCreateOrg(newOrg)
    })
    console.log("You've successfully nominated a new organization!")
  }

  render() {
    return (
      <div className="container">
        <h1>Nominate an Organization</h1>
        <p>This feature is only available for users who have been on Black Liberation Hub for at least 2 days.</p>
        <form onSubmit={this.handleSubmit}>
        
          <label>Organization name</label>
          <br />
          
          <input
            name="name"
            type="text"
            autoComplete="off"
            value={this.state.name}
            onChange={this.handleChange} />
          <br />
        
          <label>Location</label>
          <br />
          <input
            name="location"
            type="text"
            autoComplete="off"
            value={this.state.location}
            onChange={this.handleChange} />
          <br />

          <label>Website</label>
          <br />

          <input
            name="website"
            type="text"
            autoComplete="off"
            value={this.state.website}
            onChange={this.handleChange} />
        <br />

        <label>Donation Link</label>
        <br />
        <input
          name="donation_link"
          type="text"
          autoComplete="off"
          value={this.state.donation_link}
          onChange={this.handleChange} />
        <br />

        <label>Description</label>
        <br />

        <textarea
          name="description"
          autoComplete="off"
          value={this.state.description}
          onChange={this.handleChange} />
        <br />

        <button type="submit" className="submit-button">Nominate Organization</button>
      </form>
      </div>
    )
  }
}

let createOrg = (org) => {
  return {
    type: "CREATE_ORG",
    payload: org
  }
}

let mapDispatchToProps = {
  propsCreateOrg: createOrg
}

export default connect(null, mapDispatchToProps)(Nominate)