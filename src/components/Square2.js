import React from 'react';

export class Square2 extends React.Component{
  render(){
    
    const units = this.props.units;
    const selected = this.props.selected;
    const owner = this.props.owner;
    const playerId = this.props.playerId;
    let color_ = this.props.color;

    // let color_ = "white";
    // if ( this.props.players[this.props.owner] != null)
    // {
    //     color_ = this.props.players[this.props.owner].color ;
    // }

    let border_;
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
        console.log ("cell selected");
        //borderColor_ = "yellow";
        border_ = "2px solid white"; 
    }
    return (

        <div
          style={{
            float:"left",
                  padding:"1px solid",                
                  backgroundColor: color_,
                  //borderColor: borderColor_,
                  border: border_,
                  width:"2vw",
                  height:"2vw",
                  fontSize: "1vw",
                  cursor: cursor_ }} >
            {units}           
        </div>
  
    )
  }
}
