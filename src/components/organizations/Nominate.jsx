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
    instagram: "",
    twitter: "",
    facebook: "",
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
    this.setState({
      name: "",
      location: "",
      website: "",
      donation_link: "",
      tagline: "",
      description: ""
    })

    fetch(`${ this.props.deploy}/organizations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then((newOrg) => {
      alert("You've successfully nominated a new organization!")
      this.props.createOrg(newOrg)
      this.createNomination(newOrg)
      this.props.history.push("/")
    })
    .catch((error) => {
      alert("You were not able to nominate an organization. Check your information and try again.")
      console.log(error)
    })
  }

  createNomination = (newOrg) => {
    fetch(`${ this.props.deploy}/nominations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        org_id: newOrg.id,
        user_id: this.props.id
      })
    })
    .then(r => r.json())
    .then((newNom) => {
      this.props.createNom(newNom)
    })
  }

  render() {
    let {errors} = this.state

    return (
      <div className="container">
      <div className="send-challenge">
        <h1>Nominate Organization</h1>
        <p className="memorial">This feature is only available for users who have been on the Ember Collective for at least 2 days. Nominating an organization will add it to the home page with the list of other organizations.</p>
        <form onSubmit={this.handleSubmit}>
        
          <label>Organization's Name</label>
          <br />
          
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
        <p className="form-description">If this organization doesn't have a readily accessible tag line, it can be the first couple sentences of the org's description.</p>
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

        { errors.website.length > 0 || errors.donation_link.length > 0 || errors.tagline.length > 0 || errors.description.length > 0 ?
          <button type="submit" className="submit-button" id="invalid" disabled>Add organization</button>
          :
          <button type="submit" className="submit-button">Add organization</button>
        }
      </form>
      </div>
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

let createNom = (nomination) => {
  return {
    type: "CREATE_NOMINATION",
    payload: nomination
  }
}

let mapDispatchToProps = {
  createOrg: createOrg,
  createNom: createNom
}

let mapStateToProps = (globalState) => {
  return {
    id: globalState.userInformation.id
  }
}

let MagicalComponent = withRouter(Nominate)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)