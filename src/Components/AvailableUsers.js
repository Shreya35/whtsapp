import React,{Component} from "react";
import {makeServiceCall} from "./Common/ServiceCall";
import {addSelectedItem,messagesArray} from "./Actions/action1";
import {connect} from "react-redux";
import "../App.css";
import { socketRef } from "./Common/SocketIO";


class AvailableUsers extends Component {
    constructor(props) {
        super(props);
        this.state={
            allUsers:[],
            onlineUsers:[],
            selectedItem:{}
        }
    }


   componentDidMount() {

       const {socket} = this.context;
       socket.on('onlineUsers',(data)=>{
           console.log("+++onlineUsers CLIent Side",data);
           this.setState({onlineUsers:data.onlineIds})
       })
       let loggedInUser = JSON.parse(localStorage.getItem('userLogin'));
       console.log("available",loggedInUser)
       let fetchData = {
           body:{},
           mehtod:"GET",
           url:"http://localhost:3100/user/getUsers"
       }
       makeServiceCall(fetchData,(data)=>{
           console.log("data in avalaible users",data);
           socket.emit('availableUsers',{
               AvailableUsers:data
           })
           if(data.length>0&&loggedInUser!==null) {
              let filteredUsers =  data.filter(user=>{
                   return user._id!==loggedInUser[0]._id
               })
              this.setState({allUsers:filteredUsers})
               
           }
       })
   }
   selectedUser=(user)=>{
       let senderUser = JSON.parse(localStorage.getItem('userLogin'));

   console.log("<<<<user",user);
   this.setState({selectedItem:user});
   this.props.dispatch(addSelectedItem(user));
   let fetchInfo = {
       body:{
           messageBy: senderUser[0]._id,
           messageTo:user._id
       },
       method:"POST",
       url:"http://localhost:3100/mess/senderRecieverMess"
   }
   makeServiceCall(fetchInfo,(data)=>{
      console.log("<<<data sender reciever messages",data);
      this.props.dispatch(messagesArray(data))
      
   })

   }
    
    render() {
      
        return <>
         <h1>AvailableUsers</h1>
         <div className="listContainer">
         <ul>
             {this.state.allUsers.map((item,index)=>{

                 var userOnline = false;
                 if(this.state.onlineUsers.indexOf(item._id) !== -1){
                     userOnline=true;
                 }
                  
                //  console.log("<<<item",item)
                 return (
                    <>
                    <li className={this.state.selectedItem===item?"listStyle":""} key={index} onClick={(e)=>{this.selectedUser(item)}}>
                     {item.username}
                    {/* {item.username}{this.state.onlineUsers.forEach(online=>{
                        if(this.state.allUsers.indexOf(online)!==-1) {

                        }
                    })}<span style={{color:'green',fontSize:"80px"}}>.</span> */}
                    {userOnline && <span style={{color:'green',fontSize:"80px"}}>.</span>}
                    </li>
                    
                    </>
                 )
                
                       
             })}
         </ul>
         </div>
       
        </>
    }
}
AvailableUsers.contextType = socketRef;
export default connect(null,null)(AvailableUsers);