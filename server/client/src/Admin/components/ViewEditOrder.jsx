import React, { useState } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
function ViewEditOrder(props) {
    return (
        <div>
             <Modal  show={props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="d-flex p-1 justify-content-between">
                            <h4 className="text-danger">#Order </h4>
                            <h5>{props.orderId}</h5>
                        </div>
                        <hr />
                        <div className="d-flex p-3 justify-content-between">
                            <h4>Delivery Date </h4>
                            <input type="date" name="" id="" />
                        </div>
                        <div className="d-flex p-3 justify-content-between">
                        <h4>Status </h4>
                            <div class="dropdown">
                            <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                                <option value="0">Choose...</option>
                                <option value="1">Ordered</option>
                                <option value="2">Order Accepted</option>
                                <option value="3">In Transit</option>
                                <option value="3">Canceled</option>
                                <option value="3">Canceled & Refunded</option>
                                <option value="3">Delivered</option>
                            </Form.Select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={props.onHide}>
                    Close
                    </Button>
                    <Button variant="primary" >
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ViewEditOrder
