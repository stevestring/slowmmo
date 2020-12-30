import React from 'react';
import { Square2 } from './Square2';

export class Square extends React.Component{
  render(){

    return (
      <td
      onClick={this.props.handleClick} >
          <Square2 units = {this.props.units} owner = {this.props.owner} 
          color={this.props.color} selected={this.props.selected} playerId={this.props.playerId}
          mode={this.props.mode}/>
      </td>
    )
  }
}
