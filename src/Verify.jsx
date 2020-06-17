import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'

class Verify extends Component {

  state = {
    name: this.props.org.name,
    website: this.props.org.website,
    donation_link: this.props.org.donation_link,
    tagline: this.props.org.tagline,
    description: this.props.org.description,
    location: this.props.org.location
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    
    fetch(`http://localhost:3000/organizations/${this.props.org.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((updatedOrg) => {
      alert("This organization has been updated!")
      console.log(updatedOrg)
      this.props.history.push(`/organizations/${this.props.org.id}`)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Verify this organization's information</h1>
        <p>We'd love your help on keeping our community up-to-date with their favorite organizations. If you're aware of any changes that an organization has made recently, like their status on accepting donations, office location, etc. please fill out this form.</p>
        
        <form onSubmit={this.handleSubmit}>
        <label>Name</label><br />
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

        <label>Tag Line</label>
        <br />
        <input
          name="tagline"
          type="text"
          autoComplete="off"
          value={this.state.tagline}
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

        <button type="submit" className="submit-button">Save changes</button>
      </form>
      
      </div>
    )
  }
}

let updateOrg = (org) => {
  return {
    type: "UPDATE_ORG",
    payload: org
  }
}

let mapDispatchToProps = {
  updateOrg: updateOrg
}

let MagicalComponent = withRouter(Verify)

export default connect(null, mapDispatchToProps)(MagicalComponent)