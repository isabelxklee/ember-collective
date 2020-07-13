import React, { Component } from 'react'

export default class ProfileCard extends Component {
  render() {
    let {name, story, link, img_url, date, button_label} = this.props.loved_one

    return (
      <div className="profile-card">
        <img src={img_url} className="profile-card"></img>
        <div className="card-info">
          <h2 className="card">{name}</h2>
          <h4 className="card">{date}</h4>
          <p>{story}</p>
          <button className="small-button" target="blank"><a href={link} target="blank" className="profile-card">{button_label}</a></button>
        </div>
      </div>
    )
  }
}