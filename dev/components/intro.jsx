import React from "react";
import ReactDOM from "react-dom";

var Intro = React.createClass({
  render() {
    return (
      <div className='intro'>
        <div className='background'>
          <img src='imgs/bubbles.jpg' />
        </div>
        <div className='background'>
          <div className='bubble'>
            <h1>Hi</h1>
            <p>I'm Bubbles</p>
          </div>
        </div>
      </div>
    );
  }
});

export {Intro};
