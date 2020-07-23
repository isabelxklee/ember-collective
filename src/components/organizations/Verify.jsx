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
    instagram: this.props.org.instagram,
    twitter: this.props.org.twitter,
    facebook: this.props.org.facebook,
    backToProfile: false,

    errors: {
      website: "",
      donation_link: "",
      tagline: "",
      description: "",
      facebook: "",
      instagram: "",
      twitter: ""
    }
  }

  expression = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi
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

        case 'facebook': 
        errors.facebook = 
        event.target.value.match(this.regex)
            ? ''
            : 'Facebook link must be a valid format. Example: www.facebook.com/test'
        break

      case 'twitter': 
        errors.twitter = 
        event.target.value.match(this.regex)
            ? ''
            : 'Twitter link must be a valid format. Example: www.twitter.com/test'
        break

      case 'instagram': 
        errors.instagram = 
        event.target.value.match(this.regex)
            ? ''
            : 'Instagram link must be a valid format. Example: www.instagram.com/test'
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
    
    fetch(`${ this.props.deploy}/organizations/${this.props.org.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then((updatedOrg) => {
      alert("This organization has been updated!")
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
        <p className="description">We'd love your help on keeping our community up-to-date with their favorite organizations. If you're aware of any changes that an organization has made recently, like their status on accepting donations, office location, etc. please fill out this form.</p>
        
        <form onSubmit={this.handleSubmit}>
        <label>Name</label><br />
        <input
            className="account"
            name="name"
            type="text"
            autoComplete="off"
            value={this.state.name}
            onChange={this.handleChange} />
          <br />
        
          <label>Location</label>
          <br />
          <input
            className="account"
            name="location"
            type="text"
            autoComplete="off"
            value={this.state.location}
            onChange={this.handleChange} />
          <br />

          <label>Website</label>
          <br />

          <input
            className="account"
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
          className="account"
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

        <label>Facebook link (optional)</label>
          <br />

          <input
            className="account"
            name="facebook"
            type="text"
            autoComplete="off"
            value={this.state.facebook}
            onChange={this.handleChange} />
        <br />
        {errors.facebook.length > 0 && 
          <p className='error'>{errors.facebook}</p>
        }
        <br />

        <label>Twitter Link (optional)</label>
          <br />

          <input
            className="account" 
            name="twitter"
            type="text"
            autoComplete="off"
            value={this.state.twitter}
            onChange={this.handleChange} />
        <br />
        {errors.twitter.length > 0 && 
          <p className='error'>{errors.twitter}</p>
        }
        <br />

        <label>Instagram Link (optional)</label>
          <br />

          <input
            className="account"
            name="instagram"
            type="text"
            autoComplete="off"
            value={this.state.instagram}
            onChange={this.handleChange} />
        <br />
        {errors.instagram.length > 0 && 
          <p className='error'>{errors.instagram}</p>
        }
        <br />

        <label>Tag Line</label>
        <br />
        <textarea
          className="account"
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
          className="account"
          name="description"
          autoComplete="off"
          value={this.state.description}
          onChange={this.handleChange} />
        <br />
        {errors.description.length > 0 && 
          <p className='error'>{errors.description}</p>
        }
        <br />

        { errors.website.length > 0 || errors.donation_link.length > 0 || errors.tagline.length > 0 || errors.description.length > 0 || errors.facebook.length > 0 || errors.instagram.length > 0 || errors.twitter.length > 0 ?
          <button type="submit" className="submit-button" id="invalid" disabled>Save Changes</button>
          :
          <button type="submit" className="submit-button">Save Changes</button>
        }
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