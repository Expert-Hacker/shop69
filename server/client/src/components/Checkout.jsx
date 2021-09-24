import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import '../checkout.css'
function Checkout() {
  const[input,setInput]=useState(
      {upi:""}
  )
  let name,value;
  const changeInput = (e) => {
    name=e.target.name;
    value=e.target.value
    setInput({...input,[name]:value})
  }
  const history=useHistory();
  const[cart,setCart]=useState([])
  let {id}=useParams();
let res= Math.floor(Number(id)+Number(20))

  const[user,setInfo]=useState("")
  const userInfo =async() =>
    {
        try
        {
          let resp= await fetch('/checkuser',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
          })
          resp=await resp.json();
          setInfo(resp[0])
      
        }catch(err)
        {
        
        }    
    }
    //second function to get cart items
    const fetchItems = async() =>
        {
            try
            {   
                // setDeleteItem(false)
                let responce=await fetch("/getcartItems",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                let resp=await responce.json();
             
                setCart(resp);
                // setLoading(false)
                // setID(resp[0]._id)
                // setcartState(true)
               
                if(!responce)
                {
                    alert("user not authorized")
                    // history.push("/")
                }
                else if(responce.status==400)
                {
                    // history.push("/")
                }
                else if(responce.status==401)
                {
                    alert("cart is empty")
                }
            }
            catch(err)
            {
                // alert('cart is empty')
                // setcartState(false)
            }
        }
    useEffect(() => {
      userInfo();
      fetchItems();
    }, [])

    const payNow =async () => {
      let upi=input.upi;
      // 
          const respo=await fetch('/saveorder',{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              shippingAddress:{
                name:user.name,
                phone:user.phone,
                address:user.address
            },
            paymentdetails:{
              upi,
              totalPrice:res,
              mode:"googlePay",
              paymentstatus:true,
                // User:id
            },
            orderedItems:
            {
              items:cart,
              
            }
            
            })
          })
          let res1=await respo.json()
         
          if(respo.status==201)
          {
            alert("Payment was Success & Your Order saved Succesfully!")
            history.push(`/user/cart/order/payment-status/${res1._id}`)
          }
    }









  return (
    <div>
        <div className="checkoutInner row mt-5 container-fluid">
            <div className="leftsec col-8 w-100">
                  <div className="subleft1 bg-light">
                        <h1 className="h4 shiipingTitle p-2">Shipping Address</h1>
                        <div className="container">
              
                          <input className="form-control my-3" value={user.name } type="text" placeholder="First Name" />
            
                          <input className="form-control mb-3" type="text" placeholder="Last Name" />
                  
                          <input className="form-control mb-3" value={user.phone} type="number" placeholder="Phone number" />
                          
                          <textarea className="form-control mb-3" value={user.address} placeholder="Address"></textarea>
                        </div>
                  </div>
                  <div className="subleft2 my-3 bg-white">
                    <h1 className="h4 p-2 youtItems  ">Your Items</h1>
                    {
                  cart.map((itms,index)=>(
                      <div  className="innerCart1 bg-light ">   
                        <div className="cartDetails1 row">
                            <div className="slno d-flex flex-column col-3">
                                <label htmlFor="" className="text-danger m-auto">Product ID</label>
                                <span className="m-auto">{itms.productid}</span>
                            </div>
                            <div className="cartImage1 d-flex flex-column col-3">
                                <img src={itms.productimage} alt="cart_image" className="m-auto" height="100px"/>
                            </div>
                            <div className="title1 d-flex flex-column col-3">
                              <label htmlFor="" className="text-danger m-auto">Item Name</label>
                                <p className="m-auto">{itms.productname}</p>
                            </div>
                            <div className="qty d-flex flex-column col-3">
                                <label htmlFor="" className="text-danger m-auto">Quantity</label>
                                <p className="m-auto">{itms.qty}</p>
                            </div>      
                        </div>   
                        <hr />  
                    </div> 
                    ))}
                  </div>
            </div>
            <div className="rightsec col-4 ">
                <div className="subrightsec mb-5">
                  <h1 className="h4 PaymentSummery_head p-2">Payment Summery</h1>
                  <div>
                      <div className="d-flex justify-content-between">
                          <span className="font-weight-bold h6 p-2">Total Items</span>
                          <span className="font-weight-bold h6 p-2">{cart.length}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="font-weight-bold h6 p-2">Shipping charges</span>
                          <span className="font-weight-bold h6 p-2">20</span>
                      </div>
                      <div className="d-flex justify-content-between">
                          <span className="font-weight-bold h6 p-2">Other charges</span>
                          <span className="font-weight-bold h6 p-2">0</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                          <span className="font-weight-bold h5 p-2">Total Amount payable</span>
                          <span className="font-weight-bold h5 p-2">Rs. {res}</span>
                      </div>
                  </div>
                </div> 
                <div className=" rightSec2 w-100">
                      
                      <div>
                        <span className="h4 PaymentSummery_head p-2">Payment Options</span>
                        <div id="accordion">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                      <span className="h6">Google pay</span>
                                    </button>
                                  </h5>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        <div>
                                          <span>Please enter your UPI Id : </span>
                                          <input type="text" className="form-control" onChange={changeInput} placeholder="Eg: keerthanacharya@okhdfcbank" name="upi" value={input.upi} required/>
                                        </div>
                                        <button className="btn btn-success mt-2" onClick={payNow}>Pay Now</button>
                                    </div>
                                </div>
                          </div>
                          {/* 2nd */}
                          <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          <span className="h6">Cash on Delivery</span>
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        <span>Please use this bellow code on delivery as OTP</span>
        <input type="text" className="form-control" disabled placeholder="upA8TbpeSgu4b7" />
      </div>
    </div>
  </div>
  {/* 3rd */}
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <span className="h6">Credit Card</span>
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        <span>N/A</span>
      </div>
    </div>
  </div>
                          </div>
                        
                      </div>
                </div> 
            </div>
        </div>
       
    </div>
    
  )
}

export default Checkout
