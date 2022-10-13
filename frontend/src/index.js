import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./components/reportWebVitals";
import App from "./components/App";
import "./index.scss";
import "./themes/sepia.scss";
import "./themes/gray.scss";
import "./themes/dark.scss";
import "./themes/solarized_light.scss";
import "./themes/solarized_dark.scss";
import "./themes/gruvbox_light.scss";
import "./themes/gruvbox_dark.scss";
import "./themes/nord.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
