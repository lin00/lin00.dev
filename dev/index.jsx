import React from "react";
import ReactDOM from "react-dom";
import {Header} from "./components/header.jsx";
import {Intro} from "./components/intro.jsx";

ReactDOM.render(
  <div>
    <Intro />
    <Header />
  </div>,
  document.querySelector("#container")
);
