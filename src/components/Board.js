//import React and Square component
import React from 'react';
import { Square } from './Square';


//main board component with game logic
export class Board extends React.Component{
  constructor(props){
    super(props);
    var grid = {};    
    this.state = {
      //this sets up an empty board
      'isLoaded': false,
      'grid':grid, 
      'selected': [-1,-1]
      
    };

    //bind this word to helper functions
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game",{
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      //mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            grid: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      
  }



  handleClick(y, x){

      const g = this.state.grid;
      const m = this.props.mode;
      const s = this.state.selected;
      //set the grid square cooresponding to the clicked square to the color of the current player
      
      //console.log(m===0);
      if (m===0)
      {
        
        if (g[y][x].owner !== this.props.playerId )
        {
          console.log(g[y][x].owner +" != " + this.props.playerId);
          // console.log(g[y][x].owner === '7');
          // console.log(this.props.playerId === '7');
        }
        else
        {
          if (g[y][x].units>98 )
          {
            console.log("["+ x + "," + y + "] is maxed out");
          }
          else if (this.props.player.units<1)
          {
            console.log("No units to deploy");
          }
          else
          {
            console.log("adding units: ["+ x + "," + y + "]");
            this.Deploy (x,y);          
            this.setState({'grid':g});
            this.props.onDeploy();
          }
        }
      }
      else if (m===1)
      {
        //make sure owned 
        console.log("selecting: "+this.props.playerId) ;
        if (g[y][x].owner === this.props.playerId)
        {
            this.setState({'selected':[y,x]});
            //this.setState({'mode':2});  
            this.props.onModeChange(2);
        }
      }
      else if (m===2)
      {
        if (x===s[1] && y===s[0])//unselect
        {
            this.setState({'selected':[-1,-1]});
            //this.setState({'mode':1});          
            this.props.onModeChange(1);    
        }
        else if (g[y][x].owner !== this.props.playerId) //valid target?
        {
            if (Math.abs(x-s[1]<=1) && Math.abs(y-s[0]<=1)) //adjacent
            {
                this.Attack (s[1],s[0],x,y)

                this.setState({'selected':[-1,-1]});
                this.setState({'grid':g});   
                
                //this.setState({'mode':1});  
                this.props.onModeChange(1);
            }
        }
      }
      else if (m===3)//first placement
      {
        if (g[y][x].owner === 0) //Can't be owned, must be grey
        {

          console.log("claiming: ["+ x + "," + y + "]");
          this.Claim (x,y);          
          this.setState({'grid':g});
          this.props.onDeploy();
          this.props.onModeChange(0);
        }
      }

  }

  Attack(sourceX, sourceY, targetX, targetY){
    fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/attack/"+this.props.playerId+"/"+sourceX+"/"+sourceY + "/" + targetX+"/"+targetY, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            grid: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  //decrement units on deploy
  Deploy(sourceX, sourceY){
    fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/deploy/"+this.props.playerId+"/"+sourceX+"/"+sourceY , {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            grid: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


Claim(sourceX, sourceY){
  fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/claim", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'pId': this.props.playerId,
      'x1': sourceX,
      'y1': sourceY
    })
  })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          grid: result
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
}

  render(){
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      //define styles for the <table> element in the return() function below
      const style={
              //textAlign:"center",
              margin:"auto",
              height: "auto",
              width:"500px",
              //tableLayout:'fixed',
              color: "white",
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

            //return Square component, passing in the following as props:
            //a value for the key which React needs (I think) and
            //a function to handle clicks with grid coordinates passed in as arguments
            return (
              // <Square handleClick={()=>this.handleClick(i,j)} owner={g[i][j]} units={Math.floor(Math.random()*100)} key={i+"_"+j} />
              <Square handleClick={()=>this.handleClick(i,j)} 
                  owner={g[i][j].owner} units={g[i][j].units} selected={selected_} 
                  key={i+"_"+j} playerId = {this.props.playerId} players = {this.props.players}/>
                )
              }
            )
          }
          
        </tr>
        )
      });

      //returns the board with the Square Components in {board},
      //as well as a simple Button component that takes the handleReset function as a prop
      //this could be further refactored to separate the layout and styling, but it isn't that complicated so I will leave it like this
      return (
        <div style={{ textAlign:'center'}}>
        <table cellSpacing="0" style={style}>
          <tbody>
            {board}
          </tbody>
        </table>
        <br />
        {/* <Button onClick={this.handleReset} /> */}
        </div>
      )
    }
  }
}