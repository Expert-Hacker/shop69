import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router'
import '../productdetails.css'
import { load } from 'dotenv';
function ProductDetails() {
    const[Loading,setLoading]=useState(true);
    const history=useHistory();
    let {id}=useParams();
    const[tprice,settprice]=useState("")
    let[qty,setQty]=useState(1)
    const [product,setProduct]=useState([])
    useEffect(() => {
            fetchProduct();
    }, [])

     function fetchProduct()
    {
        let resp= fetch(`/v1/api/product/${id}`).then(function(res){
            return res.json();
        }).then(function(data){
           setProduct(data)
           setLoading(false)
        
           
        })
        settprice(product.price)
    }
    const incrementQty = () =>{
        if(qty==5)
        {
            return alert("Maximun 5 qty allowed")
        }
        else
        {
            setQty(qty=qty+1)
            document.getElementById('tprice').innerHTML=qty*product.price;
        }
            
    } 
    const decrementQty = () =>{
        if(qty==0)
        {
            
        }
        else if(qty==1)
        {
            setQty(qty--)
        }
        else
        {
            setQty(qty=qty-1)
            document.getElementById('tprice').innerHTML=qty*product.price;
        }
        
       
    } 
    const addtocart =async ()=>{
        let productid=id;
        let productname=product.title;
        let productimage=product.image;
        let totalprice=document.getElementById('tprice').innerHTML;
        // console.log(product_img)
        let resp= await fetch("/addtocart",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
           body:JSON.stringify({
            productid,productname,productimage,qty,totalprice
           }) 
        })
        if(resp.status==201)
        {
            alert("Item added to cart")
        }
        else if(resp.status==400)
        {
            history.push("/login")
        }
    }
  
    return ( 
        <div className="product_details container">
           {Loading ?  <div className="loadingBar mt-5">
                <h1 className="display-3">Loading..</h1>
            </div> :
            <div className="inner1 d-flex">
                <div className="left mr-5 ">
                    <img src={product.image} alt={product.title} height="500px" width="500px"/>
                </div>
                <div className="right ">
                    <div className="title">
                        <h1 className="fw-bold"><i className="fa fa-angle-double-right"></i>{product.title}</h1>
                    </div>
                    <div className="price">
                        <h4 className="my-4 mr-5">Rs. {product.price}</h4>
                        <span className="my-4">You saved Rs.89</span>
                    </div>
                    <div className="stock">
                        {product.stock<=10 ? <h3 className="text-danger font-weight-bold">{product.stock} Left in Stock</h3> : <h3 className="text-success font-weight-bold">In Stock</h3> }

                    </div>
                    <div>
                        <div className="btns">
                            <span className=" mr-4">Quantity</span>
                            <button className="btn btn-outline-warning font-weight-bold" onClick={decrementQty}>-</button>
                            <button className="btn btn-outline-warning text-dark disabled">{qty}</button>
                            <button className="btn btn-outline-warning font-weight-bold" onClick={incrementQty}>+</button>
                        </div>
                        <div className="my-4">
                            <h2>Total Rs.<span id="tprice">{product.price}</span></h2>
                        </div>
                    </div>
                    <button className="btn btn-info" onClick={addtocart}>ADD TO CART</button>
                    <div className="descr my-3">
                        <span className="h5">Item Description:</span>
                        <p>{product.description}</p>
                    </div>
                     
                </div>
            </div> }      
        </div>
    )
}

export default ProductDetails
// let resp= await fetch("/v1/api/addtocart",{
//     method:POST,
//     headers:{
//         Accept:"application/json",
//         "Content-Type":"application/json"
//     },
//     credentials:"include",
//     body:JSON.stringify({
        
//     })
// })