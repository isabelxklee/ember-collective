import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class About extends Component {
  peopleArr = ["Gabrielle Noel", "Xavier Carty", "Sylwia Vargas", "Eric Kim", "Annie Souza", "Randy Herasme", "Paras Memon", "Stephen Song", "Julius Tarng", "Ryan Nylander", "Justina Villanueva", "Sabrina Hall", "Katie Puccio", "Paula Chew", "Matthew Famularo"]

  renderAcknowledgements = () => {
    return this.peopleArr.map((person, index) => {
      return <li key={index}>{person}</li>
    })
  }

  render() {
    return (
      <div className="container">
        <h1>About Ember Collective</h1><br/>
        <div className="resources-filter">
        <h3 className="welcome">
          Dear reader, thank you for visiting Ember Collective. My name is Isabel K. Lee and I'm a creative technologist. My background is primarily in design and technology, but I'm also passionate about politics and activism.
        </h3>

        <p>
          As a non-Black person of color, I built Ember Collective as a place to consolidate anti-racism resources and to support the Black Lives Matter movement. I hope that you come away from this site with more knowledge and energy to continue fighting for Black people.
        </p>

        <p>
          There are small and large ways that we can all contribute to this ongoing political revolution. The educational materials in the <Link to="/resources" id="username"> Resources</Link> section are probably more eloquent than anything I could say, but I truly believe that the revolution starts with us, and ends with enacting drastic systemic changes.
        </p>        

        <h3 className="welcome">
          So, what does that look like?
        </h3>
          <ul>
            <li>Reflect on your own privileges and biases.</li>
            <li>Let yourself be uncomfortable and challenge yourself to unlearn those racist, sexist, transphobic, etc. beliefs.</li>
            <li><a href="https://vimeo.com/343772324" id="username" target="_blank" rel="noopener noreferrer">Call in family members and friends</a> when they say or do racist things. Have engaging, uncomfortable conversations with your loved ones.</li>
            <li>Read up on the history of America, slavery, colonialism, the prison-industrial complex, and intersectional feminism. Action is important, but education will give you the necessary context and depth to give your acts meaning.</li>
            <li>Make recurring donations to non-profit organizations, especially local ones and mutual aid funds.</li>
            <li><a href="https://foundationbeyondbelief.org/news/mutual-aid" id="username" target="_blank" rel="noopener noreferrer">Mutual aid is radical.</a> Join your local mutual aid organization and help advocate for marginalized neighbors. Get to know the history of your neighborhood and who came before you.</li>
            <li>Volunteer for political campaigns that you believe in. Especially ones that promise to abolish ICE and disband the police.</li>
            <li>Stand up for Black people at work. Fight for more diverse hiring practices, fight for equal pay, fight for better management training, fight for a more inclusive culture, and speak up if you see Black co-workers being marginalized.</li>
            <li>Attend protests and rallies. If you are a white person, protect Black people by using your body as a barrier.</li>
            <li>Listen to Black trans women. Cherish Black trans women. Respect Black trans women. Protect Black trans women!</li>
          </ul>

        <p>Love,</p>
        <p>Isabel K. Lee</p>
        </div>

        <div className="resources-filter">
          <h2>Acknowledgements</h2>
          <p>A very special thank you to the following people who gave me feedback and advice on building Ember Collective. <span role="img" aria-label="pulsing-heart">💓</span></p>
          <ul>
            {this.renderAcknowledgements()}
          </ul>
        </div>

        <div className="resources-filter">
          <h2>Get in touch</h2>
          <p>If you have any questions or suggestions for improving the Ember Collective, please feel free to reach out. <span role="img" aria-label="mailbox">📪</span></p>
          <button className="submit-button"><a href="mailto:hello@isabelklee.co?subject=Reaching out about Ember Collective" className="card-button">Send an email</a></button>
        </div>
      </div>
    )
  }
}

export default About