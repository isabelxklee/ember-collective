import React, { Component } from 'react'
import {connect} from 'react-redux'
import Map from './Map.jsx'
import Resource from './Resource.jsx'

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
  }

  findCategoryID = () => {
    let selectedCategoryID = 0
    this.props.categories.forEach((category) => {
      return category.content === "prison abolition" ? selectedCategoryID = category.id : null
    })

    return selectedCategoryID
  }

  findCategoryJoiners = () => {
    let arr = []
    let categoryID = this.findCategoryID()

    if (categoryID !== 0) {
      this.props.category_joiners.filter((joiner) => {
        return joiner.category_id === categoryID ? arr.push(joiner) : null
      })
    }

    return arr
  }

  findResources = () => {
    let arr = []
    let joiners = this.findCategoryJoiners()

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
    let resourcesArr = this.findResources()
    resourcesArr = resourcesArr.map((resource) => {
      return <Resource key={resource.id} resource={resource} />
    })

    return (
      <div className="container">
        
        <h1>Police Brutality Tracker</h1>
        <h2 className="welcome" id="police-brutality">Police brutality is a rampant problem in America. Every year, the police kill approximately 1,000 people. Black people are disproportionately targeted and attacked by the police, and are 3x as likely to be killed than white people. However, most incidents go unreported and unexamined, and police officers are rarely tried for their crimes.</h2>
        
        <Map events={this.props.events} />        

        <p>Map data source: <a href="https://mappingpoliceviolence.org/" target="blank" className="welcome">Mapping Police Violence</a></p>

        <div className="resources-filter">
          <h2>Fighting against police violence</h2>
          <p>
            Stopping police violence goes hand-in-hand with ending the carceral state. We must work towards prison abolition just as we should dismantle the police as an institution.
          </p>

          <h3>History of the modern police force</h3>

          <h3>Resources for helping incarcerated people</h3>
        </div>

        <h2>Learn about prison abolition</h2>
        <div className="org-container" id="flex">
          {resourcesArr}
        </div>
      </div>
    )
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
  setAllResources: setAllResources
}

let mapStateToProps = (globalState) => {
  return {
    events: globalState.eventInformation.events,
    categories: globalState.categoryInformation.categories,
    category_joiners: globalState.categoryInformation.category_joiners,
    resources: globalState.resourceInformation.resources
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoliceBrutalityTracker)