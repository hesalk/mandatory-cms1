import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import home from './home-cards'
import articelpage from './articel'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import autherlist from './authors.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: []
        }
    }
    componentDidMount() {
        let data = {
            Title: "twssstt",
            Auther: [
                {
                    display: "Hesham Alkurdi",
                    link: "Author",
                    _id: "5d6e47da39343201cd0002f9"
                }
            ],
            Date: "2019-02-04",
            Body: "asdffaasdasdsoo"
        }

        /*     fetch('https://hesh.devspace.host/api/collections/save/Articels', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          data: data
      })
  })
  .then(res=>res.json())
  .then(entry => console.log(entry)); */
    }
    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link><Link to={"/home"}>Home</Link></Nav.Link>
                            
                                <Nav.Link><Link to={"/authoers"}>Authoers</Link></Nav.Link>
                            
                        </Nav>
                    </Navbar>
                    <Route path="/home/" exact component={home}/>
                    <Route path="/home/:id" exact component={articelpage}/>
                    <Route path="/authoers" exact component={autherlist}/>
                </Router>
            </div>
        )
    }
}

export default App;
