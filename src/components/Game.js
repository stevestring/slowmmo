import React from 'react';
import { Board } from './Board';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Square2 } from './Square2';
export class Game extends React.Component{

    constructor(props){
        super(props);

        console.log("player: "+JSON.stringify(this.props.player));

        this.state = {
          //this sets up an empty board
          'isLoaded': false,
          //'mode':m //0=Deploy, 1=AttackSource, 2=AttackTarget, 3=FirstDeployment
        };   

        this.handleSelect = this.handleSelect.bind(this);
      }



    handleSelect(key) {      
          //alert (key);
          this.setState({ 'mode': parseInt(key) });
    }
    

    render(){

      const Leaderboard = Object.keys(this.props.players).map((keyName) => (
        <tr>
        <td><Square2  owner={this.props.players[keyName].playerID} color={this.props.players[keyName].color}/></td>
        <td>{this.props.players[keyName].name}</td>
        <td>{this.props.players[keyName].score}</td>
        <td>{this.props.players[keyName].kills}</td>
        <td>{this.props.players[keyName].killed}</td>
        <td>{this.props.players[keyName].squares}</td>
        </tr>
    ))


        return (<div>           
            <Row className="justify-content-md-center">
<Square2  owner={this.props.playerID} color={this.props.player.color}/>
<span>&nbsp;</span> 
<h2 style={{float:"left"}} >{this.props.player.name}</h2>
<div style={{clear:"both"}}></div></Row>

<Row>
                {this.props.mode ===3 ? //First placement
                    <h4>Choose any grey square to begin...</h4>
                    : <br/>}              
            
            </Row>
      
          <br/>
          <Row>
          <Col xl={11}>

          <Board playerId={this.props.playerID} mode={this.props.mode} 
            onModeChange={this.props.onModeChange} onDeploy={this.props.onDeploy}
            player ={this.props.player} players = {this.props.players}/>   
            </Col>
            <Col xl={1}>
              <Table size="sm" borderless={ true }>
  <thead>
    <tr>
      <th>Color</th>
      <th>Name</th>
      <th>Score</th>
      <th>Kills</th>
      <th>Killed</th>
      <th>Squares</th>
    </tr>
  </thead>
  <tbody>
    {Leaderboard}
  </tbody>
</Table>
            </Col>
         </Row>
         </div>
         
        )
    }
}