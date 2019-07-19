# react-hex-image

> 

[![NPM](https://img.shields.io/npm/v/react-hex-image.svg)](https://www.npmjs.com/package/react-hex-image) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-hex-image
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-hex-image'

class Example extends Component {
  state = {
    hexdata: [imgSrc, imgSrc2, imgSrc3], // Array
    hexwidth: "your Hexagon width", // Number
    hexbetween: "your Hexagon gap" // Number
  }

  render () {
    return (
      <MyComponent hexdata={this.state.hexdata} hexwidth={this.state.hexwidth} hexbetween={this.state.hexbetween} />
    )
  }
}
```

## License

MIT © [liyo1242](https://github.com/liyo1242)
