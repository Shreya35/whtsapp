// import io from "socket.io-client";
// const socket = io.connect('http://localhost:3100');

// socket.on("connect",(data)=>{
//     console.log(" the connect event ran");
//     socket.emit("check","Hello emied wgen listened");
// });

// export default socket;

import React from "react";
export const socketRef = React.createContext();
