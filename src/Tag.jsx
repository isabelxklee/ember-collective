import React, { Component } from 'react'

export default class Tag extends Component {
  renderContent = () => {
    let content = ""
    this.props.tag ? content = this.props.tag.content : content = this.props.category
    return content
  }

  render() {
    return (
      <div className="tag">
        #{this.renderContent()}
      </div>
    )
  }
}
