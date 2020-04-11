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



// import { createBrowserHistory } from 'history'

// const history = createBrowserHistory();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      exists: null,
      authenticated: false
    };

    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.makeComponent = this.makeComponent.bind(this)
  }


toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

componentWillMount() {
  console.log(window.location.pathname)
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
          <VideoUpload authenticated = {this.state.authenticated} />
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

        <Route exact path = "/login">
          <Login authenticated = {this.state.authenticated} />
        </Route>

        <Route exact path = "/" render={(props) => <HomePage {...props} />}/>
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
