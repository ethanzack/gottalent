import React, { Component } from "react";
import firebase from './firebase.js'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
// import {Router} from 'react-router'
import HomePage from './components/HomePage.js'
import VideoUpload from './components/VideoUpload.js'
import VideoPage from './components/VideoPage.js'
import MyVideoList from './components/MyVideoList.js'
import Navigation from './components/Navigation.js'
import Login from './components/Login.js'
import Logout from './components/Logout.js'
import CreateAccount from './components/CreateAccount.js'
import WeeklyCompetition from './components/WeeklyCompetition.js'


import { PulseLoader } from 'react-spinners'




// import { createBrowserHistory } from 'history'

// const history = createBrowserHistory();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      exists: null,
      authenticated: false,
      loading: true
    };

    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.makeComponent = this.makeComponent.bind(this)
  }


toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

componentWillMount() {
  if(window.location.pathname.split("/").length > 2){
    const user = window.location.pathname.split("/")[1]
    const vidId = window.location.pathname.split("/")[2]
    if (user && vidId) {
      firebase.database().ref(`users/${user}/${vidId}`).once("value",snapshot => {
      if (snapshot.exists()){
          const userData = snapshot.val();
          this.setState({exists: true, name: vidId})
        }
        else{
          console.log("doesn't exist!");
          this.setState({exists: false})
        }
      });
    } else {
      this.setState({exists: false})
    }
  }

  this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
    if(user){
      this.setState({authenticated: true, loading: false})
    }
    else {
      this.setState({authenticated: false, loading: false})

    }
  })

}

componentWillUnmount() {
  this.removeAuthListener()
}

makeComponent = () => {
  if(this.state.exists != null){
    if(this.state.exists){
       return <VideoPage title = "Test title" name = {this.state.name} authenticated = {this.state.authenticated}/>
    }
  } else {
     return <HomePage vidClick = {this.handleVideoClick} authenticated = {this.state.authenticated}/>
  }
}

render() {
  if(this.state.loading){
    return (<div style = {{display: "flex",  flexDirection: "column", alignItems: "center"}}>
      <div style = {{textAlign: "center", position: "absolute", top: "25%"}}>
        <h3>Loading</h3>
        <PulseLoader />
      </div>
    </div>)
  }
  return (
    <Router>
      <Switch>
        <Route exact path = "/home">
         <HomePage authenticated = {this.state.authenticated} />
        </Route>
        <Route exact path = "/upload-video">
          <VideoUpload authenticated = {this.state.authenticated} />
        </Route>
        <Route exact path = "/weekly">
          <WeeklyCompetition authenticated = {this.state.authenticated} />
        </Route>
        <Route exact path = "/monthly">
          <VideoUpload authenticated = {this.state.authenticated} />
        </Route>
        <Route exact path = "/practice">
          <VideoUpload authenticated = {this.state.authenticated} />
        </Route>
        <Route exact path = "/myvideos">
          <MyVideoList authenticated = {this.state.authenticated} />
        </Route>

        <Route exact path = "/logout">
          <Logout />
        </Route>

        <Route exact path = "/login">
          <Login authenticated = {this.state.authenticated} />
        </Route>

        <Route exact path = "/create-account">
          <CreateAccount authenticated = {this.state.authenticated} />
        </Route>

        <Route exact path = "/upload-video">
          <VideoUpload authenticated = {this.state.authenticated} />
        </Route>

        <Route exact path = "/">
          <HomePage authenticated = {this.state.authenticated} />
        </Route>
        <Route exact path = "/*">
          {this.makeComponent()}
        </Route>

      </Switch>

    </Router>
    );
  }
}

export default App;

//
// <Switch>
//   // <Route path="/upload-video">
//   //   // <ImageUpload />
//   // </Route>
//   <Route path="*">
//     <App />
//   </Route>
// </Switch>
