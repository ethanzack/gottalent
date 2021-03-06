import React, { Component } from 'react'
import {facebookProvider} from '../firebase.js'
import firebase from 'firebase'
import { Row, Col, Container, Button, CustomInput, Form, FormGroup, Input} from 'reactstrap';
import Navigation from "./Navigation.js"
import {Redirect} from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
 import { FaFacebook } from "react-icons/fa";
 import 'react-toastify/dist/ReactToastify.css';

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
    this.authWithFacebook = this.authWithFacebook.bind(this)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)

  }

  authWithFacebook = () => {
    firebase.auth().signInWithPopup(facebookProvider).then((result, error) => {
      if(error){
        toast("Wow so easy !")
      }
      else {
        this.setState({redirect: true})
      }
    })
  }

  authWithEmailPassword = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).then(() => {
      this.setState({redirect: true})
    }).catch(function(error) {
      toast.error(error.message)
    });
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
    else if(this.state.create){
      return <Redirect to="/create-account" />
    }
    return(
      <div>
      <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=1339477802908025&autoLogAppEvents=1"></script>
      <Navigation />
      <ToastContainer />
      <Container fluid = {true} >
        <Col sm="12" md={{ size: 6, offset: 3 }} style = {{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <Button color = "primary" style = {{borderRadius: "15px"}} active onClick = {() => this.authWithFacebook()} >
          <Row style = {{alignItems: "center", textAlign: "center"}}>
          <Col xs = "auto" style = {{textAlign: "left"}}><div style = {{fontSize: "1.2rem"}}><FaFacebook /></div></Col>
          <Col xs = "10" style = {{textAlign: "center", fontWeight: "bold"}}>Log in with Facebook</Col></Row>
        </Button>


        <Form style = {{marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center"}} ref = {(form) => {this.loginForm = form}}>
          <FormGroup>
            <Input type="email" name="email" id="email" placeholder="Email Address" ref = {(input) => {this.emailInput = input}}
                   value={this.state.email} onChange={this.handleEmailChange} />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" id="password" placeholder="Password" ref = {(input) => {this.pwdInput = input}}
                   value={this.state.pwd} onChange={this.handlePasswordChange} />
          </FormGroup>
          <Row>
            <Col>
              <Button style = {{width: "100%"}} color = "primary" onClick = {() => {this.authWithEmailPassword()}}> Log in </Button>
            </Col>
            <Col>
              <Button  style = {{width: "100%"}}  color = "primary" onClick = {() => {this.setState({create: true})}}> Create Account </Button>
            </Col>
          </Row>

        </Form>
        </Col>
      </Container>
      </div>

    )
  }

}

export default Login
