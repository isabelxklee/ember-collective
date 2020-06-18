import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'

class Nominate extends Component {
  state = {
    name: "",
    location: "",
    website: "",
    donation_link: "",
    tagline: "",
    description: "",
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
    console.log(event.target.value)
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
    this.setState({
      name: "",
      location: "",
      website: "",
      donation_link: "",
      tagline: "",
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
      this.props.history.push("/")
    })
    console.log("You've successfully nominated a new organization!")
  }

  render() {
    let {errors} = this.state

    return (
      <div className="send-challenge">
        <h2>Nominate an Organization</h2>
        <p>This feature is only available for users who have been on the Ember Collective for at least 2 days.</p>
        <form onSubmit={this.handleSubmit}>
        
          <label>Name of Organization</label>
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
        <p className="form-description">If this organization doesn't have a readily accessible tag line, it can be the first couple sentences of the org's description.</p>
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

        <button type="submit" className="submit-button">Add organization</button>
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

let MagicalComponent = withRouter(Nominate)

export default connect(null, mapDispatchToProps)(MagicalComponent)