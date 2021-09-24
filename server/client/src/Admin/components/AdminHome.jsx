import React, { useEffect, useState } from 'react'
import Left from './Left'
import Right from './Right'
import './home_admin.css'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import Orders from './Orders'
import AddProduct from './AddProduct'
import PromoCode from './PromoCode'
import UpdateProduct from './UpdateProduct'
import { Card } from 'react-bootstrap'
function AdminHome(props) {
    let {log_stat}=props;
    const[Case, setCase]=useState("Dashboard")
    useEffect(() => {
        fetch('/checkuser').then(function(res){
            return res.json()
           
            }).then(function(data){
           if(!data)
           {
                log_stat(false)
                
           } 
           else
           {
            log_stat(data[0].role)
        
            
            // log_stat(data[0].role)
           }
           if(data.status==400)
           {
            log_stat(false)
          
           }
        })
    }, [Case])
    function renderSwitch(Case)
    {
        switch (Case) {
            case "Dashboard":
                return <Dashboard/>  
            case "Orders":
                return <Orders/>  
            case "AddProduct":
                return <AddProduct/>
            case "PromoCode":
                return <PromoCode/>  
            case "UpdateProduct":
                return <UpdateProduct/>
            default:
                return <h1 className="display-2">404 Not Found</h1>
                break;
        }
    }
    
    return (
        <div className="home_div d-flex row ">
            <div className="left1_admin col-2 ">
                <div className="ad_head">
                    <h4 className='h4'>Admin Dashboard</h4>
                </div>
                <hr />
                <div className="menu ">
                    <ul>
                        <li><Link name="Dashboard" to="" onClick={(e)=>{
                            e.preventDefault()
                            setCase(e.target.name)
                        }}>Dashboard</Link></li>

                        <li><Link name="Orders" to="" onClick={(e)=>{
                            e.preventDefault()
                            setCase(e.target.name)
                        }}>Orders</Link></li>

                        <li><Link name="AddProduct" to="" onClick={(e)=>{
                            e.preventDefault()
                            setCase(e.target.name)
                        }}>Add Product</Link></li>

                        <li><Link name="PromoCode" to="" onClick={(e)=>{
                            e.preventDefault()
                            setCase(e.target.name)
                        }}>Promo Code</Link></li>
                        
                        <li><Link name="UpdateProduct" to="" onClick={(e)=>{
                            e.preventDefault()
                            setCase(e.target.name)
                        }}>Update Product</Link></li>
                       
                    </ul>
                </div>
            </div>
            <div className="right1_admin col-10 ">
                {renderSwitch(Case)}
            </div>  
        </div>
    )
}

export default AdminHome
