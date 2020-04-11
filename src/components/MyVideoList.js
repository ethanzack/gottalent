import React, { Component } from 'react'
import {storage} from '../firebase'
import firebase from 'firebase';
import {Container, Col, Row, Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Player } from 'video-react'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Navigation from './Navigation.js'
import VideoItem from './VideoItem.js'
import VideoList from './VideoList.js'
import MyVideoItem from './MyVideoItem.js'
import { Grid } from '@material-ui/core'

class MyVideoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      videos: []
    }
  }

  componentDidMount() {
    firebase.database().ref("/users/Ethan").on("value", (snapshot => {
      this.setState({videos: Object.values(snapshot.val())})
    }))
  }

  render() {
    return (
      <div>
        <Navigation />

        <Container fluid = {true}>
          <Row>
            {this.state.videos.map((vid, ind) => {
              if(ind % 2 == 0){
                return (<Col lg = "6" style = {{borderRight: "1px solid black"}}>
                          <MyVideoItem title = "test title" name = "-M46byl80qX3713B_dEH"/>
                        </Col>
                        )
              }
              else {
                return (<Col lg = "6">
                          <MyVideoItem title = "test title" name = "-M46byl80qX3713B_dEH"/>
                        </Col>)
              }
              }
            )}
          </Row>
        </Container>
      </div>
    )
  }
}

// <Row>
//   <Col style ={{borderRight: "1px solid black"}}>
//     <MyVideoItem title = "test title" name = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"/>
//   </Col>
//   <Col>
//     <MyVideoItem title = "test title" name = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"/>
//   </Col>
// </Row>
export default MyVideoList

// <VideoItem style = {{justifySelf: "flex-start", marginRight: "auto"}}title = {this.props.title} name = {this.props.name} />
