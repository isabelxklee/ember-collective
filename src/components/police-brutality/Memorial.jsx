import React, { Component } from 'react'
import ProfileCard from './ProfileCard.jsx'
import {connect} from 'react-redux'
import ScrollUpButton from "react-scroll-up-button"

class Memorial extends Component {
  componentDidMount() {
    fetch(`${ this.props.deploy}/loved_ones`)
    .then(r => r.json())
    .then((lovedOnes) => {
      this.props.setAllLovedOnes(lovedOnes)
    })
  }
  
  render() {
    let lovedOnes = this.props.loved_ones.map((loved_one) => {
      return <ProfileCard key={loved_one.id} loved_one={loved_one} />
    }) 

    return (
      <div className="container" id="memorial">
        <ScrollUpButton />
        <h1 className="memorial">Honoring the Black people that we've lost to racial violence and police brutality <span role="img" aria-label="candle">🕯</span></h1>
        <p className="memorial">
          Say their names. Remember their stories. Fight for a future free of police violence and incarceration.
        </p>

        <div id="flex-container">
          {lovedOnes}
        </div>
      </div>
    )
  }
}

let setAllLovedOnes = (loved_ones) => {
  return {
    type: "SET_ALL_LOVED_ONES",
    payload: loved_ones
  }
}

let mapDispatchToProps = {
  setAllLovedOnes: setAllLovedOnes
}

let mapStateToProps = (globalState) => {
  return {
    loved_ones: globalState.lovedOnes.loved_ones
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memorial)