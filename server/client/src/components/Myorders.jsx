import moment from 'moment'
import React, { useEffect, useState } from 'react'
import '../myorders.css'
function Myorders() {
    const[orders,setOrders]=useState([])
    const[orderedItems,setorderedItems]=useState([])
    const[items1,setItems1]=useState([])
    const[paymentDetails,setPaymentDetails]=useState([])

    const fetchOrders = async()=>{
        let resp=await fetch('/orderDetails').then(function(res){
            return res.json();
        }).then(function(items){
           
            setOrders(items)
            
        })
    }
    
    useEffect(() => {
            fetchOrders();
    }, [orders])

    return (
        <div className="main_order container">
            {orders.length==0 ? <div><h1>No orders</h1></div> : <div>
                <div className="inner_head1">
                    <h4>My Orders</h4>
                </div>
                <div>
                    {
                        orders.map((itm,index)=>(
                            <div>
                                <div className="order_id bg-light px-2">
                                    <p className="text-primary h5">Order# {itm._id}</p>
                                    <div className="d-flex justify-content-between">
                                        {/* <p>Ordered on: {orders[index].orderedItems[0].date}</p> */}
                                        <p>Ordered on: {moment(orders[index].orderedItems[0].date).format("dddd, MMMM Do YYYY, h:mm a")}</p>
                                        <div  className="d-flex">
                                            {orders[index].paymentdetails[0].paymentstatus==true ? 
                                            <div className="d-flex">
                                                <p className="mr-4 h6"><i className="fa text-success fa-x fa-check-circle mr-2"></i>Paid</p>
                                                <div className="d-flex flex-column">
                                                    <p className="mr-4 h6">{orders[index].paymentdetails[0].mode}</p>
                                                    <span className="upi">{orders[index].paymentdetails[0].upi}</span>
                                                </div>
                                                <p className="h6">Total: Rs. {orders[index].paymentdetails[0].totalPrice}</p>
                                            </div> : 
                                            <div className="d-flex">
                                                <p className="mr-4 h6 text-danger">Payment Not Succesfull!</p>
                                                
                                                <p className="h6 text-danger">Payable: Rs. {orders[index].paymentdetails[0].totalPrice}</p>
                                            </div>}
                                            
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        orders[index].orderedItems[0].items.map((itms,index)=>(
                                            <div>
                                                
                                                <div className="row bg-white px-2 my-3">
                                                    <div className="col-1">
                                                        <p>{index+1}</p>
                                                    </div>
                                                    <div className="pImage col-2">
                                                        <img src={itms.productimage} alt="image" height="100px" width="130px" />
                                                    </div>
                                                    <div className="pImage col-4">
                                                        <p className="h6">{itms.productname}</p>
                                                        <div className="d-flex">
                                                            <p>Qty: {itms.qty}</p>
                                                            <p className="ml-3">Rs. {itms.totalprice}</p>
                                                        </div>
                                                    </div>
                                                    <div className="pImage col-2">
                                                        <p className="text-info h6">Status:</p>
                                                         <p>{itms.orderstatus}</p> 
                                                    </div>
                                                    <div className="pImage col-3 ">
                                                        <p className="h6">Expected Delivery by</p>
                                                        <p>{moment(itms.expectedDelivery).format("dddd, MMMM Do YYYY, h:mm a")}</p>
                                                    </div>    
                                                </div>
                                            </div>
                                           
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
</div>}
        </div>
    )
}

export default Myorders
