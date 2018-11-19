import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { CheckableButtonPage } from "./pages/checkablebuttonpage";
import { Month } from "./components/calendar/month";
import moment from "moment";
import { Uploader } from "./components/uploader/uploader";

export class CustomTemplateOfWeekday extends React.PureComponent {
  render() {
    return <div weekday={this.props.weekday}>周{this.props.weekday}</div>;
  }
}

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <Uploader
        serviceUrl="http://localhost:4000/upload"
        // onError={e => {
        //   alert(`${e}`);
        // }}
      />
    );
  }
}

export default App;
