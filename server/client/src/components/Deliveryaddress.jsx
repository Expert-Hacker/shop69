import React from 'react'
import '../checkout.css'
function Deliveryaddress() {
    return (
        <div className="address py-5  row container m-auto shadow-lg ">
            <div className="leftaddress col-2 rounded">
                    <div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            <p>Shift to you</p>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label class="form-check-label" for="flexRadioDefault2">
                        <p>Shift to store/office</p>
                        </label>
                    </div>
                </div>
            </div>
            <div className="rightaddress  col-10">
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" className='form-control mb-4' />
                        <label htmlFor="">Phone Number</label>
                        <input type="text" className='form-control mb-4' />
                        <label htmlFor="">Address</label>
                        <textarea className='form-control ' />
                    </div>
            </div>
        </div>
    )
}

export default Deliveryaddress
