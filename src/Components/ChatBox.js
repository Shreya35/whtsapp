import React,{Component} from "react";
import ChatArea from "./ChatArea"
import "../App.css";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
import {connect} from "react-redux";
import {socketRef} from "./Common/SocketIO";
import {storeAllMessages} from "./Actions/action1";
import {formatDate} from "../Components/Common/ServiceCall"
class ChatBox extends Component {
    constructor(props) {
        super(props)
        this.state={
         message:""
        }
    }
    handleChange=(e)=>{
         const name = e.target.name;
         this.setState({[name]:e.target.value})
    }
    sendMessage=()=>{
        console.log("CLICKED")
        this.setState({message:""})
        const {socket} = this.context;
        let loggedInUser = JSON.parse(localStorage.getItem('userLogin'));
         console.log("<<<loggedInUser",loggedInUser);
          
            let dateFormat = formatDate(new Date());
            console.log("<<<<dateFormat",dateFormat)
         
            this.props.dispatch(storeAllMessages({message:this.state.message,
                messageBy:loggedInUser[0]._id,
            messageTo:this.props.selectedUser._id,
        time:dateFormat}))

         
      
        socket.emit("senderReciverDetails",{
            senderDet:loggedInUser[0],
            recieverDet: this.props.selectedUser,
            message:this.state.message

        })
    }
    render() {
        return <>
       <ChatArea/>

        <div className="inputText">
        <input type="text" className="inputData" name="message" value={this.state.message} onChange={this.handleChange}/>
       
           <span><button className="btnChatBox" disabled={this.props.selectedUser===null?true:false} onClick={this.sendMessage}>Send</button></span>
               </div>
           
        </>
    }
}
ChatBox.contextType = socketRef;
const mapStateToProps=state=>{
    console.log("State-----",state);
    return {
        selectedUser: state.selectedUser
    }
}
export default connect(mapStateToProps,null)(ChatBox);