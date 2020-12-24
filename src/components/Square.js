import React from 'react';
import { Square2 } from './Square2';
export const PlayerColors = {
    0: "lightgrey",
    1: "lightblue",
    2: "orange",   
    3: "pink",
    4: "lightgreen",
    5: "lavender"
}

export class Square extends React.Component{
  render(){

    return (
      <td
        style={{
          //overflow:'hidden',
          //width:'25px',
          //height:'25px',
          //border:"2px solid white" ,

        }}
      onClick={this.props.handleClick} >
          <Square2 units = {this.props.units} owner = {this.props.owner} 
          color={this.props.color} selected={this.props.selected} playerId={this.props.playerId}
          mode={this.props.mode}/>
      </td>
    )
  }
}
