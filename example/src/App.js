import React, { Component } from 'react'

import HexGrid from 'react-hex-image'
import imgSrc from './image.png';

export default class App extends Component {
	state = {
	    hexdata: [imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc],
	    hexwidth: 200,
	    hexbetween: 20
	  }
  render () {
    return (
      <div>
        <HexGrid hexdata={this.state.hexdata} hexwidth={this.state.hexwidth} hexbetween={this.state.hexbetween}/>
      </div>
    )
  }
}
