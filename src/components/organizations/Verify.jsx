import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'

class Verify extends Component {
  state = {
    name: this.props.org.name,
    website: this.props.org.website,
    donation_link: this.props.org.donation_link,
    tagline: this.props.org.tagline,
    description: this.props.org.description,
    location: this.props.org.location,
    backToProfile: false,

    errors: {
      website: "",
      donation_link: "",
      tagline: "",
      description: ""
    }
  }

  expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  regex = new RegExp(this.expression)

  handleChange = (event) => {
    let errors = this.state.errors

    switch (event.target.name) {
      case 'website': 
        errors.website = 
        event.target.value.match(this.regex)
            ? ''
            : 'Website must be a valid format. Example: www.example.com'
        break

      case 'donation_link': 
        errors.donation_link = 
        event.target.value.match(this.regex)
            ? ''
            : 'Website must be a valid format. Example: www.example.com'
        break

      case 'tagline': 
        errors.tagline = 
        event.target.value.length < 25 || event.target.value.length > 300
            ? 'Tagline must be between 25 and 300 characters.'
            : ''
        break

      case 'description': 
        errors.description = 
        event.target.value.length < 50 || event.target.value.length > 1250
            ? 'Description must be between 50 and 1250 characters.'
            : ''
        break

      default:
        break
    }

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validateForm = (errors) => {
    let valid = true
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    )
    return valid
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
      this.setState({
        backToProfile: true
      })
    })
  }

  render() {
    let {errors} = this.state
    if (this.state.backToProfile === true) {
      return <Redirect to={`/organizations/${this.props.org.id}`} />
    }

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
        {errors.website.length > 0 && 
          <p className='error'>{errors.website}</p>
        }
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
        {errors.donation_link.length > 0 && 
          <p className='error'>{errors.donation_link}</p>
        }
        <br />

        <label>Tag Line</label>
        <br />
        <textarea
          name="tagline"
          type="text"
          autoComplete="off"
          value={this.state.tagline}
          onChange={this.handleChange} />
        <br />
        {errors.tagline.length > 0 && 
          <p className='error'>{errors.tagline}</p>
        }
        <br />

        <label>Description</label>
        <br />

        <textarea
          name="description"
          autoComplete="off"
          value={this.state.description}
          onChange={this.handleChange} />
        <br />
        {errors.description.length > 0 && 
          <p className='error'>{errors.description}</p>
        }
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