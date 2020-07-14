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
    let {id, name, tagline, location} = this.props.org
    let orgsTags = this.findOrgsTags().map((tag) => {
      return <Tag key={tag.id} tag={tag} handleCategory={this.props.handleCategory} />
    })

    return (
      <div className="org-tile">
        <Link to={`/organizations/${id}`}>
          <div className="thin-rule"/>
          <h4 className="card">{location}</h4>
          <h2 className="card">{name}</h2>
        </Link>

          <p className="card">{this.truncateString(tagline, 125)}</p>

          {/* <div className="btn-group">
            <button className="card-button"><a href={website} target="blank" className="card-button">Website</a></button>
            <button className="card-button"><a href={donation_link} target="blank" className="card-button">Donate</a></button>
          </div> */}

          {/* <div className="thin-rule"/> */}

          <div className="btn-group">
            {orgsTags}
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