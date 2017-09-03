import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import WhoAmI from './WhoAmI'
import Login from './Login'

export default class Navigation extends React.Component {
  render() {
    const user = this.props.user
    return (
      <Navbar>
        <Navbar.Header>
          <Link to="/">
            <Navbar.Brand className="app-title">tripsy</Navbar.Brand>
          </Link>
        </Navbar.Header>
        <Nav pullRight>
          {user ? <WhoAmI/> : <Login/>}
        </Nav>
      </Navbar>
    )
  }
}
