import React, { Component } from 'react'
import {facebookProvider} from '../firebase.js'
import firebase from 'firebase'
import Navigation from "./Navigation.js"
import {Redirect} from 'react-router-dom'
import { PulseLoader } from 'react-spinners'


class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    firebase.auth().signOut().then((user) => {
      this.setState({redirect: true})
    })
  }

  render(){
      if(this.state.redirect){
        return <div><Navigation /><Redirect to="/" /></div>
      }
      return (
        <div>
        <Navigation />
          <div style = {{display: "flex",  flexDirection: "column", alignItems: "center"}}>
            <div style = {{textAlign: "center", position: "absolute", top: "25%"}}>
              <h3>Loading</h3>
              <PulseLoader />
            </div>
          </div>
        </div>
      )
  }

}

export default Logout
