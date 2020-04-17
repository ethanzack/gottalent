import React, { Component } from 'react'
import {facebookProvider} from '../firebase.js'
import firebase from 'firebase'
import { Row, Col, Container, Button, CustomInput, Form, FormGroup, Input} from 'reactstrap';
import Navigation from "./Navigation.js"
import {Redirect} from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

class CreateAccount extends Component {
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

  createAccountEmailPassword = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd)
    .then(()=>{
        toast.success("Account Created! Now you can log in")
        this.setState({redirect: true})
       })
    .catch((error)=> {
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
      return <Redirect to="/login" />
    }
    return(
      <div>
      <Navigation />
      <ToastContainer />
      <Container fluid = {true} >
        <Col sm="12" md={{ size: 6, offset: 3 }} style = {{display: "flex", flexDirection: "column", justifyContent: "center"}}>

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
              <Button  style = {{width: "100%"}}  color = "primary" onClick = {() => {this.createAccountEmailPassword()}}> Create Account </Button>
            </Col>
          </Row>

        </Form>
        </Col>
      </Container>
      </div>

    )
  }

}

export default CreateAccount
