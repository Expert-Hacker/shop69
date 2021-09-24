import image from '../images/images.png'
import React, { useEffect, useState } from 'react'
import '../editProfile.css'
function Editprofile(props) {
    let { log_stat } = props;
    const [profile,setProfile]=useState(false)
    const[id,setid]=useState("")
   
    const[user,setInfo]=useState([]);
    const[ID,setID]=useState({
            id:""
    })
    const[namee,setname]=useState({
        "name":""
    })
    const[email,setemail]=useState({
        "email":""
    })
    const[phone,setphone]=useState({
        "phone":""
    })
    const[password,setpassword]=useState({
        "password":""
    })
    const[address,setaddress]=useState({
        "address":""
    })
    let name,value;
    const handleInputID = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInfo({...namee,[name]:value})
    }
    const handleInputname = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInfo({...ID,[name]:value})
    }
    const handleInputemail = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInfo({...email,[name]:value})
    }
    const handleInputphone = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInfo({...phone,[name]:value})
    }
    const handleInputaddress = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInfo({...address,[name]:value})
    }
    const handleInputpassword = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInfo({...password,[name]:value})
    }
    useEffect(() => {
            const userInfo =  () =>{
                try
                {
                let resp=  fetch('/checkuser').then(function(res){
                    return res.json();
                }).then(function(data){
                    let data1=data[0]
                    setInfo(data1)  
                    setid(data1._id) 

                    if(!user)
                    {
                        log_stat(false)
                    }
                    else
                    {
                        log_stat(data[0].role)
                    }
                })    
                }catch(err)
                {
                    
                    log_stat(false)
                    // history.push('/')
                }
               
            }
            userInfo();
    }, [])

    const updateuser = async(e) =>{
        e.preventDefault();
        const{name,email,phone,address} =user;
       
      
        let resp=await fetch(`/updateuser`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id,name,email,phone,address
            })
        })
        if(resp.status==200)
        {
            alert("update success")
        }
        else
        {
            alert("update failed")
        }
    }
    return (
        <div className='editProfile my-5 my-5'>
            <h3 className="title_edit">Update Profile</h3>
            <div className="innerEdit  mt-auto d-flex">
                
                <div className="left_edit w-15  mx-4">
                    <div className="d-flex flex-column">
                     
                        <img src={image} alt="image" height="300px" width="300px"/>
                        <button className='btn btn-outline-info my-4'>Upload Photo</button>
                    </div>
                </div>
                <div className="rightEdit w-50 ">
                <form className="" method="PUT">
                <div class="form-group">
                    <label for="exampleInputEmail1">User ID</label>
                    <input type="text" class="form-control" name="name" disabled value={user._id } onChange={handleInputID}  placeholder="Your ID"/>
                </div>  
                <div class="form-group">
                    <label for="exampleInputPassword1">Name</label>
                    <input type="text" class="form-control" name="name" value={user.name } onChange={handleInputname} id="exampleInputPassword1" placeholder="Name" />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" name="email" value={user.email } onChange={handleInputemail} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Phone</label>
                    <input type="text" class="form-control" name="phone" value={ user.phone } onChange={handleInputphone} id="exampleInputPassword1" placeholder="Phone number" />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input type="number" class="form-control" disabled name="password"   onChange={handleInputpassword} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Address</label>
                    <textarea class="form-control" name="address" value={user.address } onChange={handleInputaddress} id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
                <button  class="btn btn-success mx-3" onClick={updateuser}>Update</button>
                <button  class="btn btn-warning">Cancel</button>
            </form>
                </div>
            </div>
        </div>
    )
}

export default Editprofile
