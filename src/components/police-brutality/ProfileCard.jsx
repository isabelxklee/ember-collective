import React, { Component } from 'react'

export default class ProfileCard extends Component {
  render() {
    let {name, story, link, img_url, date, button_label} = this.props.loved_one

    return (
      <div className="profile-card">
        <img src={img_url} className="profile-card" alt={name}></img>
        <div className="card-info">
          <h2 className="card">{name}</h2>
          <h4 className="card">Passed away on {date}</h4>
          <p className="card">{story}</p>
          {link ? <button className="card-button"><a href={link} target="_blank" rel="noopener noreferrer" className="profile-card">{button_label}</a></button> : null}
        </div>
      </div>
    )
  }
}