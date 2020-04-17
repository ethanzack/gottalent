import React, { Component } from 'react'
import {storage} from '../firebase'
import firebase from 'firebase';
import {Container, Col, Row, Button} from 'reactstrap';
import { Player, BigPlayButton } from 'video-react'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


class VideoItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      like: null,
      myUrl: "",
      currLikes: null,
      currDis: null
    }

    this.onClick = this.onClick.bind(this)
    this.activeHandler = this.activeHandler.bind(this)
    this.changeLikes = this.changeLikes.bind(this)
  }
  //
  // componentWillMount = () => {
  //   console.log("testing item...")
  //   // this.setState({myUrl: this.props.name})
  //
  // }

  componentDidMount() {
   this.props.heightRet(this.elem, "elem");
   this.props.heightRet(this.second, "second");
   this.setState({myUrl: this.props.name})
   // const url = storage.ref('videos').child(this.props.name).getDownloadURL().then((url) => {
   //   this.setState({myUrl: url})
   // })
  }

  changeLikes = (like ,op) => {
    let refLike = firebase.database().ref("users/Ethan/-M46byl80qX3713B_dEH/up/")
    refLike.on("value", (snapshot => {this.setState({currLikes: parseInt(snapshot.val())})}))
    let refDis = firebase.database().ref("users/Ethan/-M46byl80qX3713B_dEH/down/")
    refDis.on("value", (snapshot => {this.setState({currDis: parseInt(snapshot.val())})}))

    if(op == "add"){
      if(like == "like"){
        refLike.set(this.state.currLikes + 1)
      }
      else if (like == "dis"){
        refDis.set(this.state.currDis + 1)
      }
    }
    else if(op == "sub" ){
      if(like == "like"){
        refLike.set(this.state.currLikes - 1)
      }
      else if (like == "dis"){
        refDis.set(this.state.currDis - 1)
      }
    }
  }

  onClick = (b) => {
    if(b == "up" && this.state.like != true){
      if(this.state.like == false){
        this.setState({like: true}, () => {this.changeLikes("like","add"); this.changeLikes("dis","sub")})
      }
      else if(this.state.like == null) {
        this.setState({like: true}, () => this.changeLikes("like","add"))
      }
    }

    else if(b == "up" && this.state.like == true){
      this.setState({like: null}, () => this.changeLikes("like","sub"))
    }

    if(b == "down" && this.state.like != false){
      if(this.state.like == true){
        this.setState({like: false}, () => {this.changeLikes("like","sub"); this.changeLikes("dis","add")})
      }
      else if(this.state.like == null){
        this.setState({like: false}, () => this.changeLikes("dis","add"))
      }
    }
    else if(b == "down" && this.state.like == false){
      this.setState({like: null}, () => this.changeLikes("dis","sub"))
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
  // ref={element => this.divRef = element}
  render() {
    return (
      <div ref={n => this.elem = n}>{this.state.myUrl && (<Container>
        <Col>
          <Row>
            <Player
              playsInline
              src={this.state.myUrl}
            >
            <BigPlayButton position="center" />
            </Player>
          </Row>
            <div ref={n => this.second = n}>
            <Row style = {{display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px"}} >
                <h4 style = {{marginRight: "auto", justifySelf: "flex-start"}}>{this.props.title}</h4>
                <Button size = "md" color = "success" active = {this.activeHandler("up")} onClick = {()=>this.onClick("up")}><FaThumbsUp /></Button>
                <Button size = "md" color = "danger" active = {this.activeHandler("down")} onClick = {()=>this.onClick("down")}><FaThumbsDown /></Button>
            </Row>
            </div>

        </Col>
      </Container>)}
      </div>
    )
  }
}

export default VideoItem
