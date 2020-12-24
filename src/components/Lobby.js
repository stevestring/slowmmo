import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CompactPicker } from 'react-color';
import { CirclePicker } from 'react-color';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Square2 } from './Square2';

export class Lobby extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          //this sets up an empty board
          name:'',
          color:'black'
        };   
        
        //bind this word to helper functions
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleColorChange = (color) => {
        console.log("setting color: "+color.hex);
        this.setState({ color: color.hex });
      };

    handleSubmit = (event) => {
      //const form = event.currentTarget;
      // if (form.checkValidity() === false) {
      this.CreatePlayer(this.state.name, this.state.color)
      .then(player=>{
        this.props.onPlayerSelect(player.playerID);
      }
      );
      event.preventDefault();
    };

    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

    async CreatePlayer(name, color)
    {

        const response = await fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/player",{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'color': color
        })
      })
      
      const player = await response.json();
      console.log(player);
      return player;
    }

    render(){

        return (<div>
          <h1>Welcome! Choose your name and color</h1>
          <br/>
          {/* <h3>Choose your name and color</h3> */}
          <br/>


<Form onSubmit={this.handleSubmit}>

<Form.Group as={Row} controlId="formResult">
  <Form.Label column sm="1">Preview</Form.Label>
    <Col sm="5">
    <Square2 color={this.state.color}/>
<span>&nbsp;&nbsp;</span> 
<h2 style={{float:"left"}} >{this.state.name}</h2>
<div style={{clear:"both"}}></div>
    </Col>   

  </Form.Group>
  <Form.Group as={Row} controlId="formName">
    <Form.Label column sm="1">Name</Form.Label>
    <Col sm="5">
      <Form.Control required placeholder="Enter name" onChange={this.handleNameChange}/>
    </Col>    
  </Form.Group>
  <Form.Group as={Row} controlId="formColor">
  <Form.Label column sm="1">Color</Form.Label>
    <Col sm="5">
      <CirclePicker required onChangeComplete={ this.handleColorChange }/>
    </Col>    

  </Form.Group>



  <br/>
  {/* <Row>
  <Square2 color={this.state.color}/>
<span>&nbsp;</span> 
<h2 style={{float:"left"}} >{this.state.name}</h2>
<div style={{clear:"both"}}></div>
</Row> */}
<hr/>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
         </div>
         
        )
    }
}