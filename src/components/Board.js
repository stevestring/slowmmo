//import React and Square component
import React from 'react';
import { Square } from './Square';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Square2 } from './Square2';
import {subscribeToBoardChanges} from '../api.js';
//main board component with game logic
export class Board extends React.Component{
  constructor(props){
    super(props);
    var grid = {};    
    this.state = {
      //this sets up an empty board
      'isLoaded': false,
      'grid':grid, 
      'selected': [-1,-1],
      'showModal':false,
      'sourceUnit':0,
      'targetUnit':0,
      'targetPlayerID':0,
      'result':false      

    };

    //bind this word to helper functions
    this.handleClick = this.handleClick.bind(this);
    this.handleHide = this.handleHide.bind(this);

  }

  componentDidMount() {

      this.GetBoard();

      //subscribeToBoardChanges((message) => this.loadData(message));
      this.interval = setInterval(() => this.GetBoard(), 1000);  //Update Board  
  }

  GetBoard()
  {
    console.log ("getting board");

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

  loadData(message)
  {
    //console.log ("got ping");
    console.log(message);

    let g = this.state.grid;
    if (g.length !== 0)
    {
      try {
        g[message.y][message.x].owner=message.owner;
      }
      catch{
        console.log("grid not found");  
      }
    }

    this.setState(prevState => ({
      grid: {
        ...prevState.grid,           // copy all other key-value pairs of food object
        [message.y]: {                     // specific object of food object
          ...prevState.grid[message.y],   // copy all pizza key-value pairs
          [message.x]: {                     // specific object of food object
            ...prevState.grid[message.y][message.x],   // copy all pizza key-value pairs
            owner: [message.owner]          // update value of specific key
          }        // update value of specific key
        }
      }
    }))

    //this.setState ({grid:g});

  }

  handleHide() {
    this.setState({ showModal: false });
  }

  handleClick(y, x){

      const g = this.state.grid;
      const m = this.props.mode;
      const s = this.state.selected;
      //set the grid square cooresponding to the clicked square to the color of the current player
      
      if (m===1)
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
        if (x===s[1] && y===s[0])//switch Units (Deploy) 
        {
          console.log("Changing Unit: ["+ y + "," + x + "]");
          this.Deploy (x,y);          
          //this.setState({'grid':g});
          this.props.onDeploy();
        }
        else if (g[y][x].owner !== this.props.playerId) //valid target?
        {
            if (Math.abs(x-s[1])<=1 && Math.abs(y-s[0])<=1) //adjacent
            {
                //TODO: this should come from API
                this.setState({targetUnit:g[y][x].units});
                this.setState({sourceUnit:g[s[0]][s[1]].units});
                this.setState({targetPlayerID:g[y][x].owner});            

                //this.Attack (s[1],s[0],x,y)      
                
                this.Attack (s[1],s[0],x,y)
                .then(result=>{
                  //console.log(JSON.stringify(result));
                  //this.setState({result:true }); //who won?
                }
                );


                this.setState({'selected':[-1,-1]});
                //this.setState({'grid':g});  //is this still necessary?  Doesn't Attack do this? 
                
                

                this.setState({'showModal':true});   

                //this.setState({'mode':1});  
                this.props.onModeChange(1);
            }
        }
        else if (g[y][x].owner === this.props.playerId) //select another square
        {
          this.setState({'selected':[y,x]});
          this.props.onModeChange(2);
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
          this.props.onModeChange(1);
        }
      }

  }

  async Attack(sourceX, sourceY, targetX, targetY){
    await fetch("http://"+process.env.REACT_APP_API_SERVER+":8080/game/attack/"+this.props.playerId+"/"+sourceX+"/"+sourceY + "/" + targetX+"/"+targetY, {
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
            result: result.result===1
          });
          // console.log(result.result);
          // return result;
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
          // this.setState({
          //   //isLoaded: true,
          //   //grid: result //Could just update single square
          // });


          this.setState(prevState => ({
            grid: {
              ...prevState.grid,           // copy all other key-value pairs of food object
              [sourceY]: {                     // specific object of food object
                ...prevState.grid[sourceY],   // copy all pizza key-value pairs
                [sourceX]: {                     // specific object of food object
                  ...prevState.grid[sourceY][sourceX],   // copy all pizza key-value pairs
                  units: result[sourceY][sourceX].units          // update value of specific key
                }        // update value of specific key
              }
            }
          }))


        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // this.setState({
          //   //isLoaded: true,
          //   error
          // });
          console.log("Deploy Error: "+ error);
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
              //margin:"auto",
              //height: "auto",
              //width:"500px",
              tableLayout:'fixed',
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
                      
            const selected_ = s[0] === i && s[1] === j && this.props.mode===2;    

            let color_ = "grey";
            if ( this.props.players[g[i][j].owner] != null)
            {
                color_ = this.props.players[g[i][j].owner].color ;
            }

            //return Square component, passing in the following as props:
            //a value for the key which React needs (I think) and
            //a function to handle clicks with grid coordinates passed in as arguments
            return (
              // <Square handleClick={()=>this.handleClick(i,j)} owner={g[i][j]} units={Math.floor(Math.random()*100)} key={i+"_"+j} />
              <Square handleClick={()=>this.handleClick(i,j)} 
                  owner={g[i][j].owner} units={g[i][j].units} selected={selected_} 
                  key={i+"_"+j} playerId = {this.props.playerId} color = {color_} 
                  mode={this.props.mode}/>
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
        <div style={{ textAlign:'center'}} >
          <Modal
          show={this.state.showModal}
          //show={true}
          onHide={this.handleHide}
          // container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
            {this.state.result === true ? //First placement
                    "You won!"
                    : "You lost!"}     
              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <div style ={{color:'white', textAlign:"center"}}>
            <Row className="justify-content-md-center">
            <Square2 units = {this.state.sourceUnit} owner = {this.props.playerId} 
            color={this.props.player.color} selected={false} playerId={this.props.playerId}
            mode={0}/><span>&nbsp;</span> 
            <h4 style ={{color:'black'}}>            
            {this.state.result === true ? //First placement
                    "beats"
                    : "does not beat"}    </h4><span>&nbsp;</span> 
          <Square2 units = {this.state.targetUnit} owner = {this.props.playerId} //playerID must be same to show unit
            color={this.props.players[this.state.targetPlayerID].color} selected={false} playerId={this.props.playerId}
            mode={0}/> 
            </Row>
          </div>
           
          </Modal.Body>
          {/* <Modal.Footer>          
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer> */}
        </Modal> 


        <table style={style} class="unselectable">
          <tbody>
            {board}
          </tbody>
        </table>
        </div>
      )
    }
  }
}