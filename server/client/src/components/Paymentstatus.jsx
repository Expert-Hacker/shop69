import React from 'react'
import '../status.css'
import {useParams} from 'react-router'
import { Link } from 'react-router-dom';
function Paymentstatus() {
    let {id}=useParams();
  
    return (
        <div className='status'>
            <div className="inner_status d-flex flex-column">
                <div className="d-flex flex-row">
                    <i className="fa text-success fa-3x fa-check-circle mr-2"></i>
                    <h1 className='text-dark'>Payment Successfull!</h1>
                </div>
                  
                <div className="mt-3 d-flex flex-column">
                    <h1 className="text-center h3">Order Placed Successfully </h1>
                    <span className="text-center">Order ID: {id}</span>
                    <Link className="btn btn-outline-info mt-4" to="/user/my-orders">View my orders</Link>
                </div>
            </div>
        </div>
    )
}

export default Paymentstatus
