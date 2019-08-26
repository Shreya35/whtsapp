
import React,{Component} from "react";
import {makeServiceCall} from "./Common/ServiceCall";
import { FiMail } from "react-icons/fi";
import { IoIosKey } from 'react-icons/io';
import {Link} from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email:"",
          password:"",
          hasSubmitted:false,
          incorrectEmail:false,
          incorrectEmailPassword: false
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
    loginSubmit=()=>{
        const {email,password} = this.state;
        this.setState({hasSubmitted:true})
            let fetchData = {
                body:this.state,
                url:"http://localhost:3100/user/login",
                method:"POST"
            }
            makeServiceCall(fetchData,(data)=>{ 
                console.log("DATA value in Login",data);
                if(data.length>0) {
                    localStorage.setItem("userLogin",JSON.stringify(data))
                    this.props.history.push('/home')
                }
            })
    
    }
    validationError=field=>{
        if(this.state[field].length<=0&&this.state.hasSubmitted) {
            return <span style={{color:"red"}}>This field is required</span>
        }
   }

    
    render() {
        return (
            <>
            <div className="hero">
              <div className="signUpController">
               
               <div className="headingController">
                  <h3>Login</h3>
               </div>

               <div className="formController">
                     <div className="inputBox">
                      <span className="positionIcon" style={{fontSize:"25px"}}><FiMail/></span>
                      <input type="text" name="email" onChange={this.handleChange} placeholder="email"/>
                       {this.validationError("email")}
                     </div>

                   <div className="inputBox">
                     <span className="positionIcon" style={{fontSize:"25px"}}><IoIosKey/></span>
                     <input type="text" name="password" onChange={this.handleChange} placeholder="password"/>
                     {this.validationError("password")}
                   </div>
               </div>

               <div className="btnController">
                  <button onClick={this.loginSubmit}>LOGIN</button>
               </div>

               <div className="textWrapper">
                   <p>Create an Account<span className="diffColor"><Link to="/" style={{textDecoration:"none",color:"#eea02f"}}>SignUp</Link></span></p>
               </div>

              </div>
            </div>
            
            </>
        )



        // return (
        //     <>
        //  <div className="loginController">
        //  <label for="email">Email</label>
        //  <input type="text" name="email" onChange={this.handleChange}/>

        //  <label for="password">Password:</label>
        //  <input type="text" name="password" onChange={this.handleChange}/>
        //  <button onClick={this.loginSubmit}>Login</button>

        //  </div>
        //     </>
        // )
    }
}
export default Login;