import React from 'react';

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
    
    const units = this.props.units;
    const selected = this.props.selected;
    const owner = this.props.owner;
    const playerId = this.props.playerId;

    let color_ = "black";
    if ( this.props.players[this.props.owner] != null)
    {
        color_ = this.props.players[this.props.owner].color ;
    }
    let borderColor_ = color_;
    let cursor_ = "default";

    if (this.props.mode===3)
    {
        if (owner===0)
        {
            cursor_ = "pointer";        
        }
    }
    else
    {
        if (owner===playerId)
        {
            cursor_ = "pointer";        
        }
    }

    if (selected)
    {
        borderColor_ = "yellow";
    }
    return (
      <td
        style={{
          //overflow:'hidden',
          //width:'25px',
          //height:'25px',
          //border:"2px solid white" ,

        }}
      onClick={this.props.handleClick} >
        <div
          style={{
                //   color:color_,
                  border:"2px solid",                
                  backgroundColor: color_,
                  borderColor: borderColor_,
                  width: "2vw",
                  height:"2vw",
                  cursor: cursor_ }} >
            {units}           
        </div>
      </td>
    )
  }
}
