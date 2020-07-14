import React, { Component } from 'react'
import {connect} from 'react-redux'
import Map from './Map.jsx'
import Resource from './Resource.jsx'
import ProfileCard from './ProfileCard.jsx'
import Org from './Org.jsx'

class PoliceBrutalityTracker extends Component {
  componentDidMount() {
    fetch("../map_data_geocoded.json", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(r => r.json())
    .then((mapArr) => {
      this.props.setAllEvents(mapArr)
      // alert("Trigger warning: This page includes content relating to racial violence, murder, police violence, police brutality, and racism.")
    })
    fetch("http://localhost:3000/categories")
    .then(r => r.json())
    .then((categories) => {
      this.props.setAllCategories(categories)
    })
    fetch("http://localhost:3000/category_joiners")
    .then(r => r.json())
    .then((category_joiners) => {
      this.props.setAllCategoryJoiners(category_joiners)
    })
    fetch("http://localhost:3000/resources")
    .then(r => r.json())
    .then((resources) => {
      this.props.setAllResources(resources)
    })
    fetch("http://localhost:3000/loved_ones")
    .then(r => r.json())
    .then((lovedOnes) => {
      this.props.setAllLovedOnes(lovedOnes)
    })
    fetch("http://localhost:3000/tags")
    .then(r => r.json())
    .then((tags) => {
      this.props.setAllTags(tags)
    })
    fetch("http://localhost:3000/tag_joiners")
    .then(r => r.json())
    .then((tagJoiners) => {
      this.props.setAllTagJoiners(tagJoiners)
    })
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
  }

  findTagID = (string) => {
    let selectedTagID = 0
    this.props.tags.forEach((tag) => {
      return tag.content === string ? selectedTagID = tag.id : null
    })

    return selectedTagID
  }

  findTagJoiners = (string) => {
    let arr = []
    let tagID = this.findTagID(string)

    if (tagID !== 0) {
      this.props.tag_joiners.filter((joiner) => {
        return joiner.tag_id === tagID ? arr.push(joiner) : null
      })
    }

    return arr
  }

  findOrganizations = (string) => {
    let joiners = this.findTagJoiners(string)
    let arr = []

    joiners.forEach((joiner) => {
      return this.props.orgs.filter((org) => {
        return org.id === joiner.org_id ? arr.push(org) : null
      })
    })

    return arr
  }

  findCategoryID = (string) => {
    let selectedCategoryID = 0
    if (this.props.categories.length !== 0) {
      this.props.categories.forEach((category) => {
        return category.content === string ? selectedCategoryID = category.id : null
      })
    }

    return selectedCategoryID
  }

  findCategoryJoiners = (string) => {
    let arr = []
    let categoryID = this.findCategoryID(string)

    if (categoryID !== 0) {
      this.props.category_joiners.filter((joiner) => {
        return joiner.category_id === categoryID ? arr.push(joiner) : null
      })
    }

    return arr
  }

  findResources = (string) => {
    let joiners = this.findCategoryJoiners(string)
    let arr = []

    joiners.forEach((joiner) => {
      return this.props.resources.filter((resource) => {
        return resource.id === joiner.resource_id ? arr.push(resource) : null
      })
    })

    return arr
  }

  render() {
    let prisonAbolitionResources = this.findResources("prison abolition")
    prisonAbolitionResources = prisonAbolitionResources.map((resource) => {
      return <Resource key={resource.id} resource={resource} />
    })

    let incarcerationResources = this.findResources("incarceration")
    incarcerationResources = incarcerationResources.map((resource) => {
      return <Resource key={resource.id} resource={resource} />
    })

    let incarcerationOrgs = this.findOrganizations("incarceration")
    incarcerationOrgs = incarcerationOrgs.map((org) => {
      return <Org key={org.id} org={org} />
    })

    let lovedOnes = this.props.loved_ones.map((loved_one) => {
      return <ProfileCard key={loved_one.id} loved_one={loved_one} />
    }) 

    return (
      <>
      <div className="container" id="police-brutality">
        <h1>Police Brutality Tracker</h1>
        <h2 className="welcome" id="police-brutality">Police brutality is a rampant problem in America. Every year, the police kill approximately 1,000 people. Black people are disproportionately targeted and attacked by the police, and are 3x as likely to be killed than white people. However, most incidents go unreported and unexamined, and police officers are rarely tried for their crimes.</h2>
        
        <Map events={this.props.events} />        
      </div>

      <div className="police-brutality-resources-intro">
        <h2>How do we stop police violence?</h2>
        <p>
          Police violence in America is intimately tied to anti-Black racism and the prison-industrial complex. We must dismantle the police as an institution and change the idea of police being enforcers of the law and public safety. This mission also goes hand-in-hand with prison abolition, a movement to end the American carceral state. Different organizations have varying definitions of prison abolition, but it generally means dismantling state and private prisons, ending the forced labor of incarcerated people, and investing in new systems for public safety and conflict resolution.
        </p>

        <p>  
          Here are some educational resources on police and prison abolition, and organizations you can support that fight for these causes. 
        </p>
      </div>

      <div className="container">
        <h2>Ending police violence</h2>
        <div className="org-container" id="flex">{}</div>

        <h2>Alternatives to calling the police</h2>
        <div className="org-container" id="flex">{}</div>

        <h2>Learn about prison abolition</h2>
        <div className="org-container" id="flex">{prisonAbolitionResources}</div>

        <h2>Resources for helping incarcerated people</h2>
        <div className="org-container" id="flex">{incarcerationResources}</div>

        <h2>History of the American police force</h2>
        <div className="org-container" id="flex"></div>

        <h2>Support organizations that help incarcerated people and fight for prison abolition</h2>
        <div className="org-container" id="flex">{incarcerationOrgs}</div>
      </div>

      <div className="police-brutality-resources-intro">
        <h2>Honoring those we've lost to police violence <span role="img" aria-label="candle">🕯</span></h2>
        <p>
          Say their names. Remember their stories. Fight for a future free of police violence and incarceration.
        </p>

        <div className="org-container" id="flex">
          {lovedOnes}
        </div>
      </div>
      </>
    )
  }
}

let setAllLovedOnes = (loved_ones) => {
  return {
    type: "SET_ALL_LOVED_ONES",
    payload: loved_ones
  }
}

let setAllEvents = (events) => {
  return {
    type: "SET_ALL_EVENTS",
    payload: events
  }
}

let setAllCategories = (categories) => {
  return {
    type: "SET_ALL_CATEGORIES",
    payload: categories
  }
}

let setAllCategoryJoiners = (category_joiners) => {
  return {
    type: "SET_ALL_CATEGORY_JOINERS",
    payload: category_joiners
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

let setAllResources = (resources) => {
  return {
    type: "SET_ALL_RESOURCES",
    payload: resources
  }
}

let setAllOrganizations = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let mapDispatchToProps = {
  setAllEvents: setAllEvents,
  setAllCategories: setAllCategories,
  setAllCategoryJoiners: setAllCategoryJoiners,
  setAllResources: setAllResources,
  setAllLovedOnes: setAllLovedOnes,
  setAllTags: setAllTags,
  setAllTagJoiners: setAllTagJoiners,
  setAllOrganizations: setAllOrganizations
}

let mapStateToProps = (globalState) => {
  return {
    events: globalState.eventInformation.events,
    categories: globalState.categoryInformation.categories,
    category_joiners: globalState.categoryInformation.category_joiners,
    resources: globalState.resourceInformation.resources,
    loved_ones: globalState.lovedOnes.loved_ones,
    tags: globalState.tagInfo.tags,
    tag_joiners: globalState.tagInfo.tag_joiners,
    orgs: globalState.orgInformation.orgs,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoliceBrutalityTracker)