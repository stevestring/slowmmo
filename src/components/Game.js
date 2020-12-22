import React from 'react';
import { Board } from './Board';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

export class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          //this sets up an empty board
          'isLoaded': false,
          //'units':0, 
          'mode':0 //0=Deploy, 1=AttackSource, 2=AttackTarget
        };   
        
        //bind this word to helper functions
        //this.handleClick = this.handleClick.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.handleDeploy = this.handleDeploy.bind(this);
      }

    handleModeChange(mode) {
      //alert(mode);
      this.setState({'mode': mode});
    }

    // //TODO bump event up
    // handleDeploy(mode) {
    //     //alert(mode);
    //     this.setState({'units': this.state.units-1});
    // }

    handleSelect(key) {      
          //alert (key);
          this.setState({ 'mode': parseInt(key) });
    }

    

    render(){

        return (<div>
          <Row>
            <Nav variant="pills" defaultActiveKey={1} onSelect={this.handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey={1}>
                  Attack
                </Nav.Link>
              </Nav.Item>                
              <Nav.Item>
                <Nav.Link eventKey={0}>Deploy <Badge variant="light">{this.props.player.units}</Badge></Nav.Link>
              </Nav.Item>
 
            </Nav>

            </Row>
            <br/>
         
          <Row>
          <Board playerId={this.props.playerID} mode={this.state.mode} onModeChange={this.handleModeChange} onDeploy={this.props.handleDeploy}/>          
         </Row>
         </div>
         
        )
    }
}