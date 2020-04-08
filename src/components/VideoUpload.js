import React, { Component } from 'react'
import {storage} from '../firebase'
import firebase from 'firebase';
import { Media, Row, Col, Container, Button, CustomInput, Form, FormGroup, Input } from 'reactstrap';
import Navigation from './Navigation.js'
import VideoThumbnail from 'react-video-thumbnail'
import { Player } from 'video-react'

class VideoUpload extends Component {
  constructor(props){
    super(props)
    this.state = {
      video: null,
      videoName: "Upload a Video!",
      previewFile: "",
      title: "",
      categories: "",
      tags: "",
      url: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleCatChange = this.handleCatChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.renderVideo = this.renderVideo.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  renderVideo = () => {
    if(this.state.previewFile != ""){
      return <Player
        playsInline
        src={this.state.previewFile}
      />
    }
  }
  handleChange = e => {
    if (e.target.files[0]){
      const video = e.target.files[0]
      this.setState({video: e.target.files[0], videoName:e.target.files[0].name, previewFile: URL.createObjectURL(e.target.files[0])})
    }
    else {
      this.setState({video: "Upload a Video!"});
    }
  }

  handleTitleChange = e => {
    this.setState({title: e.target.value});
  }

  handleCatChange = e => {
    this.setState({categories: e.target.value});
  }

  handleTagChange = e => {
    this.setState({tags: e.target.value});
  }

  handleUpload = () => {
    const {video} = this.state
    const key = Math.floor(Math. random() * 1000000000)
    const newCategories = this.state.categories.split(",").map(function(item) {return item.trim()})




    const newData = firebase.database().ref(`users/Ethan`).push({
      user: "Ethan",
      title: this.state.title,
      categories: newCategories,
      tags: this.state.tags.split(",").map(function(item) {return item.trim()}),
      up: 0,
      down: 0,
      comments: []
    })

    newCategories.forEach((function (cat) {
      firebase.database().ref(`categories/${cat}`).child(`${newData.key}`).set({
        user: "Ethan",
        title: this.state.title,
        categories: newCategories,
        tags: this.state.tags.split(",").map(function(item) {return item.trim()}),
        up: 0,
        down: 0,
        comments: []
      })
    }), this);

    const uploadTask = storage.ref(`videos/${newData.key}`).put(video)
  }

  // MAKE THIS AN UPLOAD FORM
  // INPUT CATEGORY
  // USE AUTHENTICATION TO GET USER
  render() {
    return (
      <div>
      <Navigation style = {{marginBottom: '20px'}}/>
      <Container className="themed-container" fluid={true} style = {{marginBottom: '20px'}}>
        <Col sm="12" md={{ size: 6, offset: 3 }} style = {{display: "flex", flexDirection: "column", justifyContent: "center"}}>

          <Form>
            <FormGroup>
              <CustomInput
                type="file"
                id="exampleCustomFileBrowser"
                name="customFile"
                label={this.state.videoName}
                onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
            {this.renderVideo()}

            </FormGroup>
            <FormGroup>
              <Input type="text" name="title" id="title" placeholder="Video Title" value={this.state.title} onChange={this.handleTitleChange} />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Input type="text" name="categories" id="categories" placeholder="Categories" value={this.state.categories} onChange={this.handleCatChange} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input type="text" name="tags" id="tags" placeholder="Tags" value={this.state.tags} onChange={this.handleTagChange} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Button color="primary" size="md" onClick = {this.handleUpload}>Submit</Button>

        </Col>

      </Container>
      </div>
    )
  }
}

export default VideoUpload
// <VideoThumbnail
//   videoUrl={this.state.previewFile}
//   style= {{width: "auto", height: "auto", maxWidth: '100%', maxHeight: '100%'}}
// />
// <img style= {{width: "auto", height: "auto", maxWidth: '100%', maxHeight: '100%'}} src={this.state.previewFile} alt="Uploaded Video" />
//
// just go to success page
// <input type = "file" onChange = {this.handleChange}/>
