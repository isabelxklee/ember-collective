import React, { Component } from 'react'

class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About</h1>
        <p>I started the Ember Collective to help consolidate resources for supporting Black people. As a non-Black person of color, I wanted to use my time and resources to support the Black Lives Matter movement. I hope that you come away from visiting this site with more knowledge and energy to continue fighting anti-Black racism.</p>
        <p>Love,</p>
        <p>Isabel K. Lee</p>

        <div className="acknowledgements">
          <h2>Acknowledgements</h2>
          <p>A very special thank you to the following people who gave me feedback and advice on building Ember Collective. <span role="img" aria-label="pulsing-heart">💓</span></p>
          <p>Gabrielle Noel</p>
          <p>Xavier Carty</p>
          <p>Sylwia Vargas</p>
          <p>Paras Memon</p>
          <p>Stephen Song</p>
          <p>Julius Tarng</p>
        </div>

        <div className="resources-filter">
          <h2>Get in touch</h2>
          <p>If you have any questions or suggestions for improving the Ember Collective, please feel free to reach out. <span role="img" aria-label="mailbox">📪</span></p>
          <button className="small-button"><a href="mailto:hello@isabelklee.co?subject=Reaching out about Ember Collective" className="small-button">Send an email</a></button>
        </div>
      </div>
    )
  }
}

export default About