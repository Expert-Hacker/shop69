import React, { useEffect, useState } from 'react'
import {Modal,Button} from 'react-bootstrap'
import ViewEditOrder from './ViewEditOrder';
import '../../adminOrder.css'

function Orders() {
const[show,setshow]=useState(false)
const[orderId,setOrderId]=useState("")
    const[orders,setOrders]=useState([]);
    const[isSet,setisSet]=useState(false)
    const fetchSomeorderdetails = () => {
        let resp=fetch("/getSomeOrderDetails").then(function(res){
            return res.json();
        }).then(function(data){
      
            setOrders(data)
        })
    }


    useEffect(() => {
        fetchSomeorderdetails();
    }, [])

   

    function shoeModel(id)
    {
        setOrderId(id)
        setshow(true)
    }
    function hideModal()
    {
        setshow(false)
    }

    function editOrderss()
    {
        setshow(true)
   
    }
    return (
        <div>
            <div>
                <h1 className="h3">Orders</h1>
            </div>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#Order</th>
                            <th scope="col">Name</th>
                            <th scope="col">Items</th>
                            <th scope="col">#User</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        orders.map((ord,index)=>(
                            <tr className="bg-">
                            <td>{ord._id}</td>
                            <td>{ord.shippingAddress[0].name}</td>
                            <td>{ord.orderedItems[0].items.length}</td>
                            <td>{ord.User}</td>
                            <td className="editOrder"><i class="fas fa-edit" onClick={()=>shoeModel(ord._id)}></i></td>
                            {ord.orderedItems[0].items.map((itm,indx)=>(
                                
                            itm.orderstatus=="cancelled" ? <td className="bg-danger text-white">{itm.orderstatus}</td> : itm.orderstatus=="ordered" ? <td className="bg-warning">{itm.orderstatus}</td> :  itm.orderstatus=="Delivered" ? <td className="bg-success text-white">{itm.orderstatus}</td> : ""   
                            ))}
                            </tr>
                        ))
                    }
                </tbody>
                </table>
               
              


<ViewEditOrder 
show={show}
orderId={orderId}
onHide={hideModal} />

            </div>
        </div>
    )
}

export default Orders
