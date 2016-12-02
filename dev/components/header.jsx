import React from "react";
import ReactDOM from "react-dom";

var Header = React.createClass({
  render() {
    return (
      <div className='header'>
        <div className='row-of-buttons'>
          <a className='button' href='./index.html'>Home</a>
          <a className='button'>About</a>
          <a className='button'>Projects</a>
          <a className='button'>Quirks</a>
        </div>

        <a className='linkedin' href="https://www.linkedin.com/in/lin00"><img src="imgs/linkedin.png"/></a>
      </div>
    );
  }
});

export {Header};
