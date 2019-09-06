import React, {Component} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import get from './getfunc'

class authorslist extends Component {
    constructor(props) {
        super(props);
        this.state = {entries:[]}
    }
    componentDidMount(){
        get("https://hesh.devspace.host/api/collections/get/Author",null,null,0)
        .then((x)=>{
            console.log(x)
            this.setState({entries:x.entries})
            console.log(this.state.entries)
        })
    }
    render() {
        return (
            <div className="app-authors">
                                <Container>
            {this.state.entries.map((x,i)=>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={x.Avatar.path} />
                                <Card.Body>
                                  <Card.Title>{x.Name}</Card.Title>
                                  <Card.Text>
                                      {x.Description}
                                  </Card.Text>
                                  <Link to={"/home/"+x._id}><Button variant="primary">Go somewhere</Button></Link>
                                </Card.Body>
                              </Card>
                            </Col>
            )}
</Container>
            </div>
        )
    }
}

export default authorslist