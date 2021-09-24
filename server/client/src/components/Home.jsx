
import {React,useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import '../products.css'
import image from '../images/homepageimage.png'
import { Card } from 'react-bootstrap';

function Products(props) {
    // userInfo()
    let { log_stat } = props;    
    const[products,setProducts]=useState([]);
     function retriveProducts()
    {
            let responce=fetch('/v1/api/products').then(function(res){
                return res.json()
               
            }).then(function(data){
                setProducts(data) 
            })
            try
            {
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
    }catch(err)
    {
    
        log_stat(false)
    }
         
    }
    useEffect(() => {
        
     retriveProducts(); 
    
    }, [])
    return (
        <div className=" home_page">
            <div className="inner_div  container-fluid d-flex justify-content-center">
                <div className="left d-flex flex-column justify-content-center">
                    <h1 className='head1 display-1'>Start Shopping with</h1>
                 
                    <h1 className="head1 display-1 text-primary fw-b">SHOP69</h1>
                </div>
                <div className="right my-5">
                    <img src={image} alt="image" height="600px" />
                </div>
            </div>
    
        <div className=" product_cont">
            <hr />
            <div className="inner container-fluid">
                <h1 className="display-4">Products</h1>
                {/* <h1>{userInfoo[0].name}</h1> */}
                <div className="row products ">
                    {products.map((product,index)=>(
                        <>
                        
                        <div key={index} className="col-sm my-3  justify-content-center position-relative d-flex flex-column align-items-center text-center">
                        <Link className="text-dark" to={`product-details/${product._id}`}>
                            <div className=" ">
                                <img src={product.image} alt="image" height="300px" width="300px"/>
                                <p className="h5 my-3">{product.title}</p>
                                <h3>Rs. {product.price}</h3>
                                <p>{product._id}</p>
                            </div>   
                            </Link> 
                        </div> 
                        </>
                    ))}
                    
                </div>
            </div>

            </div>
        </div>
    )
}

export default Products
