import React, { Component } from 'react'

export default class Tag extends Component {
  handleChange = (event) => {
    this.props.handleCategory(event.target.value)
  }

  renderContent = () => {
    let content = ""
    this.props.tag ? content = this.props.tag.content : content = this.props.category
    return content
  }

  render() {
    return (
      <button className="card-button" onClick={this.handleChange} value={this.renderContent()}>#{this.renderContent()}</button>
    )
  }
}