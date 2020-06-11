import React, { Component } from 'react'

export default class SingleTag extends Component {
  render() {
    let {content} = this.props.tag
    return (
      <div>
        Hello, world
        <p>{content}</p>
      </div>
    )
  }
}
