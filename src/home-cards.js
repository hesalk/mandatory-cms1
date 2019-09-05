import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import MDReactComponent from 'markdown-react-js';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {entries:[],current: 1,total:0}
        this.getitems = this.getitems.bind(this)
    }
    getitems(l,s){
        fetch('https://hesh.devspace.host/api/collections/get/Articels', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                //filter: {published:true},
                //fields: {fieldA: 1, fieldB: 1},
                limit: l,
                skip: s,
                //sort: {_created:-1},
                //populate: 1, // resolve linked collection items
                //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
            })
        })
        .then(res=>res.json())
        .then(res => {
          console.log(res)
          this.setState({entries:res.entries,total:res.total})
          console.log(this.state.total)
          }
          );
    }
    componentDidMount(){
        this.getitems(3,0)
    }
    onChange = (page) => {
        console.log(page);
        this.setState({
          current: page,
        });
        let range = (page-1)*3
        console.log(range)
        this.getitems(3,range)
        console.log(this.props.match.params)

      }
    render(){
        return(
            <div className="cards-container">
                <Container>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container>
                <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
                <ul>
                {this.state.entries.map((x,i) => 
                <>
                <ol>
                <p>{i}</p>
                <p>{x.Title}</p>
                <MDReactComponent text={x.Body} />
                </ol>
                </>
                )}
                </ul>
                <Pagination onChange={this.onChange} current={this.state.current} total={this.state.total} defaultPageSize={3} />;
            </div>
        )
    }
}

export default home