import React, { Component } from 'react'
import {storage} from '../firebase'
import firebase from 'firebase';
import {Container, Col, Row, Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Player } from 'video-react'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Navigation from './Navigation.js'
import VideoItem from './VideoItem.js'
import VideoList from './VideoList.js'
import windowSize from 'react-window-size'


class VideoPage extends Component {
  constructor(props){
    super(props)
    this.elem = null;
    this.second = null;
    this.h5 = null
    this.state = {
      h: 0,
      comment: "",
      modal: false
    }

    this.hr = this.hr.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  }

  updateComments = () => {
    if(this.state.comment != ""){
      firebase.database().ref("users/Ethan/-M46byl80qX3713B_dEH/comments").push(this.state.comment)
      this.setState({comment: ""}, () => this.toggle())
    }
  }

  hr = (ref, key) => {
    if(key == "elem"){
      this.elem = ref
    }
    else {
      this.second = ref
    }
  }


  componentDidMount() {
    // console.log(this.blocks);
      if(this.elem && this.second) {
        this.setState({h: .975 * this.elem.getBoundingClientRect().height - this.second.getBoundingClientRect().height})
      }
  }



  render() {
    return (
      <div>
        <Navigation />
        <Container fluid = {true} style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Col xs="6">
            <h5 style = {{display: "flex", justifyContent: "center", alignItems: "center"}}> Watch the video </h5>
            <VideoItem heightRet = {this.hr} title = {this.props.title} name = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" />
          </Col>
          <Col xs="6">
            <div  style = {{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
            <div  ref={n => this.h5 = n} style = {{ display: "flex", flexDirection: "column", alignItems: "center"}}>
              <h5>Send a Suggestion</h5>
            </div>
            <FormGroup style = {{width: "100%"}}>
              {this.state.h && <Input style = {{height: `${this.state.h}px`, resize: "none"}} type="textarea" name="text" id="suggestion" value = {this.state.comment} onChange = {this.handleChange} />}
            </FormGroup>
            <Button size = "md" color = "primary" onClick = {() => {this.updateComments()}}>Submit Feedback</Button>
            </div>
          </Col>
        </Container>
        <Container fluid = {true} style = {{marginTop: "5px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Row style = {{width: "100%"}}>
            <Col>
              <h5 style = {{ display: "flex", justifyContent: "center", alignItems: "center"}}> Suggested Content </h5>
              <VideoList />
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Thanks for submitting your feedback! Check out some of the suggested videos below
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default windowSize(VideoPage)

// <VideoItem style = {{justifySelf: "flex-start", marginRight: "auto"}}title = {this.props.title} name = {this.props.name} />
