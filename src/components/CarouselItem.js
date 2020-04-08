import React from 'react';
// import Carousel from 'react-multi-carousel';
import Image1 from "./blankimg.png";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

class CarouselItem extends React.Component {
  render(){
    return (
      <div>
      <img src={Image1} style = {{border: '5px solid #4287f5'}} />
      <p>Creator: {this.props.user}</p>
      </div>
    )
  }
}

export default CarouselItem;
