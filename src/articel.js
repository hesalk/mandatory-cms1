import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import MDReactComponent from 'markdown-react-js';



class articels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: {Body:""}
        }
        this.id = props.match.params.id
    }
    componentDidMount() {
        console.log("artice loded")
        console.log(this.id)
        fetch('https://hesh.devspace.host/api/collections/get/Articels', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter: {
                    _id: this.id
                },
                    //fields: {fieldA: 1, fieldB: 1},
                    limit: 1,
                    skip: 0,
                    // sort: {_created:-1}, populate: 1, // resolve linked collection items lang:
                    // 'de' // return normalized language fields (fieldA_de => fieldA)
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({entries:res.entries[0]})
                console.log(this.state.entries)
            });
    }
    render() {
        return (
            <div className={"articel-page"}>
                <Card className="text-center">
                    <Card.Header>Articel</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.entries.Title}</Card.Title>
                        <Card.Text>
                        <MDReactComponent text={this.state.entries.Body} />
                        </Card.Text>
                        <footer className="blockquote-footer">
                                     Auther <cite title="Source Title">{}</cite>
                                        </footer>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{this.state.entries.Date}</Card.Footer>
                </Card>
            </div>
        )
    }
}

export default articels