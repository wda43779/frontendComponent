import React from 'react'
import ReactDOM from 'react-dom'
import {Carousal, CarousalItem} from './component/Carousal'

ReactDOM.render(
  <div>
    <Carousal width={800}>
      <CarousalItem key='1'><div style={{width: '800px', height: '400px', background: '#777', fontSize: '20px'}}>1</div></CarousalItem>
      <CarousalItem ket='2'><div style={{width: '800px', height: '400px', background: '#999', fontSize: '20px'}}>2</div></CarousalItem>
      <CarousalItem ket='3'><div style={{width: '800px', height: '400px', background: '#bbb', fontSize: '20px'}}>3</div></CarousalItem>
    </Carousal>
    <Carousal width={800}>
      <CarousalItem key='1'><div style={{width: '800px', height: '400px', background: '#777', fontSize: '20px'}}>1</div></CarousalItem>
    </Carousal>
  </div>
  ,
  document.getElementById('root')
)
