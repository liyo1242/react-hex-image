import React, { Component } from 'react'

import styles from './styles.css'

export default class HexGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      clickItem: null,
      hexdata: props.hexdata || [],
      hexdataWithSerial: null,
      hexwidth: props.hexwidth || 200,
      hexbetween: props.hexbetween || 20
    }
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize.bind(this));
    // 初始化css root變數    
    let root = document.documentElement;
    root.style.setProperty('--hex-width', this.state.hexwidth + "px");
    root.style.setProperty('--hex-between', this.state.hexbetween + "px");
    this.hexDataAddSerialNumber();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize.bind(this));
  }

  hexDataAddSerialNumber() {
    let serialAddedData = this.state.hexdata.reduce((ccumulator, currentValue, currentIndex) => {
      ccumulator.push({
        SerialNumber: currentIndex,
        value: currentValue
      })
      return ccumulator;
    }, []);
    this.setState({hexdataWithSerial: serialAddedData});
  }

  updateSize() {
    try {
      // window.innerWidth能無視滑動條
      let width = window.innerWidth;
      this.setState({ width });
    } catch (ignore) {
    }
  }

  clickHandler(SerialNumber) {
    this.setState({clickItem: SerialNumber});
  }

  render() {
    let hexEachRow = Math.floor((this.state.width + this.state.hexbetween) / ( this.state.hexwidth + this.state.hexbetween ));
    let hexGridCount = hexEachRow + 1; // 每行+1格 為了畫面對稱

    //============================================Symmetrical graphics data prepare
    let originData = Array.isArray(this.state.hexdataWithSerial) ? this.state.hexdataWithSerial : [];
    let magicBox = []
    originData.forEach((e, i) => {
      magicBox.push(e);
      if(i === (hexGridCount - 1) || (i - (hexGridCount - 1)) % (2 * hexGridCount - 1) === 0) { // 找出奇數行最後一個
        magicBox.push(-1); // 藏起來的六角形資料為-1
      }
    })

    //=================================================hex-box Columns
    let hexStyleValue = ""
    for( let j=0; j<hexGridCount; j++ ) {
      hexStyleValue = hexStyleValue + `${this.state.hexwidth}px `;
    }
    let hexStyle = {
      gridTemplateColumns: hexStyleValue
    }

    //=================================================Symmetrical graphics draw hexContent
    let dataSerialNumber = -1; 
    let hexContent = magicBox.map((e, i) => {
      let style = null;
      if(Math.floor(i / hexGridCount) % 2 === 1) {
        if( i % hexGridCount === 0) {
          style = {
            // 偶數行第一個六角形為了畫面對稱藏起來
            visibility: "hidden"
          }
        } else {
          style = {
            // 偶數行從Grid格子的偏移量
            margin: `0 0 0 -${(this.state.hexwidth + this.state.hexbetween) * 0.5}px`
          }
        }
      }

      if(e !== -1) dataSerialNumber++; // 原始資料序列號
      let hoverParameter = dataSerialNumber; // let為區域指定 指定值傳入能被限定

      let clickAnimate = null
      if(e.SerialNumber !== undefined && e.SerialNumber === this.state.clickItem){
        clickAnimate = [
          <span key="a"></span>,
          <span key="b"></span>,
          <span key="c"></span>,
          <span key="d"></span>,
          <span key="e"></span>,
          <span key="f"></span>
        ]
      }

      return (
        <div className={styles.hexagon} style={style} key={i} onClick={() => this.clickHandler(hoverParameter)}>
          <div className={styles.hexagoninner}>
            <div className={styles.hexagondeepinner}>
              <div className={styles.hexagonimage} style={{backgroundImage: `url(${e.value ? e.value : ""})`}}>
              {clickAnimate}              
              </div>
            </div>
          </div>
        </div>
      )
    })
  // ====================================================render() return 
  return (
        <div className={styles.container}>
          <div className={styles.hexbox} style={hexStyle}>
            {hexContent}
          </div>
        </div>
    )};
}
