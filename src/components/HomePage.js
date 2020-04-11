import React from 'react';
import firebase from '../firebase.js'
import { Container, Button } from 'reactstrap';
import Carousel from 'react-multi-carousel';
import { withRouter } from 'react-router-dom';
import VideoCarousel from './VideoCarousel.js'
import VideoItem from './VideoItem.js'
import VideoList from './VideoList.js'


import Navigation from './Navigation.js'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };

  }

  componentDidMount(){
    console.log(this.props.history)
    const videos = firebase.database().ref('videos')
    videos.on('value', (snapshot) => {
      let videos = snapshot.val()
      let newState = []
      for(let video in videos){
        newState.push({
          id: video,
          user: videos[video].user
        })
      }
      this.setState({videos: newState})
    })
  }

  render(){
    return (
        <div>
        <Navigation />

          <Container fluid = {true}>
            <p> recent winners </p>
            <p> most popular videos </p>
            <VideoList key = {0}/>

            <p> categories </p>
          </Container>

        </div>

        // <div style = {{display: "flex", flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'lightblue'}}>
        //     <Navigation style = {{marginBottom: '20px'}}/>
        //
        //     <p style = {{fontWeight: 'bold', fontSize: '20px', fontFamily: 'Rajdhani', marginLeft: '10px'}}> category 1 </p>
        //     <Container className="themed-container" fluid={true} style = {{marginBottom: '20px'}}>
        //       <VideoCarousel videos = {this.state.videos}/>
        //     </Container>
        //
        //     <p style = {{fontWeight: 'bold', fontSize: '20px', fontFamily: 'Rajdhani', marginLeft: '10px'}}> category 2 </p>
        //     <Container className="themed-container" fluid={true} style = {{marginBottom: '20px'}}>
        //       <VideoCarousel videos = {this.state.videos}/>
        //     </Container>
        //
        //     <p style = {{fontWeight: 'bold', fontSize: '20px', fontFamily: 'Rajdhani',marginLeft: '10px'}}> category 3 </p>
        //     <Container className="themed-container" fluid={true} style = {{marginBottom: '20px'}}>
        //       <VideoCarousel videos = {this.state.videos}/>
        //     </Container>
        //
        //     <p style = {{fontWeight: 'bold', fontSize: '20px', fontFamily: 'Rajdhani', marginLeft: '10px'}}> catogory 4 </p>
        //     <Container className="themed-container" fluid={true} style = {{marginBottom: '20px'}}>
        //       <VideoCarousel videos = {this.state.videos}/>
        //     </Container>
        //
        // </div>

    );
  }

}

HomePage = withRouter(HomePage);
export default HomePage;

//<VideoItem url = "https://firebasestorage.googleapis.com/v0/b/talentidea-22c36.appspot.com/o/videos%2F-M46byl80qX3713B_dEH?alt=media&token=3a574660-1ec7-443e-9ffd-c45d69930512" title = "Test" />
//

//


// <Button color="danger" style = {{marginBottom: '10px'}}>Wecome to your talent show</Button>
