import React from 'react';
// import { FaRegHandScissors } from "react-icons/fa";
// import { FaRegHandRock } from "react-icons/fa";
// import { FaRegHandPaper } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaHandScissors } from "react-icons/fa";
import { FaHandRock } from "react-icons/fa";
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

    function Symbol({ unitType }) {
      if (owner!==playerId)
      {
        return null;
      }
      else
      {
        if (unitType===1) {
          return <FaHandRock/>;
        }
        else if (unitType===2) {
          return <FaHandScissors/>;
        }
        else if (unitType===3) {
          return < FaHandPaper/>;
        }
        else //empty
        {
          return null;
        }
      }
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
            {/* {units}            */}
            <Symbol unitType={units}/>
        </div>
  
    )
  }
}
