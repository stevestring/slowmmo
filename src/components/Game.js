import React from 'react';
import { Board } from './Board';
import Row from 'react-bootstrap/Row';
import { BoardNav } from './BoardNav';
export class Game extends React.Component{

    constructor(props){
        super(props);
        let m = 1
        if (this.props.player.squares===0)
        {
            m=3;
        }

        this.state = {
          //this sets up an empty board
          'isLoaded': false,
          'mode':m //0=Deploy, 1=AttackSource, 2=AttackTarget, 3=FirstDeployment
        };   
        
        //alert (JSON.stringify(this.props.player));

        //bind this word to helper functions
        //this.handleClick = this.handleClick.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.handleDeploy = this.handleDeploy.bind(this);
      }

    handleModeChange(mode) {
      //alert(mode);
      this.setState({'mode': parseInt( mode)});
    }

    handleSelect(key) {      
          //alert (key);
          this.setState({ 'mode': parseInt(key) });
    }
    

    render(){

        return (<div>
            
            <h1 style={{color:this.props.player.color}}>Name:{this.props.player.name}</h1>    
            <h1>{this.state.mode}</h1>
                {/* <h1 style={{color:this.props.player.color}}>{this.props.playerID}</h1>   */}
                
                {this.state.mode ===3 ?
                    <h2>Choose your first placement (any gray square)</h2>
                    : <BoardNav onModeChange={this.handleModeChange} player={this.props.player}/>}              
            <br/>
         
          <Row>
          <Board playerId={this.props.playerID} mode={this.state.mode} 
            onModeChange={this.handleModeChange} onDeploy={this.props.onDeploy} player ={this.props.player} players = {this.props.players}/>          
         </Row>
         </div>
         
        )
    }
}