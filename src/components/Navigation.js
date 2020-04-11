import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    };
  }


toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {

  let activePath = window.location.pathname

  return (
      <MDBNavbar style = {{backgroundColor: "#4bbcdb" }} dark expand="md" className = "mb-3">

        <MDBNavbarBrand>
          <strong className="white-text" >GOT TALENT?</strong>
        </MDBNavbarBrand>

        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active = {activePath === "/" || activePath === "/home"}> <MDBNavLink to="/home">Home</MDBNavLink></MDBNavItem>
            <MDBNavItem active = {activePath === "/practice"}><MDBNavLink to="/practice">Practice & Share</MDBNavLink></MDBNavItem>
            <MDBNavItem active = {activePath === "/weekly"}><MDBNavLink to="/weekly">Weekly Competitions</MDBNavLink></MDBNavItem>
            <MDBNavItem active = {activePath === "/monthly"}><MDBNavLink to="/monthly">Monthly Competitions</MDBNavLink></MDBNavItem>

          </MDBNavbarNav>

          <MDBNavbarNav right>
          {this.props.authenticated
            ? <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">My Account</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href = "/myvideos">My Videos</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Account Settings</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Preferences</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            : <MDBNavItem active = {activePath === "/login"}><MDBNavLink to="/login">Register / Log in</MDBNavLink></MDBNavItem>


          }


          </MDBNavbarNav>

        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navigation;

// <MDBNavItem>
//   <MDBDropdown>
//     <MDBDropdownToggle nav caret>
//       <span className="mr-2">My Account</span>
//     </MDBDropdownToggle>
//     <MDBDropdownMenu>
//       <MDBDropdownItem href = "/myvideos">My Videos</MDBDropdownItem>
//       <MDBDropdownItem href="#!">Account Settings</MDBDropdownItem>
//       <MDBDropdownItem href="#!">Preferences</MDBDropdownItem>
//     </MDBDropdownMenu>
//   </MDBDropdown>
// </MDBNavItem>
