import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FilterOrgs from './organizations/FilterOrgs.jsx'
import OrgContainer from '../components/organizations/OrgContainer'
import Pluralize from 'react-pluralize'

class Home extends Component {
  state = {
    searchTerm: "",
    selectedTag: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrgs(orgs)
    })
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

  handleSearchTerm = (inputFromChild) => {
    this.setState({
      searchTerm: inputFromChild
    })
  }

  handleCategory = (inputFromChild) => {
    this.setState({
      selectedTag: inputFromChild
    })
  }

  filterBySearch = () => {
    let orgs = [...this.props.orgs]

    if (this.state.searchTerm === "") {
      return orgs
    } else if (this.state.searchTerm !== "") {
      orgs = this.props.orgs.filter((org) => {
        return Object.keys(org).some(key =>
          typeof org[key] === "string"
          && org[key] !== "description"
          ?
          org[key].toLowerCase().includes(this.state.searchTerm.toLowerCase()) : null
        )
      })     
    }
  return orgs
  }

  // loop through all the tag joiners. find the ones that match the selected tag by the tag_id.

  findTagID = () => {
    let tags = this.props.tags
    let tagID = 0
    if (this.state.selectedTag !== "") {
      tags.forEach((tag) => {
        return tag.content === this.state.selectedTag ? tagID = tag.id : null
      })
    }
    return tagID
  }

  findTagJoiners = () => {
    let joiners = this.props.tag_joiners
    let tagID = this.findTagID()
    let arr = []
    joiners.filter((joiner) => {
      return joiner.tag_id === tagID ? arr.push(joiner) : null
    })

    return arr
  }

  filterByCategory = () => {
    let orgs = [...this.props.orgs]
    let joiners = this.findTagJoiners()
    let arr = []

    orgs.filter((org) => {
      joiners.filter((joiner) => {
        return joiner.org_id === org.id ? arr.push(org) : null
      })
    })
    return arr
  }

  render() {
    console.log(this.state.selectedTag)
    return (
      <div className="App">
        <h1 className="welcome">Welcome to the Ember Collective <span role="img" aria-label="flame">🔥</span></h1>
        <h2 className="welcome">
          This is a place to consolidate information and resources supporting the Black Lives Matter movement. If you are a non-Black person in America, you must commit to Black liberation and fight for the freedom of Black folks. <Link to="/resources" className="welcome"> Here are some more resources</Link> on fighting racism, protesting safely, and ending the carceral state.
        </h2>
        <FilterOrgs
          searchTerm={this.state.searchTerm}
          handleSearchTerm={this.handleSearchTerm}
          handleCategory={this.handleCategory}
          tags={this.props.tags}
          joiners={this.props.tag_joiners}
        />
        {/* <p className="results">Showing <Pluralize singular={'organization'} count={this.filterBySearch().length} /></p> */}

        {this.state.selectedTag === "" ? <OrgContainer orgs={this.filterBySearch()}/> : <OrgContainer orgs={this.filterByCategory()}/>}
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

let setAllOrgs = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs,
  setAllTags: setAllTags,
  setAllTagJoiners: setAllTagJoiners
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgInformation.orgs,
    tags: globalState.tagInfo.tags,
    tag_joiners: globalState.tagInfo.tag_joiners
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)