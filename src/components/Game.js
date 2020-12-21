import React, { Fragment } from 'react';
import { Board } from './Board';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
export class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          //this sets up an empty board
          'isLoaded': false,
          'playerID':1, 
          'units':0, 
          'mode':0 //0=Deploy, 1=AttackSource, 2=AttackTarget
        };   
        
        //bind this word to helper functions
        this.handleClick = this.handleClick.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
      }

    handleModeChange(mode) {
      //alert(mode);
      this.setState({'mode': mode});
    }

    handleClick(x){  
        //alert (x);
        this.setState({'playerID':x});
        //alert (this.state.playerID);
    }

    handleSelect(key) {      
          //alert (key);
          this.setState({ 'mode': parseInt(key) });
    }

    GetPlayer()
    {
      fetch("http://localhost:8080/game/player/"+this.props.playerId,{
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
              units: result
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
    }

    componentDidMount() {
      this.GetPlayer();        
    }

    render(){
        const style={
            margin:"auto",
            height: "auto",
            //width:"500px",
            //tableLayout:'fixed',
            color: "white",
          };

        return (<div>
          <Row>
            <Nav variant="pills" defaultActiveKey={0} onSelect={this.handleSelect}>
              <Nav.Item>
                <Nav.Link eventKey={0}>Deploy <Badge variant="light">{this.state.units}</Badge></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={1}>
                  Attack
                </Nav.Link>
              </Nav.Item>   
            </Nav>
            <Nav>
            <NavDropdown title="Player" id="player-dropdown" className="justify-content-end">
                <NavDropdown.Item eventKey={1}>Player 1</NavDropdown.Item>
                <NavDropdown.Item eventKey={2}>Player 2</NavDropdown.Item>
                <NavDropdown.Item eventKey={3}>Player 3</NavDropdown.Item>
                <NavDropdown.Item eventKey={4}>Player 4</NavDropdown.Item>
          </NavDropdown>   
            </Nav>
            </Row>
            <br/>
            {/* <Col>
              <div style={{ textAlign:'center'}}>
          <table cellSpacing="0" style={style}>
            <tbody>
                <tr>
              <Square owner={1} handleClick={()=>this.handleClick(1)} selected={this.state.playerID===1}/>
              <Square owner={2} handleClick={()=>this.handleClick(2)} selected={this.state.playerID===2}/>
              <Square owner={3} handleClick={()=>this.handleClick(3)} selected={this.state.playerID===3}/>
              <Square owner={4} handleClick={()=>this.handleClick(4)} selected={this.state.playerID===4}/>
              <Square owner={5} handleClick={()=>this.handleClick(5)} selected={this.state.playerID===5}/>
            </tr>
            </tbody>
          </table>
          </div>
          </Col> */}
          
          <Row>
          <Board playerId={this.state.playerID} mode={this.state.mode} onModeChange={this.handleModeChange}/>
          
         </Row>
         </div>
         
        )
    }
}