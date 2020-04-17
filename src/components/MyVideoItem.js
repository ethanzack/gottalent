import React, { Component } from 'react'
import {storage} from '../firebase'
import firebase from 'firebase';
import {Container, Col, Row, Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Player, BigPlayButton } from 'video-react'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Navigation from './Navigation.js'
import VideoItem from './VideoItem.js'
import VideoList from './VideoList.js'

class MyVideoItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      myUrl: "",
      likes: 0,
      dislikes: 0,
      suggestionCount: 0,
      comments: [],
      modal: false,

    }
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  componentDidMount = () => {
    // this.setState({myUrl: this.props.name}) /* --- use for testing */
    storage.ref('videos').child(this.props.name).getDownloadURL().then((url) => {
      this.setState({myUrl: url})
    })

    firebase.database().ref(`users/Ethan/${this.props.name}`).on("value", (snapshot => {
     const up = snapshot.val()["up"]
     const down = snapshot.val()["down"]
     const comments = snapshot.val()["comments"]
     this.setState({likes: up, dislikes: down, suggestionCount: Object.keys(comments).length, comments: Object.values(comments)})
    }))


  }
 //maxWidth: `${window.innerWidth / 5}px`

  render() {
    return (
        <div>
        <Container fluid = {true}>
          <Row >
            <Col style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <Player src= {this.state.myUrl}>
                <BigPlayButton position="center" />
              </Player>
              <h6 style = {{marginTop: "3px"}}>{this.props.title}</h6>
            </Col>
            <Col style = {{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "left"}}>
              <p> Likes: {this.state.likes}</p>
              <p> Dislikes: {this.state.dislikes}</p>
              <p> Suggestion Count: {this.state.suggestionCount}</p>
              <Button color = "primary" onClick = {() => this.toggle()}> View Advanced Insights </Button>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Suggestions</ModalHeader>
          <ModalBody>
            {this.state.comments.map((c, ind) => <Row>{c}</Row>)}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
        </div>
    )
  }
}

export default MyVideoItem

// <VideoItem style = {{justifySelf: "flex-start", marginRight: "auto"}}title = {this.props.title} name = {this.props.name} />
