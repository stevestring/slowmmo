import openSocket from 'socket.io-client';
var socketurl = process.env.REACT_APP_API_SERVER;

const  socket = openSocket(socketurl+":8080");

//Subscribe to socketIO room updates 
//TODO: Look into namespaces and rooms instead of prefix
function subscribeToBoardChanges(cb) {
    console.log("adding socket listener - should only see once");
    socket.on("board", message => cb(message));
    // socket.emit('subscribeToBoardChanges');
  }
export   {subscribeToBoardChanges};


//Subscribe to socketIO room updates 
//TODO: Look into namespaces and rooms instead of prefix
function subscribeToPlayerChanges(playerID, cb) {
  socket.on("player-"+playerID, callBack => cb());
  socket.emit('subscribeToPlayerChanges', playerID);
}
export   {subscribeToPlayerChanges};