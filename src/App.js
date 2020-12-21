import './App.css';
import React from 'react';
import { Game } from './components/Game';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Square} from './components/Square';

class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        'isLoaded': false,
        'playerID':1 //should be player object
      };   
      
      this.handleSelect = this.handleSelect.bind(this);
    }

  handleSelect(key) {      
    //alert (key);
    this.setState({ 'playerID': parseInt(key) });
  }

  render() {
  return (
    <div className="App">      
      <Navbar bg="dark" variant="dark">
      
      <Navbar.Brand href="#home">Slow MMO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>      
      <Nav>
            <NavDropdown title="Player" id="player-dropdown" className="justify-content-end" 
              onSelect={this.handleSelect} defaultActiveKey={this.state.playerID} >
                <NavDropdown.Item eventKey={1}><Square owner={1} selected={this.state.playerID===1}/></NavDropdown.Item>
                <NavDropdown.Item eventKey={2}><Square owner={2} selected={this.state.playerID===2}/></NavDropdown.Item>
                <NavDropdown.Item eventKey={3}><Square owner={3} selected={this.state.playerID===3}/></NavDropdown.Item>
                <NavDropdown.Item eventKey={4}><Square owner={4} selected={this.state.playerID===4}/></NavDropdown.Item>
          </NavDropdown>   
            </Nav>
            </Navbar.Collapse>
    </Navbar>
<br/>
    <Container>
      <Game playerID={this.state.playerID}/>
      </Container>
    </div>
  );
}
}
export default App;