import React, { Component } from 'react'
import {connect} from 'react-redux'
import Tag from './Tag.jsx'
import DonationStats from './DonationStats.jsx'

class OrgProfile extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/tags")
    .then(r => r.json())
    .then((tags) => {
      this.props.setAllTags(tags)
    })
    fetch("http://localhost:3000/tag_joiners")
    .then(r => r.json())
    .then((tag_joiners) => {
      this.props.setAllTagJoiners(tag_joiners)
    })
    fetch("http://localhost:3000/donation_challenges")
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

  render() {
    let {name, website, donation_link, tagline, description, location} = this.props.org

    let orgsTags = this.findOrgsTags().map((tag) => {
      return <Tag key={tag.id} tag={tag}/>
    })

    return (
      <div className="container">
        <div className="org-header">
          <div className="tag-container">{orgsTags}</div>
          <h1 className="org-profile">{name}</h1>
          <h4>{location}</h4>
        </div>
       
       <div className="org-body">
          <div className="btn-group">
            <button className="small-button"><a href={website} target="blank" className="small-button">Website</a></button>
            <button className="small-button"><a href={donation_link} target="blank" className="small-button">Donate</a></button>
          </div>
          <p>{tagline}</p>
          <h2>Description</h2>
          <p>{description}</p>        

          <h2>Donation match challenges</h2>
          {this.renderOrgsDonations().map((challenge) => {
            return <DonationStats key={challenge.id} challenge={challenge}/>
          })} 
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
    donation_challenges: globalState.donationInformation.donation_challenges
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrgProfile)