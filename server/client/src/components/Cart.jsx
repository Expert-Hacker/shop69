import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
import '../cart.css'
function Cart(props) {
    let { log_stat } = props;  
    let tvalue=0;
    let grandTotal;
    const[cart,setCart]=useState([])
    const[deletedItem,setDeleteItem]=useState(false)
    let[paymentsummery,setpaymentsummery]=useState(0)
    let[total,setTotal]=useState("")
    const[loading,setLoading]=useState(true);
    const[cartSate,setcartState]=useState(true)
    const[id,setID]=useState("")
    let history=useHistory();
 
    useEffect(() => {
        const fetchUser = async() =>
        {
            try
            {
                setDeleteItem(false)
                let responce=await fetch("/getcartItems",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                if(responce.status===400)
                {
                    history.push("/login")
                    setcartState(false)
                    log_stat(false)
                  
                    
                }
                else if(responce.status==401)
                {
                    setcartState(false)
                    log_stat(false)
                    
                }
                else if(responce.status==200)
                {
              
                let resp=await responce.json();
               
                setCart(resp);
                setLoading(false)
                setID(resp[0]._id)
                setcartState(true)
                }
            }
            catch(err)
            {
               
                history.push("/login")
                // alert('cart is empty')
                setcartState(false)
            }
        }
        fetchUser();
    },[deletedItem])

    const deleteItem =async (productid)=>{
       
            let detetedItm=await fetch(`/deleteItem/${productid}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    productid
                })
            })
            if(detetedItm.status==200)
            {
                alert("Item Deleted successfully!")
                setDeleteItem(true)
            }
            else
            {
                alert("something went wrong ")
            }
    }

    grandTotal = cart.reduce((a, c) => a + c.totalprice, 0);
   
    if(cartSate==true)
    {
        return (
            <div className="cart_cont row container-fluid">
            {loading ?  <div className="loading_div">
                 <h1 className="loading">Loading...</h1>
             </div> : 
           
                    cart.map((itms,index)=>(
                        
                    <div key={index} className="innerCart my-0 col-8">   
                        <div className="cartDetails row">
                            <div className="slno  d-flex flex-column col-2">
                            <label htmlFor="" className="text-danger m-auto">Sl.No</label>
                                <p className="m-auto">{index+1}</p>
                            </div>
                            <div className="cartImage col-2">
                                <img src={itms.productimage} alt="cart_image" height="100px" width="130px"/>
                            </div>
                            <div className="title  d-flex flex-column col-2">
                            <label htmlFor="" className="text-danger m-auto">Item Name</label>
                                <p className="m-auto">{itms.productname}</p>
                            </div>
                            <div className="qty d-flex flex-column col-2">
                                <label htmlFor="" className="text-danger m-auto">Quantity</label>
                                <p className="m-auto">{itms.qty}</p>
                            </div>
                            <div className="tprice  d-flex flex-column col-2">
                            <label htmlFor="" className="text-danger m-auto">Price</label>
                                <p className="m-auto">{itms.totalprice}</p>  
                                
                            </div>  
                            <div className="d-flex col-2">
                                <i class="fas fa-trash m-auto" onClick={()=>deleteItem(itms.productid)}></i>  
                            </div>    
                        </div>   
                        <hr />  
                    </div>   
                    ))
                  
           } 
            
            {loading ? <div></div> : <div className="priceDetails  col-4 ">
                    <div className="innerPriceDetails rounded">
                        <h1 className="paymentSummery h3 p-2">Payment Summery </h1>
                        <div className=" d-flex justify-content-between mx-2 my-2">
                            <span>Transaction code</span>
                            <span>Vd7jl0rq9ppe</span>
                        </div>
                        <div className="coupen d-flex m-3 justify-content-between">
                            <input type="text" class="form-control mr-2" placeholder="COUPON CODE" />
                            <button className="btn btn-info  px-5">Apply</button>
                        </div>
                        <hr />
                        <div className="order_summery m-3">
                            <div className="d-flex justify-content-between">
                                <h5>Order Summery ({cart.length})</h5>
                                <h5>Rs.{grandTotal} </h5>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5>Shipping charges</h5>
                                <h5>Rs. 20</h5>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5>Additional services</h5>
                                <h5>Rs. 00</h5>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5 className='font-weight-bold'>Total amount</h5>
                                <h5 className='font-weight-bold'>Rs. {grandTotal+20 }</h5>
                            </div>
                            
                            <hr />
                            <p className="d-flex bg-danger expires text-white p-2 rounded justify-content-between">Sale Expires in: 21Hours, 31 Minutes </p>
                        </div>
                        
                    </div>
                    <Link className="btn btn-warning w-100 my-3 font-weight-bold p-2" to={`/user/cart/checkout/${grandTotal}`}>CHECKOUT</Link>
                </div>  } 
            </div>
                       
        )
    }
    else
    return(
            <div>
                <h1 className="display-3 mt-5">CART IS EMPTY!</h1>
            </div> 
    )
    
}

export default Cart
