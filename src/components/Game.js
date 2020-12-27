import React from 'react';
import { Board } from './Board';
import Row from 'react-bootstrap/Row';
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