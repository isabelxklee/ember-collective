import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'
import Tag from './Tag.jsx'
import OrgDonations from './OrgDonations.jsx'
import moment from 'moment'
 

class ProfileOrg extends Component {
  componentDidMount() {
    fetch(`${ this.props.deploy}/tags`)
    .then(r => r.json())
    .then((tags) => {
      this.props.setAllTags(tags)
    })
    fetch(`${ this.props.deploy}/tag_joiners`)
    .then(r => r.json())
    .then((tag_joiners) => {
      this.props.setAllTagJoiners(tag_joiners)
    })
    fetch(`${ this.props.deploy}/donation_challenges`)
    .then(r => r.json())
    .then((challenges) => {
      this.props.setAllDonations(challenges)
    })
  }

  findOrgsTagJoiners = () => {
    let orgsTagJoiners = []

    orgsTagJoiners = this.props.tag_joiners.filter((tagJoiner) => {
      return tagJoiner.org_id === this.props.org.id
    })
    return orgsTagJoiners
  }

  findOrgsTags = () => {
    let orgsTagJoiners = this.findOrgsTagJoiners()
    let arr = []
    orgsTagJoiners.forEach((joiner) => {
      this.props.tags.filter((tag) => {
        return joiner.tag_id === tag.id ? arr.push(tag) : null
      })
    })
    return arr
  }

  renderOrgsDonations = () => {
    let challenges = this.props.donation_challenges
    challenges = challenges.filter((challenge) => {
      return challenge.org_id === this.props.org.id
    })
    return challenges
  }

  verifyToggle = () => {
    let created_at = this.props.created_at
    let join_date = moment(created_at)
    let now = moment()

    return now.diff(join_date, 'days') >= 2 ?
    <Link to={`/organizations/${this.props.org.id}/edit`}>
      <button className="card-button" id="verify">Verify information</button>
    </Link>
    : null
  }

  render() {
    let {name, website, donation_link, description, location, twitter, instagram, facebook} = this.props.org

    let orgsTags = this.findOrgsTags().map((tag) => {
      return <Tag key={tag.id} tag={tag} local={ this.props.deploy} deploy={this.props.deploy}/>
    })

    let donationStats = this.renderOrgsDonations().map((challenge) => {
      return <OrgDonations key={challenge.id} challenge={challenge} local={ this.props.deploy} deploy={this.props.deploy}/>
    })

    return (
      <div className="container">
        <div className="org-header">
          <div className="btn-group" id="org">{orgsTags}</div>
          <h1 className="org-profile">{name}</h1>
          <h4>{location}</h4>
        </div>
       
       <div className="org-body">
        <div className="btn-group">
          <button className="card-button"><a href={website} target="_blank" rel="noopener noreferrer" className="card-button">Website</a></button>
          <button className="card-button"><a href={donation_link} target="_blank" rel="noopener noreferrer"className="card-button">Donate</a></button>
          {twitter ? <SocialIcon url={twitter} target="_blank" rel="noopener noreferrer"/> : null}
          {facebook ? <SocialIcon url={facebook} target="_blank" rel="noopener noreferrer"/> : null}
          {instagram ? <SocialIcon url={instagram} target="_blank" rel="noopener noreferrer"/> : null}

          { this.verifyToggle() }
        </div>

          <h2>Description</h2>
          <p>{description}</p>        

          <h2>Donation match challenges</h2>
          {this.renderOrgsDonations().length < 1
            ?
            <p>This organization doesn't have any challenges yet.</p>
            :
            <div>
              {donationStats}
            </div>
          }
        </div>

      </div>
    )
  }
}

let setAllTags = (tags) => {
  return {
    type: "SET_ALL_TAGS",
    payload: tags
  }
}

let setAllTagJoiners = (tag_joiners) => {
  return {
    type: "SET_ALL_TAG_JOINERS",
    payload: tag_joiners
  }
}

let setAllDonations = (donations) => {
  return {
    type: "SET_ALL_DONATIONS",
    payload: donations
  }
}

let mapDispatchToProps = {
  setAllTags: setAllTags,
  setAllTagJoiners: setAllTagJoiners,
  setAllDonations: setAllDonations
}

let mapStateToProps = (globalState) => {
  return {
    tags: globalState.tagInfo.tags,
    tag_joiners: globalState.tagInfo.tag_joiners,
    donation_challenges: globalState.donationInformation.donation_challenges,
    created_at: globalState.userInformation.created_at
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileOrg)