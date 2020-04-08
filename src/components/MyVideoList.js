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



class MyVideoList extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <div>
        <Navigation />
        <Container fluid = {true}>
          <Row>
            <Col style ={{borderRight: "1px solid black"}}>
              <MyVideoItem title = "test title" name = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"/>
            </Col>
            <Col>
              <MyVideoItem title = "test title" name = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"/>
            </Col>
          </Row>

        </Container>
      </div>
    )
  }
}

export default MyVideoList

// <VideoItem style = {{justifySelf: "flex-start", marginRight: "auto"}}title = {this.props.title} name = {this.props.name} />
