import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
       <Route path="/" exact component={SignUp}/>
       <Route path="/login"  component={Login}/>
       <Route path="/home" component={Home}/>
    </Router>
    
  );
}

export default App;
