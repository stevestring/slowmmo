import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CompactPicker } from 'react-color';

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
          <h1>{this.props.playerID}</h1>
<Form onSubmit={this.handleSubmit}>
  <Form.Group controlId="formName">
    <Form.Label>Name</Form.Label>
    <Form.Control placeholder="Enter name" onChange={this.handleNameChange}/>
  </Form.Group>
  <Form.Group controlId="formColor">
    {/* <Form.Label>Color</Form.Label> */}
     <CompactPicker onChangeComplete={ this.handleColorChange }/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
         </div>
         
        )
    }
}