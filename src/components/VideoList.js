import React, { Component } from 'react'
import {storage} from '../firebase'
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

import {Container, Col, Row, Button} from 'reactstrap';
import Navigation from './Navigation.js'
import { Player } from 'video-react'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ListVideoItem from './ListVideoItem.js'


class VideoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      topFive: null,
      titleList: null
    }
  }


  componentWillMount() {
    console.log("testing...")
    let testList = []
    for (let i = 0; i < 5; i++) {
      testList.push("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4")
    }
    this.setState({topFive: testList})
    // firebase.database().ref("top5").on("value", (snapshot => {
    //  this.setState({topFive: Object.values(snapshot.val())})
    // }))
  }

  render() {
    const mW = window.innerWidth / 10 - 50
    return (
      <Container fluid = {true} style = {{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        {this.state.topFive && this.state.topFive.map((t, ind) => (<ListVideoItem key = {ind} title = "test title" name = {t} />))}
      </Container>
    )
  }
}

VideoList = withRouter(VideoList);

export default VideoList
