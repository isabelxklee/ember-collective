import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  const [windowDimension, setWindowDimension] = useState(null)

  useEffect(() => {
    setWindowDimension(window.innerWidth)
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth)
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const isMobile = windowDimension <= 892

  return(
    <div className="footer">

      { isMobile ? 
        <div className="btn-group">
          <button className="footer-button"><Link to="/about" className="card"><span role="img" aria-label="flame">🔥</span> About Ember Collective</Link></button>
          <button className="footer-button"><a href="https://github.com/isabelxklee/ember-collective" target="_blank" rel="noopener noreferrer" className="card"><span role="img" aria-label="white heart">🤍</span> GitHub</a></button>
        </div>
      :
      <>
        <h5> <Link to="/about" className="footer-left"><span role="img" aria-label="flame">🔥</span> About Ember Collective</Link></h5>
        <h5><a href="https://github.com/isabelxklee/ember-collective" target="_blank" rel="noopener noreferrer" className="footer-right"><span role="img" aria-label="white heart">🤍</span> GitHub</a></h5>
        </>
      }

  </div>
  )
}

export default Footer