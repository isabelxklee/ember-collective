import React, { Component } from 'react'
import {connect} from 'react-redux'
import Map from './Map.jsx'
import Resource from './Resource.jsx'
import ProfileCard from './ProfileCard.jsx'

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
  }

  findCategoryID = (string) => {
    let selectedCategoryID = 0
    this.props.categories.forEach((category) => {
      return category.content === string ? selectedCategoryID = category.id : null
    })

    return selectedCategoryID
  }

  findPACategoryJoiners = () => {
    let arr = []
    let categoryID = this.findCategoryID("prison abolition")

    if (categoryID !== 0) {
      this.props.category_joiners.filter((joiner) => {
        return joiner.category_id === categoryID ? arr.push(joiner) : null
      })
    }

    return arr
  }

  findIncarcerationCategoryJoiners = () => {
    let arr = []
    let categoryID = this.findCategoryID("incarceration")

    if (categoryID !== 0) {
      this.props.category_joiners.filter((joiner) => {
        return joiner.category_id === categoryID ? arr.push(joiner) : null
      })
    }

    return arr
  }

  findPAResources = () => {
    let arr = []
    let joiners = this.findPACategoryJoiners()

    joiners.forEach((joiner) => {
      this.props.resources.filter((resource) => {
        if (resource.id === joiner.resource_id) {
          arr.push(resource)
        }
      })
    })

    return arr
  }

  findIncarcerationResources = () => {
    let arr = []
    let joiners = this.findIncarcerationCategoryJoiners()

    joiners.forEach((joiner) => {
      this.props.resources.filter((resource) => {
        if (resource.id === joiner.resource_id) {
          arr.push(resource)
        }
      })
    })

    return arr
  }
  
  render() {
    let resourcesArr_1 = this.findPAResources()
    resourcesArr_1 = resourcesArr_1.map((resource) => {
      return <Resource key={resource.id} resource={resource} />
    })

    let resourcesArr_2 = this.findIncarcerationResources()
    resourcesArr_2 = resourcesArr_2.map((resource) => {
      return <Resource key={resource.id} resource={resource} />
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
      <h2>Stopping police violence</h2>
        <div className="org-container" id="flex">
          {resourcesArr_1}
        </div>

        <h2>Learn about prison abolition</h2>
        <div className="org-container" id="flex">
          {resourcesArr_1}
        </div>

        <h2>Resources for helping incarcerated people</h2>
        <div className="org-container" id="flex">
          {resourcesArr_2}
        </div>

        <h2>History of the American police force</h2>
        <div className="org-container" id="flex">
          
        </div>

        <h2>Support organizations that help incarcerated people and fight for prison abolition</h2>
        <div className="org-container" id="flex">
        </div>
      </div>

      <div className="police-brutality-resources-intro">
        <h2>Honoring those we lost to police violence <span role="img" aria-label="candle">🕯</span></h2>
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

let setAllResources = (resources) => {
  return {
    type: "SET_ALL_RESOURCES",
    payload: resources
  }
}

let mapDispatchToProps = {
  setAllEvents: setAllEvents,
  setAllCategories: setAllCategories,
  setAllCategoryJoiners: setAllCategoryJoiners,
  setAllResources: setAllResources,
  setAllLovedOnes: setAllLovedOnes
}

let mapStateToProps = (globalState) => {
  return {
    events: globalState.eventInformation.events,
    categories: globalState.categoryInformation.categories,
    category_joiners: globalState.categoryInformation.category_joiners,
    resources: globalState.resourceInformation.resources,
    loved_ones: globalState.lovedOnes.loved_ones
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoliceBrutalityTracker)