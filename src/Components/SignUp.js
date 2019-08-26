import React,{Component} from "react";
import {Link} from "react-router-dom";
import {makeServiceCall} from "./Common/ServiceCall";
import { IoIosPerson,IoIosKey,IoMdContact } from 'react-icons/io';
import { FiMail } from "react-icons/fi";
import  "../App.css";
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
           username:"",
           firstname:"",
           lastname:"",
           email:"",
           password:"",
           emailExist: false,
           invalidEmail:false,
           hasSubmitted:false
        }
    }
    componentWillMount() {
        let loggedInUser = JSON.parse(localStorage.getItem('userLogin'));
        if(loggedInUser!==null) {
            this.props.history.push('/home');
        }
    }

    handleChange=(e)=>{
        let name = e.target.name;
        this.setState({[name]:e.target.value});
    }

    signUp=()=>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log("-----",reg.test(this.state.email))
        let emailValid = reg.test(this.state.email);
        if(emailValid===false){
            this.setState({invalidEmail:true})
        }
        else {
            this.setState({invalidEmail:false})
        }
       
        this.setState({hasSubmitted:true})
        if(this.state.username.length>0&&this.state.firstname.length>0&&
            this.state.lastname.length>0&&this.state.email.length>0&&
            this.state.password.length>0) 
            {  if(reg.test(this.state.email)) {
                if(this.state.password.length>=6) {
                   
                    let fetchInfo = {
                        body:this.state,
                        url:"http://localhost:3100/user/signup",
                        method:"POST"
            
                    }
                    makeServiceCall(fetchInfo,(data)=>{
                        console.log(" the data is ",data);
                        if(data.error) {
                            this.setState({emailExist:true})
                        }
                        else {
                            this.setState({emailExist:false});
                            this.props.history.push('/login')
                        }
                    });  
    
                }
            }
            
            }
        
        
    }
    validationError=field=>{
         if(this.state[field].length<=0&&this.state.hasSubmitted) {
             return <span style={{color:"red"}}>This field is required</span>
         }
    }
    passwordValidationError=()=>{
        const {password,hasSubmitted} = this.state;
        if(password.length<=0&&hasSubmitted) {
            return <span style={{color:"red"}}>This field is required</span>
        }
        else if(password.length>0&&password.length<6) {
            return <span style={{color:"red"}}>Password must be six
            characters long</span>
        }
        else {
            return null; 
        }
    }
    emailValidationError=()=>{
      const {email,invalidEmail,emailExist,hasSubmitted} = this.state;
      if(email.length<=0&&hasSubmitted) {
          return <span style={{color:"red"}}>This field is required</span>
      }
      else if(invalidEmail&&email.length>0) {
          return<span style={{color:"red"}}>Invalid Email</span>
      }
      else if(emailExist&&email.length>0) {
          return <span style={{color:"red"}}>Email already exist</span>
      }
      else {
          return null;
      }
    }
    render() {
        return (
            <>
            <div className="hero">
              <div className="signUpController">
               
               <div className="headingController">
                  <h3>Create Account</h3>
               </div>

               <div className="formController">
                   <div className="inputBox">
                       <span className="positionIcon" style={{fontSize:"25px"}}><IoIosPerson/></span>
                       <input type="text" name="username" onChange={this.handleChange} placeholder="username"/>
                       {this.validationError('username')}
                   </div>
                   <div className="inputBox">
                       <span className="positionIcon" style={{fontSize:"25px"}}><IoIosPerson/></span>
                       <input type="text" name="firstname" onChange={this.handleChange} placeholder="firstname"/>
                       {this.validationError('firstname')}
                   </div>
                   <div className="inputBox">
                     <span className="positionIcon" style={{fontSize:"25px"}}><IoMdContact/></span>
                      <input type="text"  name="lastname" onChange={this.handleChange} placeholder="lastname"/>
                      {this.validationError('lastname')}
                   </div>
                   <div className="inputBox">
                      <span className="positionIcon" style={{fontSize:"25px"}}><FiMail/></span>
                      <input type="text" name="email" onChange={this.handleChange} placeholder="email"/>
                    
                      {this.emailValidationError()}

  
                   </div>
                   <div className="inputBox">
                     <span className="positionIcon" style={{fontSize:"25px"}}><IoIosKey/></span>
                     <input type="text" name="password" onChange={this.handleChange} placeholder="password"/>
                     {this.passwordValidationError()}
                   </div>
               </div>

               <div className="btnController">
                  <button onClick={this.signUp}>SUBMIT</button>
               </div>

               <div className="textWrapper">
                   <p>Already have an account?<span className="diffColor"><Link to="/login" style={{textDecoration:"none",color:"#eea02f"}}>Login</Link></span></p>
               </div>

              </div>
            </div>
            
            </>
        )
       
    }
}
export default SignUp;