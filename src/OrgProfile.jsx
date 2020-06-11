import React, { Component } from 'react'
import {connect} from 'react-redux'
import Tag from './Tag.jsx'

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

  render() {
    let {name, website, donation_link, tagline, description, location} = this.props.org

    let orgsTags = this.findOrgsTags().map((tag) => {
      return <Tag key={tag.id} tag={tag}/>
    })

    return (
      <div className="container">
        <h1>{name}</h1>
        <h4>{location}</h4>
        <p>{tagline}</p>
        {orgsTags}

        <h2>Description</h2>
        <p>{description}</p>

        <div className="btn-group">
          <button className="small-button"><a href={website} target="blank" className="small-button">Website</a></button>
          <button className="small-button"><a href={donation_link} target="blank" className="small-button">Donate</a></button>
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
  setAllTagJoiners: setAllTagJoiners
}

let mapStateToProps = (globalState) => {
  return {
    tags: globalState.tagInfo.tags,
    tag_joiners: globalState.tagInfo.tag_joiners
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrgProfile)