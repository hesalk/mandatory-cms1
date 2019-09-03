import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
}
  componentDidMount(){
    let data = {
      Title:"twssstt",
      Auther:[{
        display: "Hesham Alkurdi",
        link: "Author",
        _id: "5d6e47da39343201cd0002f9"
      }],
      Date:"2019-02-04",
      Body:"asdffaasdasdsoo"
    }
    fetch('https://hesh.devspace.host/api/collections/save/Articels', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          data: data
      })
  })
  .then(res=>res.json())
  .then(entry => console.log(entry));
    fetch('https://hesh.devspace.host/api/collections/get/Articels')
    .then(res => res.json())
    .then(res => console.log(res));
  }
  render(){
    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    )
  }
}



export default App;
