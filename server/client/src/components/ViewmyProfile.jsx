import React, { useEffect, useState } from 'react'
import '../ViewmyProfile.css'
import profile from '../images/images.png'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
function ViewmyProfile(props) {
    const history=useHistory();
    const[user,setInfo]=useState("")
    useEffect(() => {
        
        let { log_stat } = props;
            let userInfo =async () =>
            {
                try
                {
                let resp1= await fetch('/checkuser',{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                let resp=await resp1.json();
                setInfo(resp)
          
                //
                if(resp1.status==200 || resp1.status==304)
                {
                    log_stat(resp[0].role)
                }
                else
                {
                    log_stat(false)
                }
     
        }catch(err)
        {
          
            log_stat(false)
            history.push('/')
        }
                
            }
            userInfo();
    }, [])
    return (
        <div className="profile">
            
                <div className="innerProfile ">
                
                    <div className="left1 bg-danger bg-light">
                    <Link className="edit btn btn-outline-primary" to="/user/profile/edit-profile">Edit Profile</Link>
                            <img src={profile} alt="profile" height="250px" />
                    </div>
                    <div className="right1 bg-light">
                            <div className="left_data mx-4">
                                <h4 className="text-secondary  my-3">User ID</h4>
                                <h4 className="text-secondary  my-3">Name</h4>
                                <h4 className="text-secondary  my-3">Email</h4>
                                <h4 className="text-secondary  my-3">Phone</h4>
                                <h4 className="text-secondary  my-3">Address</h4>
                                <h4 className="text-secondary  my-3">Created At</h4>
                            </div>
                            <div className="right_data">
                                <h4 className="my-3 mx-4">{!user ? "" : user[0]._id }</h4>
                                <h4 className="my-3 mx-4">{!user ? "" : user[0].name }</h4>
                                <h4 className="my-3 mx-4">{!user ? "" : user[0].email }</h4>
                                <h4 className="my-3 mx-4">{!user ? "" : user[0].phone }</h4>
                                <h4 className="my-3 mx-4">{!user ? "" : user[0].address }</h4>
                                <h4 className="my-3 mx-4">{!user ? "" : user[0].createdAt }</h4>
                            </div>
                            
                    </div>
                </div>
        </div>
    )
}

export default ViewmyProfile
