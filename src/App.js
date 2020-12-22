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
        'playerID':1, //should be player object
        'player':{playerID: 1, units:0}
      };   
      
      this.handleSelect = this.handleSelect.bind(this);
      this.handleDeploy = this.handleDeploy.bind(this);
    }

    handleDeploy() {
        //alert(mode);
        this.setState({'player': {playerID:this.state.playerID, units:this.state.units-1}});
    }

    GetPlayer()
    {
      //alert("Getting Player Data");

      fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/player/"+this.state.playerID,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(res => res.json())
        .then(
          (result) => {            
            this.setState({
              isLoaded: true,
              player: {playerID: this.state.playerID, units:result.units}
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

        console.log(this.state.player);
    }

    componentDidMount() {
      this.GetPlayer();
      this.interval = setInterval(() => this.GetPlayer(), 5000);      
    }  
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

  handleSelect(key) {      
    //alert (key);
    this.setState({ 'playerID': parseInt(key) });
    this.GetPlayer();
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
      <Game playerID={this.state.playerID} player = {this.state.player} onDeploy={this.handleDeploy}/>
      </Container>
    </div>
  );
}
}
export default App;