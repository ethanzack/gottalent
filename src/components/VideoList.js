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
      testList.push("-M46byl80qX3713B_dEH")
    }
    this.setState({topFive: testList})
    // firebase.database().ref("top5").on("value", (snapshot => {
    //  this.setState({topFive: Object.values(snapshot.val())})
    // }))
  }

  render() {
    const vids = this.state.topFive && this.state.topFive.map((t, ind) => (<ListVideoItem key = {ind} title = "test title" name = {t} />))
    const width = window.innerWidth
    return (
      <Container fluid = {true} style = {{display: "flex", flexDirection: "row", justifyContent: "space-around", height: `${9 / 16 * width / 5}px`, width: `${width}px`}}>
        {vids.length == 5 ? vids : null}
      </Container>
    )
  }
}

VideoList = withRouter(VideoList);

export default VideoList
