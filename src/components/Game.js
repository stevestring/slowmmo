import React from 'react';
import { Board } from './Board';
import Row from 'react-bootstrap/Row';
import { BoardNav } from './BoardNav';
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
        
        //alert (JSON.stringify(this.props.player));

        //bind this word to helper functions
        //this.handleClick = this.handleClick.bind(this);
        //this.handleModeChange = this.handleModeChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.handleDeploy = this.handleDeploy.bind(this);
      }



    handleSelect(key) {      
          //alert (key);
          this.setState({ 'mode': parseInt(key) });
    }
    

    render(){

        return (<div>           
            <Row className="justify-content-md-center">
<Square2  owner={this.props.playerID} color={this.props.player.color}/>
<span>&nbsp;</span> 
<h2 style={{float:"left"}} >{this.props.player.name}</h2>
<div style={{clear:"both"}}></div></Row>

<Row>
                {this.props.mode ===3 ? //First placement
                    <h4>Choose any grey square to begin...</h4>
                    : <BoardNav onModeChange={this.props.onModeChange} player={this.props.player} mode={this.props.mode}/>}              
            
            </Row>
      
          <br/>
          <Row 
        //   className="justify-content-md-center"
          >
              
          <Board playerId={this.props.playerID} mode={this.props.mode} 
            onModeChange={this.props.onModeChange} onDeploy={this.props.onDeploy}
            player ={this.props.player} players = {this.props.players}/>          
         </Row>
         </div>
         
        )
    }
}