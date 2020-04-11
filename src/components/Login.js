import React, { Component } from 'react'
import {firebase, facebookProvider} from '../firebase.js'
import { Col, Container, Button, CustomInput, Form, FormGroup, Input} from 'reactstrap';
import Navigation from "./Navigation.js"
import {Redirect} from 'react-router-dom'
import {Toaster, Intent} from '@blueprintjs/core'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      pwd: "",
      redirect: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)

  }

  authWithFacebook = () => {

  }

  handleEmailChange = e => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = e => {
    this.setState({pwd: e.target.value});
  }


  render(){
    if(this.state.redirect) {
      return <Redirect to="/" />
    }
    return(
      <div>
      <Navigation />

      <Container fluid = {true} >
        <Col sm="12" md={{ size: 6, offset: 3 }} style = {{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <Button color = "primary" onClick = {() => this.authWithFacebook()}> Log in with Facebook</Button>

        <Form style = {{marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center"}} ref = {(form) => {this.loginForm = form}}>
          <FormGroup>
            <Input type="email" name="email" id="email" placeholder="Email Address" ref = {(input) => {this.emailInput = input}}
                   value={this.state.email} onChange={this.handleEmailChange} />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" id="password" placeholder="Password" ref = {(input) => {this.pwdInput = input}}
                   value={this.state.pwd} onChange={this.handlePasswordChange} />
          </FormGroup>
          <Button color = "primary" type = "submit"> Log in </Button>

        </Form>
        </Col>
      </Container>
      </div>

    )
  }

}

export default Login
