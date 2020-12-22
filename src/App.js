import './App.css';
import React from 'react';
import { Game } from './components/Game';
import { Lobby } from './components/Lobby';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        'isLoaded': false,
        'playerID':parseInt(localStorage.getItem('playerID')) || '', //should be player object
        'player':{playerID: 0, units:0},
        'mode':0, //0=lobby, 1==game,
        'players':{},
      };   
      
      this.handleSelect = this.handleSelect.bind(this);
      this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
      this.handleDeploy = this.handleDeploy.bind(this);
    }

    handleDeploy() {
        // alert(mode);

        var player = this.state.player;
        player.units = player.units-- ;
        this.setState({'player':player});

        //this.setState({'player': {playerID:this.state.playerID, units:this.state.player.units-1}});
    }

    GetPlayers()
    {

      fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/players/",{
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
              players: result
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

        console.log(this.state.players);
    }


    GetPlayer(playerID)
    {
      //alert("Getting Player Data: "+ playerID);

      fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/player/"+playerID,{
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
              player: result
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
      this.GetPlayer(this.state.playerID);
      this.GetPlayers();
      // if (this.state.player.squares===0)
      // {
      //   this.setState('mode',3);
      // }
      //this.interval = setInterval(() => this.GetPlayer(), 5000);  //Update Units    
    }  
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

  handleSelectPlayer(id) {          
    //alert (id);
    this.setState({ 'playerID': parseInt(id) });
    localStorage.setItem('playerID', parseInt(id));
    this.GetPlayer(id);
    this.GetPlayers()//make sure new user added to collection
  }

  handleSelect(id) {          
    //alert (id);
    this.setState({ 'playerID': ''});
    localStorage.removeItem('playerID');   
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
              onSelect={this.handleSelect} >
                <NavDropdown.Item eventKey={1}>Logout</NavDropdown.Item>
          </NavDropdown>   
            </Nav>
            </Navbar.Collapse>
    </Navbar>
<br/>
    <Container>      
      {this.state.playerID !=='' ?
      <Game playerID={this.state.playerID} player = {this.state.player} onDeploy={this.handleDeploy} players={this.state.players}/>
      : <Lobby onPlayerSelect={this.handleSelectPlayer}/>}  
    </Container>
    </div>
  );
}
}
export default App;