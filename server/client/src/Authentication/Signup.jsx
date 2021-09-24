import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
function Signup() {
    const history=useHistory();
    const[input,setInput]=useState({
        "name":"",
        "email":"",
        "phone":"",
        "address":"",
        "password":"",
        "cpassword":""
    })
    let value, name;
    const handleChange = (e) =>{
        e.preventDefault();
        name=e.target.name;
        value=e.target.value;
        setInput({...input,[name]:value})
    }
    const postData =async (e)=>{
        e.preventDefault();
        const{name,email,phone,address,password,cpassword}=input;
       
        let resp= await fetch('/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,phone,address,password,cpassword
            })
        })
        if(resp.status==201)
        {
            alert("REGISTRATION SUCCESSFULL")
            history.push("/login")
        }
        else if(resp.status==400)
        {
            alert("REGISTRATION FALED")
        }
    }
    return (
        <div>
        <div className='sigin '>
           <div className="inner w-50 m-auto">
               <form method="POST">
                   <h1 className="h3 font-weight-bold mb-3 text-dark">Register..</h1>
                   <div class="form-group">
                       <label for="exampleInputEmail1">Your Name</label>
                       <input type="text" class="form-control" value={input.name} onChange={handleChange} name="name" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"/>
                   </div>
                   <div class="form-group">
                       <label for="exampleInputEmail1">Email address</label>
                       <input type="email" class="form-control" value={input.email} onChange={handleChange} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email"/>
                   </div>
                   <div class="form-group">
                       <label for="exampleInputEmail1">Phone</label>
                       <input type="number" class="form-control" value={input.phone} onChange={handleChange} name="phone" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Phone"/>
                   </div>
                   <div class="form-group">
                       <label for="exampleInputEmail1">Address</label>
                       <input type="text" class="form-control" value={input.address} onChange={handleChange} name="address" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address"/>
                   </div>
                   <div class="form-group">
                       <label for="exampleInputEmail1">Password</label>
                       <input type="password" class="form-control" value={input.password} onChange={handleChange} name="password" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Password"/>
                   </div>
                   <div class="form-group">
                       <label for="exampleInputPassword1">Confirm Password</label>
                       <input type="password" class="form-control" value={input.cpassword} onChange={handleChange} name="cpassword" id="exampleInputPassword1" placeholder="Confirm Password"/>
                   </div>
                   <button type="submit" class="btn btn-primary" onClick={postData}>Submit</button>
                   <Link className="mx-3" to="/login">already have an account?</Link>
               </form>
           </div>
       </div>
   </div>
    )
}

export default Signup
