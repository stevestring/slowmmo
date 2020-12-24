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
            
            {/* <h1 className="text-center">
                {this.props.player.name}
            </h1>     */}
            {/* <h1>{this.props.mode}</h1> */}

                {this.props.mode ===3 ? //First placement
                    <h3>Choose your first placement (any gray square)</h3>
                    : <BoardNav onModeChange={this.props.onModeChange} player={this.props.player} mode={this.props.mode}/>}              
            <br/>
         
          <Row>
          <Board playerId={this.props.playerID} mode={this.props.mode} 
            onModeChange={this.props.onModeChange} onDeploy={this.props.onDeploy}
            player ={this.props.player} players = {this.props.players}/>          
         </Row>
         </div>
         
        )
    }
}