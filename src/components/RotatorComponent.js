'use strict';

import React from 'react';
import IframeComponent from './IframeComponent';
import IframeLockerComponent from './IframeLockerComponent';
import ControlsComponent from './ControlsComponent'
import ProgressBarComponent from './ProgressBarComponent';
import ReloaderComponent from './ReloaderComponent';

require('styles//Rotator.scss');

class RotatorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pointer: 0,
      isPlaying: false,
      timeout: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.pointer >= (nextProps.slides.length - 1)) {
      this.setState({
        pointer: 0
      });
    }
  }

  play = () => {
    clearTimeout(this.state.timeout);
    const timeout = setTimeout(() => this.next(), this.props.slides[this.state.pointer].duration);

    this.setState({
      isPlaying: true,
      timeout: timeout
    });
  }

  stop = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      isPlaying: false,
      timeout: undefined
    })
  }

  next = () => {
    let nextPointer = this.state.pointer
    if(++nextPointer >= this.props.slides.length) {
      nextPointer =  0;
    }
    this.setState({pointer: nextPointer})

    if (this.state.isPlaying) {
      this.play();
    }
  }

  prev = () => {
    let nextPointer = this.state.pointer
    if(--nextPointer < 0) {
      nextPointer = this.props.slides.length - 1;
    }
    this.setState({pointer: nextPointer})

    if (this.state.isPlaying) {
      this.play();
    }
  }

  goto = (slideId) => {
    this.setState({pointer: this.getPointerForSlideId(slideId)})

    if (this.state.isPlaying) {
      this.play();
    }
  }

  getPointerForSlideId(id) {
    for(let i in this.props.slides) {
      if(this.props.slides[i]._id == id) {
        return i;
      }
    }
  }

  render() {
    return (
      <div
        className="rotator-component"
      >
        <IframeComponent
          url={this.props.slides[this.state.pointer].url}
        />
        <IframeLockerComponent
          next={this.next}
          prev={this.prev}
        />
        <ControlsComponent
          slides={this.props.slides}
          isPlaying={this.state.isPlaying}
          play={this.play}
          stop={this.stop}
          next={this.next}
          prev={this.prev}
          goto={this.goto}
        />
        <ProgressBarComponent
          isPlaying={this.state.isPlaying}
          timeout={this.state.timeout}
          duration={this.props.slides[this.state.pointer].duration}
        />
        <ReloaderComponent
          pointer={this.state.pointer}
          durationLastScreen={this.props.slides[this.props.slides.length - 1].duration}
          indexOfLastSlide={this.props.slides.length - 1}
        />
      </div>
    );
  }
}

RotatorComponent.displayName = 'RotatorComponent';
RotatorComponent.propTypes = {
  slides: React.PropTypes.array.isRequired
};

export default RotatorComponent;
//export default injectIntl(RotatorComponent);
