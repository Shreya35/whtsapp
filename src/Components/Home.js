import React,{Component} from "react";
import '../App.css';
import AvailableUsers from "./AvailableUsers";
import ChatBox from "./ChatBox";
import { socketRef } from "./Common/SocketIO";
class Home extends Component {

  componentWillMount() {
      console.log(" tis ",this.context);
      const {socket} = this.context;
      socket.emit("check","helooo from home pafe");
      let checkLoggedIn = JSON.parse(localStorage.getItem("userLogin"));
      // // console.log("<<<checkLoggedIn",checkLoggedIn);
      if(checkLoggedIn!==null) {
        socket.emit('loggedInUser',{
            loggedIn:checkLoggedIn[0]
        })
      }
     
      if(checkLoggedIn===null) {
          this.props.history.push('/login');
      }
  }
    render() {
        return (
            <>
            <div className="chatContainer">
                   <div className="availableUsers">
                    <AvailableUsers/>
                   </div>
                  <div className="chatbox">
                    <ChatBox/>
                  </div>
            </div>
           
            </>
        )
    }
}

Home.contextType = socketRef;
export default Home;