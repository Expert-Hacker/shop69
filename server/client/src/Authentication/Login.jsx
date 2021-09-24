import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import login from '../login.css'
import { Link } from 'react-router-dom'
function Login(props) {
    let { log_stat } = props;

    const history=useHistory();
    const[input,setInput]=useState({
        email:"",
        password:""
    })
    let value, name;
    const handleChange = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInput({...input,[name]:value})
    }

    const postData =async (e)=>{
        try{
        e.preventDefault();
        const {email,password}=input;
        let resp= await fetch('/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
            
        })
        let uInfo=await resp.json();
    
        // let uInfo=await resp.json() ;
        if(resp.status==400)
        {
            log_stat(false)
            alert("INVALID CREDENTIALS")
        }
        else if(resp.status==200)
        {
        
            if(uInfo.role=="user")
            {
                log_stat(uInfo.role)
                alert("Login Success!");
                history.push('/')
                // how to redirect back to previous page in react js
                // history.goBack();
            }
            
        }   
        else if(resp.status==202)
        {
            if(uInfo.role=="admin")
            {
                log_stat(uInfo.role)
                history.push("/admin-dashbord")
            }
        }
    }catch(er)
    {
        alert("INVALID CREDENTIALS")
    }
    }
return (
        <div>
             <div className='sigin'>
                <div className="inner w-50 m-auto">
                    <form method="POST">
                        <h1 className="h3 font-weight-bold mb-3 text-dark">Login..</h1>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" value={input.email} name="email"  onChange={handleChange} class="form-control"  aria-describedby="emailHelp" placeholder="Enter email"/>
                          
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" value={input.password} name="password" onChange={handleChange} class="form-control"  placeholder="Password"/>
                        </div>
                        <button type="submit" onClick={postData} class="btn btn-primary">Submit</button>
                        <Link className="mx-3" to="/signup">Am new to sho69?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
