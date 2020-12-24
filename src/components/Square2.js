import React from 'react';

export class Square2 extends React.Component{
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

        <div
          style={{
                  border:"2px solid",                
                  backgroundColor: color_,
                  borderColor: "#FFFFFF",
                  width:25,
                  height:25,
                  cursor: cursor_ }} >
            {units}           
        </div>
  
    )
  }
}
