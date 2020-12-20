import React, { Fragment } from 'react';
import { Board } from './Board';
import { Square } from './Square';

export class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          //this sets up an empty board
          'isLoaded': false,
          'playerID':1, 
        };   
        
        //bind this word to helper functions
        this.handleClick = this.handleClick.bind(this);

      }

    handleClick(x){  
        //alert (x);
        this.setState({'playerID':x});
        //alert (this.state.playerID);
    }

    render(){

        const style={
            //textAlign:"center",
            margin:"auto",
            height: "auto",
            //width:"500px",
            //tableLayout:'fixed',
            color: "white",
          };

        return (<div>

            <h2>Slow MMO</h2>
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
        <br/>

         <Board playerId={this.state.playerID}/>
         </div>
         </div>
         
        )
    }
}