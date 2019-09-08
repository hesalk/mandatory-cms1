import React, { Component } from 'react';
import MDReactComponent from 'markdown-react-js';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import test from './getfunc'

const queryString = require('query-string');

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {entries:[],current: this.props.match.params.page || 1,total:0,hash:1}
        this.getitems = this.getitems.bind(this);
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
        test(2,2)
        this.getitems(3,3 * (this.props.match.params.page - 1));
        console.log(this.props.location)
        let skip = this.props
        console.log(skip)
        let p = queryString.parse(this.props.location.search);
        console.log(p.page)
    }

    componentDidUpdate(prevProps, nextState) {
        if (prevProps.match.params.page !== this.props.match.params.page) {
            this.getitems(3, 3 * (this.props.match.params.page - 1));
        }
    }

    onChange = (page) => {
        this.props.history.push("/home/page/" + page);
        this.setState({
          current: page,
        });
        let range = (page-1)*3
        console.log(range)
        this.getitems(3,range)
        this.props.location.search = "?page=3"
        console.log(this.props)
      }
      
    render(){
        console.log("page", this.props.match.params.page, this.state.current);
        
        return(
            <div className="cards-container">
                <Container>
  <Row>
            {this.state.entries.map((x,i)=>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="" />
                                <Card.Body>
                                  <Card.Title>{x.Title}</Card.Title>
                                  <Card.Text>
                                     
                                     <footer className="blockquote-footer">
                                      <cite title="Source Title">{x.Auther[0].display}</cite>
                                      <Card.Footer className="text-muted">{x.Date}</Card.Footer>
                                        </footer>
                                  </Card.Text>
                                  <Link to={"/home/"+x._id}><Button variant="primary">Read the articel</Button></Link>
                                </Card.Body>
                              </Card>
                            </Col>
            )}
  </Row>
</Container>
                <Pagination onChange={this.onChange} current={parseInt(this.props.match.params.page)} total={this.state.total} defaultPageSize={3} />
            </div>
        )
    }
}

export default home