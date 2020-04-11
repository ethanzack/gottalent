import React, { Component } from 'react'
import {storage} from '../firebase'
import firebase from 'firebase';
import { Link, withRouter, Route } from 'react-router-dom';
import {Container, Col, Row, Button} from 'reactstrap';
import { Player, ControlBar, BigPlayButton } from 'video-react'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ReactPlayer } from 'react-player'
import VideoPage from "./VideoPage.js"
import "./playbuttonedits.css"

class ListVideoItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      like: null,
      myUrl: ""
    }

    this.onClick = this.onClick.bind(this)
    this.activeHandler = this.activeHandler.bind(this)
    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  componentDidMount = () => {
    // this.setState({myUrl: this.props.name})
    const url = storage.ref('videos').child(this.props.name).getDownloadURL().then((url) => {
      this.setState({myUrl: url})
    })
  }

  onClick = (b) => {
    if(b == "up" && (this.state.like == false || this.state.like == null)){
      this.setState({like: true})
    }
    else if(b == "up" && this.state.like == true){
      this.setState({like: null})
    }

    if(b == "down" && (this.state.like == true || this.state.like == null)){
      this.setState({like: false})
    }
    else if(b == "down" && this.state.like == false){
      this.setState({like: null})
    }
  }

  activeHandler = (b) => {
    if(b == "up"){
      if(this.state.like != null){
        return this.state.like
      }
      else{return false}
    }
    else if(b == "down"){
      if(this.state.like != null){
        return !this.state.like
      }
      else{return false}
    }

  }
  // <Link to="/Ethan/-M46byl80qX3713B_dEH">

  handleVideoClick = () => {
    window.location.assign("/Ethan/-M46byl80qX3713B_dEH")
  }

  render() {
    const width = window.innerWidth
    return (
      <>{this.state.myUrl && (
          <Container onClick = {() => this.handleVideoClick()} style = {{maxHeight: `${9 / 16 * width / 6}px`, maxWidth: `${width / 6}px`}}>
          <Col>
            <Row>
              <Player src= {this.state.myUrl}>
                <ControlBar disableCompletely={true} />
                <BigPlayButton position="center" />
              </Player>
            </Row>
              <Row style = {{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "5px"}}>
                  <h6>{this.props.title}</h6>
              </Row>
          </Col>
        </Container>
    )}</>
    )
  }
}


export default withRouter(ListVideoItem)
