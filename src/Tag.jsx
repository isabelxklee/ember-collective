import React, { Component } from 'react'

export default class Tag extends Component {
  render() {
  let {content} = this.props.tag

    return (
      <div className="tag">
        #{content}
      </div>
    )
  }
}
