import React, {Component, useEffect, useState} from 'react'
import styled from "styled-components"
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

function NavBar() {
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

  const isMobile = windowDimension <= 640

  function handleLogout() {
    localStorage.clear()
    this.props.history.push("/")
  }
  
    return (
      // if (localStorage.token) {
      //   return <div className="header">
      //     <NavLink to="/" exact className="header-link">Home</NavLink><br/>
      //     <NavLink to="/police-brutality-tracker" exact className="header-link">Police Brutality Tracker</NavLink><br/>
      //     <NavLink to="/resources" exact className="header-link">Resources</NavLink><br/>
      //     <NavLink to={`/profile`} exact className="header-link">Profile</NavLink><br/>
      //     <NavLink to='/' onClick={handleLogout} className="header-link">Logout</NavLink>
      //   </div>
      // }

      <div className="header">
      { isMobile? (
        <>
        <Navbar.Wrapper>
          <Navbar.Item>
            <NavLink to="/create-account" exact className="header-link">Create Account</NavLink>
          </Navbar.Item>
          <Navbar.Item>
            <NavLink to="/login" exact className="header-link">Login</NavLink>
          </Navbar.Item>
        </Navbar.Wrapper>
        <MobileNavbar.Wrapper>
          <MobileNavbar.Item>
            <NavLink to="/" exact className="navbar-link">Home</NavLink>
          </MobileNavbar.Item>
          <MobileNavbar.Item>
            <NavLink to="/police-brutality-tracker" exact className="navbar-link">Police Brutality</NavLink>
          </MobileNavbar.Item>
          <MobileNavbar.Item>
            <NavLink to="/resources" exact className="navbar-link">Resources</NavLink>
          </MobileNavbar.Item>
        </MobileNavbar.Wrapper>
        </>
      ) : (
        <Navbar.Wrapper>
          <Navbar.Item>
            <NavLink to="/" exact className="header-link">Home</NavLink>
          </Navbar.Item>
          <Navbar.Item>
            <NavLink to="/police-brutality-tracker" exact className="header-link">Police Brutality</NavLink>
          </Navbar.Item>
          <Navbar.Item>
            <NavLink to="/resources" exact className="header-link">Resources</NavLink>
          </Navbar.Item>
          <Navbar.Item>
            <NavLink to="/create-account" exact className="header-link">Create Account</NavLink>
          </Navbar.Item>
          <Navbar.Item>
            <NavLink to="/login" exact className="header-link">Login</NavLink>
          </Navbar.Item>
        </Navbar.Wrapper>
      )}
      </div>
    )
  }

let setUserInfo = (response) => {
  return {
    type: "SET_USER_INFO",
    payload: response
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo
}

let mapStateToProps = (globalState) => {
  return {
    id: globalState.userInformation.id,
    username: globalState.userInformation.username
  }
}

let MagicalComponent = withRouter(NavBar)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;
    align-self: flex-start;
    padding: 0px 20px;
    display: flex;
    align-items: left;
    background-color: rgb(255, 252, 248);
    justify-content: space-between;
  `,
  Item: styled.p`
    padding: 0 16px;
    cursor: pointer;
    font-size: 16px; 
    line-height: 25px;
    font-weight: 700;
    color: rgb(45, 45, 45);
    margin: 20px;
  `,
}

const MobileNavbar = {
  Wrapper: styled(Navbar.Wrapper)`
    padding: 0;
    position: fixed;
    width: 100vw;
    bottom: 0;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1);
    background-color: rgb(45, 45, 45);
  `,
  Item: styled(Navbar.Item)`
    color: rgb(255, 252, 248);
  `,
}