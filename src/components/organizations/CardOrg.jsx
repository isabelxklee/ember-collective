import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import Tag from './Tag.jsx'

class CardOrg extends Component {
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

  truncateString = (string, number) => {
    if (string.length <= number) {
      return string
    }
    return string.slice(0, number) + "..."
  }

  render() {
    let {id, name, website, location, tagline, donation_link} = this.props.org
    let orgsTags = this.findOrgsTags().map((tag) => {
      return `#${tag.content} `
    })

    return (
      <div className="org-tile">
        <Link to={`/organizations/${id}`}>
          <h4 className="org-tile-title">{location}</h4>
          <h2 className="org-tile-title">{name}</h2>
          <p className="org-tile-title">{this.truncateString(tagline, 150)}</p>
        </Link>
      
        <div className="btn-group">
          <button className="small-button"><a href={website} target="blank" className="small-button">Website</a></button>
          <button className="small-button"><a href={donation_link} target="blank" className="small-button">Donate</a></button>
        </div>
        {/* {orgsTags} */}
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

let mapDispatchToProps = {
  setAllTags: setAllTags,
  setAllTagJoiners: setAllTagJoiners,
}

let mapStateToProps = (globalState) => {
  return {
    tags: globalState.tagInfo.tags,
    tag_joiners: globalState.tagInfo.tag_joiners,
    donation_challenges: globalState.donationInformation.donation_challenges,
    created_at: globalState.userInformation.created_at
  }
}

let MagicalComponent = withRouter(CardOrg)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)