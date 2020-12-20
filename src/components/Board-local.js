//import React and Square component
import React from 'react';
import { Square } from './Square';
//import { Button } from './Button';

//main board component with game logic
export class Board extends React.Component{
  constructor(props){
    super(props);

    var grid = {};    
    var x;
    var y;
    for (y=0; y<20; y++)
    {
      grid[y] = {};
      for (x=0; x<30; x++)
      {
        grid[y][x] = {units: 5, owner: 0};   
      }
    }

    grid[0][0]["owner"] = 1;
    grid[0][0]["units"] = 16;

    this.state = {
      //this sets up an empty board
      'grid':grid, 
      'mode':1, //0=Deploy, 1=AttackSource, 2=AttackTarget
      'selected': [-1,-1]
    };


    //bind this word to helper functions
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(y, x){

      const g = this.state.grid;
      const m = this.state.mode;
      const s = this.state.selected;
      //set the grid square cooresponding to the clicked square to the color of the current player
      
      //alert(x + "," + y);

      if (m===0)
      {
        g[x][y].units ++;
        this.setState({'gridUnits':g});
      }
      else if (m===1)
      {
        //make sure owned 
        if (g[y][x].owner === this.props.playerId)
        {
            this.setState({'selected':[y,x]});
            this.setState({'mode':2});  
        }
      }
      else if (m===2)
      {
        if (x===s[1] && y===s[0])//unselect
        {
            this.setState({'selected':[-1,-1]});
            this.setState({'mode':1});              
        }
        else if (g[y][x].owner !== this.props.playerId) //valid target?
        {
            if (Math.abs(x-s[1]<=1) && Math.abs(x-s[0]<=1)) //adjacent
            {
                if (Attack (s[1],s[0],x,y,g))
                {
                    g[y][x].owner = this.props.playerId;        
                    g[y][x].units = Math.floor(g[s[0]][s[1]].units/2);
                    g[s[0]][s[1]].units= g[y][x].units;//already half
                }
                else
                {
                  g[s[0]][s[1]].units = 0; //lost battle, set to 0 units
                }
                this.setState({'selected':[-1,-1]});
                this.setState({'grid':g});   
                this.setState({'mode':1});  
            }
        }
      }

      //this needs to be API
      function Attack(sourceX, sourceY, targetX, targetY,grid){
        const g = grid;
        
        //alert(unitsGrid);
        //alert("Attack:" + sourceX + "," + sourceY + "," +  targetX + "," +  targetY)

        const sScore = g[sourceY][sourceX].units * Math.random();
        const tScore = g[targetY][targetX].units * Math.random();

        //alert (sScore + ":" + tScore);

        if(sScore>tScore)
        {
            return true;
        }
        else
        {
            return false;
        }
        
      }
      //helper function for
    //   function checkDir(x_, y_, color){
    //     //track how many squares of a given color there are in a given dirention (specified by x_ and y_)
    //     //for example checkDir(0,1, 'w') checks how many white stones there are in a row to the right )
    //     let tracked = 0;
    //     let _x = x;
    //     let _y = y;
    //     //stop tracking stones when the color is not equal to the specified stone or we have gone past the edge of the board
    //     while (g[_x] !== undefined && g[_x][_y] === color){
    //       //increment the number of tracked stones
    //       tracked += 1;
    //       //increment/decrement to check the next square in the specified direction
    //       _y += y_;
    //       _x += x_;
    //     }
    //     return tracked;
    //   }
      //sum the directions (left+right, up+down, 2 diagonals)
    //   const w_horizontal = checkDir(0, 1, 'w') + checkDir(0, -1, 'w') -1;
    //   const b_horizontal = checkDir(0, 1, 'b') + checkDir(0, -1, 'b') -1;

    //   const w_vertical = checkDir(1, 0, 'w') + checkDir(-1, 0, 'w') -1;
    //   const b_vertical = checkDir(1, 0, 'b') + checkDir(-1, 0, 'b') -1;

    //   const w_diag1 = checkDir(1, 1, 'w') + checkDir(-1, -1, 'w') -1;
    //   const b_diag1 = checkDir(1, 1, 'b') + checkDir(-1, -1, 'b') -1;

    //   const w_diag2 = checkDir(1, 1, 'w') + checkDir(-1, -1, 'w') -1;
    //   const b_diag2 = checkDir(-1, 1, 'b') + checkDir(1, -1, 'b') -1;

    //   //check to see if there are any sums greater than or equal to 5 and alert the players of a win
    //   //setTimeout is called so that the alert() function does not hold up the rendering of the board.
    //   if (w_horizontal >=  5 || w_vertical >=  5 || w_diag1 >=  5 || w_diag2 >=  5){
    //     setTimeout(()=>{alert('white wins')}, 1);
    //   }

    //   if (b_horizontal >= 5 || b_vertical >= 5 || b_diag1 >= 5 || b_diag2 >= 5){
    //     setTimeout(()=>{alert('black wins')}, 1);
    //   }
    //}
  }
  render(){
    //define styles for the <table> element in the return() function below
    const style={
             textAlign: "center",
             margin:"auto",
             height: "auto",
             width:"500px",
            //  border:"1px solid black",
             tableLayout:'fixed',
             color: "white",
             //backgroundColor: "lightgrey"
           };

           
    const g = this.state.grid;
    const s = this.state.selected;
    //const u = null;
    //loop through the squares in each row and generate a new Square component,
    //passing in props to the Square component in the nested map() function
    const board = Object.keys(g).map((row, i) => { return (      
      <tr key={"row_"+i}>
        
        {Object.keys(g[row]).map((col, j) => {    
                    
          const selected_ = s[0] === i && s[1] === j;    

          //set the color of the square based on state.grid
          //const color_ = g[i][j] === '+' ? 'grey': g[i][j] === 'w' ? 'white':'black';
          //return Square component, passing in the following as props:
          //square color defined above in color_,
          //a value for the key which React needs (I think) and
          //a function to handle clicks with grid coordinates passed in as arguments
          return (
            // <Square handleClick={()=>this.handleClick(i,j)} owner={g[i][j]} units={Math.floor(Math.random()*100)} key={i+"_"+j} />
            <Square handleClick={()=>this.handleClick(i,j)} 
                owner={g[i][j].owner} units={g[i][j].units} selected={selected_} 
                key={i+"_"+j} playerId = {this.props.playerId}/>
              )
            }
          )
        }
      </tr>)
    });

    //returns the board with the Square Components in {board},
    //as well as a simple Button component that takes the handleReset function as a prop
    //this could be further refactored to separate the layout and styling, but it isn't that complicated so I will leave it like this
    return (
      <div style={{ textAlign:'center'}}>
      <h2>Slow MMO</h2>
      {/* <div style={{margin: 'auto', width:"40%"}}> */}
      <table cellSpacing="0" style={style}>
        <tbody>
          {board}
        </tbody>
      </table>
      {/* </div> */}
      <br />
      {/* <Button onClick={this.handleReset} /> */}
      </div>
    )
  }
}