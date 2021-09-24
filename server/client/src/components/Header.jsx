import React, { useEffect, useState } from 'react'
import { Link ,useHistory} from 'react-router-dom'
import '../header.css'
let login_status;
function Header(props) {
  const history=useHistory();
  const[info,setInfo]=useState("")

let result;
  useEffect(() => {
    async function userInfo()
    {
        let responce=await fetch('/checkuser',{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })
        let result= await responce.json()
        setInfo(result)
      
    }
    userInfo();
  }, [props.log_stat])

  const logout =async () =>{
    let resp= await fetch("/logout",{
      method:"GET",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      credentials:"include",  
    })
    if(resp.status==200)
    {
      localStorage.setItem('login_status',false)
      alert("logout success")
      history.push('/')
      window.location.reload();
    }
    
  }
  if(!info)
  {
    // console.log(info[0].name);
   
  }
  else
  {
  
  }
 
    return (
        <div>
            <nav class="navbar position-fixed  w-100 navbar-expand-lg navbar-light  bg-light">
            <Link class="nav-link text-primary fw-bold ml-5 h4" to="/">SHOP69 <span class="sr-only">(current)</span></Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        {props.log_stat=="admin" ? "" : <Link class="nav-link h5 ml-5" to="/">Home <span class="sr-only">(current)</span></Link>}
        
        
      </li>
    </ul>
  
    <ul class="navbar-nav mr-5">
      {props.log_stat=="admin" ? "" : <li class="nav-item active">
        <a class="nav-link" href="#"><Link to="/user/cart"><i class="fas cart_icon fa-shopping-cart text-dark"></i></Link><span className="badge bg-danger text-white position-absolute"></span> <span class="sr-only">(current)</span></a>
      </li>}
    </ul>
     {
      props.log_stat=="user" ? <ul class="navbar-nav ">
      <li class="nav-item dropdown mr-5">
          <a class="nav-link dropdown-toggle h5" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {!info ? "user" : info[0].name }
          </a>
          <div class="dropdown-menu " aria-labelledby="navbarDropdown">
          <Link to="/user/view-profile" class="dropdown-item">View my profile</Link>
          <Link to="/user/my-orders" class="dropdown-item">My Orders</Link>
          <Link class="dropdown-item" to="/user/profile/edit-profile">Edit profile</Link>
            <div class="dropdown-divider"></div>
            <Link to="/" onClick={logout} class="dropdown-item" href="#">Logout</Link>
          </div>
        </li>
      </ul> : props.log_stat=="admin" ? <ul class="navbar-nav ">
      <li class="nav-item dropdown mr-5">
          <a class="nav-link dropdown-toggle h5" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Admin
          </a>
          <div class="dropdown-menu " aria-labelledby="navbarDropdown">
{/*          
          <Link to="/user/view-profile" class="dropdown-item">View my profile</Link>
          <Link class="dropdown-item" to="/user/profile/edit-profile">Edit profile</Link> */}
            
          
            <Link to="/" onClick={logout} class="dropdown-item" href="#">Logout</Link>
          </div>
        </li>
      </ul> :  <div><Link className="btn btn-primary mx-2" to="/login">SignIn</Link>
    <Link className="btn btn-outline-dark" to="/signup">SignUp</Link></div> 
    } 
  </div>
</nav>
        </div>
    )
}

export default Header
