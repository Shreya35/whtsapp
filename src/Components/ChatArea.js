import React,{Component} from "react";
import {connect} from "react-redux";
import {socketRef} from './Common/SocketIO';
import { makeServiceCall,formatDate } from "../Components/Common/ServiceCall";
import {storeAllMessages} from "./Actions/action1";

import '../App.css';
class ChatArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            userLogin:''
           
        }  
    }
    componentWillMount() {
        let loggedInUser = JSON.parse(localStorage.getItem('userLogin'));
        console.log("*******",loggedInUser);
        if(loggedInUser!==null) {
            this.setState({userLogin:loggedInUser[0]._id})
        }
        
        const {socket} = this.context;
        socket.on("messages",(data)=>{
        console.log("<<<data messages",data);
        let dateFormat = formatDate(new Date());
            
        this.props.dispatch(storeAllMessages({message:data.mess,messageBy:data.sender._id,messageTo:data.reciever._id
        ,time:dateFormat}))
        let fetchInfo = {
            body:{
                message:data.mess,
                messageBy:data.sender._id,
                messageTo: data.reciever._id,
                time:dateFormat
                  
            },
            url:"http://localhost:3100/mess/saveMessages",
            method:"POST"

        }
        makeServiceCall(fetchInfo,(data)=>{
            console.log("messages after saving in the backened",data);
        })   
        
    })
    }

    componentDidMount() {
        if(this.props.selectedUserData!==null) {
            let fetchInfo = {
                method:'GET',
                url:"http://localhost:3100/mess/getMessages"
            }
            makeServiceCall(fetchInfo,(data)=>{
                console.log("all Messages-------",data);
                let messageArr = [];
                data.map(message=>{
                    // console.log("MESSAGE",message.message)
                 this.props.dispatch(storeAllMessages(message))
                });
            })
 
        }
                    
       
    }

    render() {
        console.log("selectedUserData",this.props.selectedUserData)
        return ( 
    
            
            <div className="chatArea">
            Message sent to: {this.props.selectedUserData?this.props.selectedUserData.username:""}
            {this.props.messages&&this.props.messages.map((message,index)=>{
                console.log("<<<<MeSsAge+++",message)
                return ( <>
                <div className={message.messageBy===this.state.userLogin?"senderStyle":"recieverStyle"}>
                <h3 key={index}>{message.message}</h3>
                 <span >{message.time}</span>
                 </div>
                 </>
                )

                   
            })}
           </div>
        )
    }
}
ChatArea.contextType = socketRef;
const mapStateToProps = state =>{
    console.log("STATE IN CHAT AREA",state);

        return {
            selectedUserData:state.selectedUser?state.selectedUser:null,
            messages: state.messages
        
        }
    
   
    
}
export default connect(mapStateToProps,null)(ChatArea);