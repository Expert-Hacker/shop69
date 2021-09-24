import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ApexCharts from 'apexcharts'

function Dashboard() {
    const[user,Setuser]=useState([]);

    const fetchallUsers = () => {
        let resp=fetch("/allUsers").then(function(res){
            return res.json();
        }).then(function(data){
            Setuser(data)
        })
    }


    useEffect(() => {
        fetchallUsers();
    }, [])

    return (
        <div>
            <div>
                <h1 className="h2">Dashboard</h1>
                <p>dashboard &#62; users</p>
            </div>
            <div className="bg-light">
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Sl. No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">User ID</th>
                <th scope="col">Created on</th>
                </tr>
            </thead>
            <tbody>
            {
                user.map((users,index)=>(
                <tr>
                    <td scope="col">{index+1}</td>
                    <td scope="col">{users.name}</td>
                    <td scope="col">{users.email}</td>
                    <td scope="col">{users.phone}</td>
                    <td scope="col">{users.address}</td>
                    <td scope="col">{users._id}</td>
                    <td scope="col">{moment(users.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                </tr>
                ))
            }
 
  </tbody>
</table>
            </div>
            
        </div>
    )
}

export default Dashboard
