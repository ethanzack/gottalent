import React, { Component } from "react";
import firebase from './firebase.js'
import { Route, Switch, withRouter } from 'react-router-dom';
import {Router} from 'react-router'
import HomePage from './components/HomePage.js'
import VideoUpload from './components/VideoUpload.js'
import VideoPage from './components/VideoPage.js'
import MyVideoList from './components/MyVideoList.js'

import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      exists: null
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
       return <VideoPage title = "Test title" name = {this.state.name}/>
    }
  } else {
     return <HomePage vidClick = {this.handleVideoClick} />
  }
}

render() {
  return (
    <Router history={history} onChange={() => {return}}>
      <Switch>
        <Route exact path = "/home" render={(props) => <HomePage {...props} />}/>
        <Route exact path = "/upload-video" component = {VideoUpload} />
        <Route exact path = "/weekly" component = {VideoUpload} />
        <Route exact path = "/monthly" component = {VideoUpload} />
        <Route exact path = "/practice" component = {VideoUpload} />
        <Route exact path = "/myvideos" component = {MyVideoList} />

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
