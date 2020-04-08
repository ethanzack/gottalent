import React from 'react';
// import Carousel from 'react-multi-carousel';
import Image1 from "./blankimg.png";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import CarouselItem from './CarouselItem.js'
import VideoItem from './VideoItem.js'


class VideoCarousel extends React.Component {
  render(
  ){
    return (
      <Carousel arrows
                infinite slidesPerPage = {6} offset = {10}
                arrowLeft = {<FaArrowCircleLeft size = {'2em'}/>} arrowRight = {<FaArrowCircleRight size = {'2em'}/>}
                addArrowClickHandler = {true}
                slides = {this.props.videos.map((vid) => {
                  return <CarouselItem user = {vid.user}/>
                })}>


      </Carousel>
    )
  }
}

export default VideoCarousel;


// import React from "react";
// import Slider from "react-slick";
// // import React from 'react';
// // // import Carousel from 'react-multi-carousel';
// import Image1 from "./blankimg.png";
// import Carousel from "@brainhubeu/react-carousel";
// import "@brainhubeu/react-carousel/lib/style.css";
// import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
// import CarouselItem from './CarouselItem.js'
//
// class VideoCarousel extends React.Component {
//   render() {
//     var settings = {
//       dots: false,
//       arrows: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 3,
//       slidesToScroll: 1
//     };
//     return (
//       <Slider {...settings}>
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//             <CarouselItem />
//       </Slider>
//     );
//   }
// }
