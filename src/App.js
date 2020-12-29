
import React from 'react';
import { Game } from './components/Game';
import { Lobby } from './components/Lobby';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        'isLoaded': false,
        'playerID': '', //should be player object
        'player':{playerID: 0, units:0},
        'mode':1, //0=Idle, 1=AttackSource, 2=AttackTarget, 3=FirstDeployment
        'players':{},
      };   
      
      this.handleSelect = this.handleSelect.bind(this);
      this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
      this.handleDeploy = this.handleDeploy.bind(this);
      this.handleModeChange = this.handleModeChange.bind(this);

    }
    //Need to set selected to null if not mode = 1
    handleModeChange(mode) {
      //alert(mode);
      this.setState({'mode': parseInt( mode)});
      
    }
    handleDeploy() {
        // alert(mode);

        var player = this.state.player;
        player.units = player.units -1 ;

        // if (player.squares===0) //Maybe not the best place for this
        // {
        //     player.squares=1;
        // }

        //console.log(player.units);
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

            
            if (result !=='')
            {
              //alert (result);
            this.setState({
              isLoaded: true,
              player: result})

              if (result.squares===0)
              {
                this.setState({'mode':3});
              }

            }
            else
            {
              console.log("player: "+ playerID + " not found");
              this.setState({
                isLoaded: true,
                playerID:'',
              })            
            }   

          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error              
            });
            //alert (error);
          }
        )

        console.log(this.state.player);
    }

    componentDidMount() {   
      let id = '';
      if (localStorage.getItem('playerID')!= null)
      {
        id = parseInt(localStorage.getItem('playerID'));
        console.log ("got id ("+id+") from localStorage");
        this.setState ({'playerID':id});
      }

      //alert (id);
      this.GetPlayer(id);
      console.log ("got player ("+id+"):"+ JSON.stringify(this.state.player));

      // console.log (JSON.stringify(this.state.player));
      // if (this.state.player.playerID ===0)
      // {
      //   this.setState({'playerID': ''});
      //   localStorage.removeItem('playerID');  //is this actually necessary?
      // }

      this.GetPlayers();

      

      this.interval = setInterval(() => this.GetPlayer(this.state.playerID), 5000);  //Update Units    
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
      <Navbar 
      // bg="dark" variant="dark"
      >
      
      <Navbar.Brand href="#home">Slow MMO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">About</Nav.Link>
          <Nav.Link href="#home">Blog</Nav.Link>
        </Nav>     
        {/* <Square2 owner={this.state.playerID} players={this.state.players}/>  */}
      <Nav onSelect={this.handleSelect}>
            {/* <NavDropdown title={this.state.player.name} id="player-dropdown" className="justify-content-end" 
              onSelect={this.handleSelect} >
                <NavDropdown.Item eventKey={1}>Logout</NavDropdown.Item>
          </NavDropdown>    */}
            <Nav.Link eventKey={1}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
    </Navbar>
{/* <br/> */}
    <Container>      
      {this.state.playerID !=='' ?
      <Game playerID={this.state.playerID} mode ={this.state.mode} player = {this.state.player} 
      onDeploy={this.handleDeploy} players={this.state.players} onModeChange = {this.handleModeChange}/>
      : <Lobby onPlayerSelect={this.handleSelectPlayer}/>}  
    </Container>
    </div>
  );
}
}
export default App;