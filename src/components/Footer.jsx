import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h5><a href="https://github.com/isabelxklee/ember-collective" target="blank" className="footer-left">Made with <span role="img" aria-label="heart-white">🤍</span>by Isabel K. Lee</a></h5>
        <h5><Link to="/about" className="footer-right">About Ember Collective <span role="img" aria-label="flame">🔥</span></Link></h5>
      </div>
    )
  }
}

export default Footer