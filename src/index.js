import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from "socket.io-client";
import {socketRef} from "./Components/Common/SocketIO";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer1} from "./Components/Reducers/reducer1"
const socket = io.connect('http://localhost:3100');
console.log("Testing.....");
socket.on('connect',(data)=>{
    // console.log("the connect evenet run on server");
    let getLoggedInUser = JSON.parse(localStorage.getItem('userLogin'));
    if(getLoggedInUser!==null) {
        socket.emit('loggedInUser',{
                  loggedIn:getLoggedInUser[0]
          })
    }
    
})

const store = createStore(reducer1);

ReactDOM.render(<socketRef.Provider value={{
    socket:socket
}}><Provider store={store}><App /></Provider></socketRef.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
