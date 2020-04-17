import React, {Component} from 'react';
import firebase from '../firebase.js'
import { Row, Col, Container, Button } from 'reactstrap';
import Carousel from 'react-multi-carousel';
import { withRouter } from 'react-router-dom';
import VideoCarousel from './VideoCarousel.js'
import VideoItem from './VideoItem.js'
import VideoList from './VideoList.js'
import Navigation from './Navigation.js'
import Countdown from './Countdown.js'
import "./competition.css"
import { FaDrum, FaMagic, FaGrinTears, FaFootballBall, FaVideo, FaQuestion, FaRunning } from "react-icons/fa";
// import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'




class WeeklyCompetition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: "",
      hours: "",
      minutes: "",
      seconds: ""
    };

    this.getTimeRemaining = this.getTimeRemaining.bind(this)
    this.getNextDayOfWeek = this.getNextDayOfWeek.bind(this)
  }

  componentDidMount() {
    // this.interval = setInterval(() => this.getTimeRemaining(this.getNextDayOfWeek(7)), 1000);
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  // getTimeRemaining = () => {
  //   console.log(test)
  // }
  //
  getTimeRemaining = (endtime) => {
    console.log(endtime)
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );
    // console.log(days)
    this.setState({
      days: String(days),
      hours: String(hours),
      minutes: String(minutes),
      seconds: String(seconds)
    })
  }

  getNextDayOfWeek = (dayOfWeek) => {
    // Code to check that date and dayOfWeek are valid left as an exercise ;)
    let date = new Date()
    let resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return new Date(resultDate.getFullYear()
                           ,resultDate.getMonth()
                           ,resultDate.getDate()
                           ,23,59,59)
  }

  render(){
    return (
        <div>
          <Navigation authenticated = {this.props.authenticated} comp = {true}/>
          <div>

          <div style = {{marginTop: "10px", overflow: "scroll", height: `${window.innerHeight - 100}px`}}>
            <h1 className = "testTitle"> Music <FaDrum style = {{marginLeft: ".5rem"}} /></h1>
            <VideoList />
            <h1 className = "testTitle"> Dance <FaRunning style = {{marginLeft: ".5rem"}} /></h1>
            <VideoList />

            <h1 className = "testTitle"> Sports <FaFootballBall style = {{marginLeft: ".5rem"}}/></h1>
            <VideoList />

            <h1 className = "testTitle"> Comedy </h1>
            <h1 className = "testTitle"> Magic </h1>
            <h1 className = "testTitle"> Film </h1>
            <h1 className = "testTitle"> Misc </h1>




          </div>


          </div>
          <Container fluid = {true} style = {{display: "flex", paddingTop: "5px", justifyContent: "center", backgroundColor: "#ff675c", position: "absolute", left: "0", bottom: "0", right: "0"}}>
            <h4 style = {{textAlign: "center", fontWeight: "bold", marginRight: "1.5rem"}}>Time Remaining: </h4>
            <Countdown date = {this.getNextDayOfWeek(7)} />
          </Container>
        </div>

    );
  }

}

// <VideoList />
// <VideoList />
// <VideoList />
// <VideoList />

WeeklyCompetition = withRouter(WeeklyCompetition);
export default WeeklyCompetition;
//
// <Row style = {{display: "flex", justifyContent: "space-around"}}>
//   <Button color = "white" style = {{borderRadius: "20px"}}>
//     <Col xs = "auto" style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
//       <Row style = {{fontSize: "3rem"}}><FaDrum /></Row>
//       <Row><p style = {{textAlign: "center"}}>Music</p></Row>
//     </Col>
//   </Button>
//
//   <Button color = "white"  style = {{borderRadius: "20px"}}>
//   <Col xs = "auto" style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
//     <Row style = {{fontSize: "3rem"}}><FaRunning /></Row>
//     <Row><p style = {{textAlign: "center"}}>Dance</p></Row>
//   </Col>
//   </Button>
//
//   <Button color = "white"  style = {{borderRadius: "20px"}}>
//   <Col xs = "auto" style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
//     <Row style = {{fontSize: "3rem"}}><FaFootballBall /></Row>
//     <Row><p style = {{textAlign: "center"}}>Sports</p></Row>
//   </Col>
//   </Button>
//
//   <Button color = "white" style = {{borderRadius: "20px"}}>
//   <Col xs = "auto" style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
//     <Row style = {{fontSize: "3rem"}}><FaGrinTears /></Row>
//     <Row><p style = {{textAlign: "center"}}>Comedy</p></Row>
//   </Col>
//   </Button>
//
//   <Button color = "white" style = {{borderRadius: "20px"}}>
//   <Col xs = "auto" style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
//     <Row style = {{fontSize: "3rem"}}><FaMagic /></Row>
//     <Row><p style = {{textAlign: "center"}}>Magic</p></Row>
//   </Col>
//   </Button>
//
//   <Button color = "white" style = {{borderRadius: "20px"}}>
//   <Col xs = "auto" style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
//     <Row style = {{fontSize: "3rem"}}><FaVideo /></Row>
//     <Row><p  style = {{textAlign: "center"}}>Film</p></Row>
//   </Col>
//   </Button>
//
//   <Button color = "white" style = {{borderRadius: "20px"}}>
//   <Col xs = "auto"  style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
//     <Row style = {{fontSize: "3rem"}}><FaQuestion /></Row>
//     <Row><p  style = {{textAlign: "center"}}>Misc</p></Row>
//   </Col>
//   </Button>
//
// </Row>
