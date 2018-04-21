import React, { Component } from 'react'
import _ from 'lodash'
import './Carousal.sass'

const determinedDirection = (position, width, speedX) => {
  const innateSpeedPeak = 200 // px
  const criticalPosition = position / width - Math.trunc(position / width)
  const innateSpeed = (criticalPosition - 0.5) * 2 * innateSpeedPeak
  return innateSpeed + speedX >= 0 ? 1 : 0
}

class Carousal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPosition: _.isArray(this.props.children) ? this.props.width : 0,
      doTransition: true,
      touchStartX: 0,
      touchStartPosition: 0,
      touchstartTime: 0,
      touchDeltaX: 0
    }
    this.containerRef = React.createRef()

    _.bindAll(this, ['handleTouchStart', 'handleTouchMove', 'handleTouchEnd'])
  }
  handleTouchStart (e) {
    e.preventDefault()
    this.normalizeCurrentState()
    const touchStartX = e.touches[0].clientX
    const touchStartPosition = this.state.currentPosition
    const touchstartTime = new Date().getTime()
    this.setState({touchStartX, touchStartPosition, touchstartTime, doTransition: false})
  }
  handleTouchMove (e) {
    e.preventDefault()
    const x = e.touches[0].clientX
    const deltaX = x - this.state.touchStartX
    const currentPosition = this.state.touchStartPosition - deltaX
    this.setState({currentPosition, deltaX})
  }
  handleTouchEnd (e) {
    e.preventDefault()
    const width = this.props.width
    let currentPosition = this.state.currentPosition
    const direction = determinedDirection(currentPosition, this.props.width, (currentPosition - this.state.touchStartPosition) * 100 / (new Date().getTime() - this.state.touchstartTime))
    currentPosition = (Math.trunc(currentPosition / width) + direction) * width
    this.setState({currentPosition})
    window.setTimeout(() => { this.normalizeCurrentState() }, 210)

    this.setState({touchStartX: 0, touchStartPosition: 0, touchDeltaX: 0, touchstartTime: 0, doTransition: true})
  }
  normalizeCurrentState () {
    const currentPosition = this.state.currentPosition
    let normalizeCurrentPosition
    if (currentPosition === 0) {
      normalizeCurrentPosition = currentPosition + this.props.width * 3
    } else if (currentPosition === this.props.width * (this.props.children.length + 1)) {
      normalizeCurrentPosition = currentPosition - this.props.width * this.props.children.length
    } else {
      normalizeCurrentPosition = currentPosition
    }
    this.setState({ doTransition: false, currentPosition: normalizeCurrentPosition })
  }
  componentDidMount () {
    if (!_.isArray(this.props.children)) {
      return
    }
    this.containerRef.current.addEventListener('touchstart', this.handleTouchStart)
    this.containerRef.current.addEventListener('touchmove', this.handleTouchMove)
    this.containerRef.current.addEventListener('touchend', this.handleTouchEnd)
  }
  componentWillUnmount () {
    this.containerRef.current.removeEventListener('touchstart', this.handleTouchStart)
    this.containerRef.current.removeEventListener('touchmove', this.handleTouchMove)
    this.containerRef.current.removeEventListener('touchend', this.handleTouchEnd)
  }
  render () {
    const extendedChildren = _.concat(_.last(this.props.children), this.props.children, _.first(this.props.children))
    return (
      <div className='Carousal-frame' style={{ width: this.props.width }} ref={this.containerRef}>
        <div className={'Carousal-container ' + (this.state.doTransition ? ' Carousal-container_transition' : '')}
          style={{transform: `translateX(${-this.state.currentPosition}px)`}}>
          {extendedChildren.map((e, index) => {
            return <div style={{ width: this.props.width }} key={index}>{e}</div>
          })}
        </div>
      </div>
    )
  }
}

class CarousalItem extends Component {
  render () {
    return (
      <div className='Carousal-item'>
        {this.props.children}
      </div>
    )
  }
}

export {Carousal, CarousalItem}
