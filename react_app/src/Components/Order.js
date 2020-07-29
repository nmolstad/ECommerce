import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Order extends Component {
    state = {
        carrier: '',
        trackNo: ''
    }

    carrierOnChange = (e) => {
        this.setState({carrier: e.target.value});
    }

    trackNoOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const { id, username, datePlaced, items, shipped, shippingCarrier, trackingNumber } = this.props.order;
        if(shipped) {
            return (
                <div className='col-md-12'>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h3><strong>Order {id}</strong></h3>
                            <p className="card-text">Placed by: {username}</p>
                            <p className="card-text">Date: {datePlaced}</p>
                            <p className="card-text">Shipping Carrier: {shippingCarrier}</p>
                            <p className="card-text">Tracking Number: {trackingNumber}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='col-md-12'>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h3><strong>Order {id}</strong></h3>
                            <p className="card-text">Placed by: {username}</p>
                            <p className="card-text">Date: {datePlaced}</p>
                            <form onSubmit={this.props.setShipped.bind(this, id, this.state.carrier, this.state.trackNo)}>
                                <div className="form-row">
                                    <div className="col-md-2">
                                        <select className="form-control" name="carrier" id="carrier" onChange={this.carrierOnChange} defaultValue={'DEFAULT'} required>
                                            <option value="DEFAULT" disabled >Select Shipping Carrier...</option>
                                            <option value="USPS">USPS</option>
                                            <option value="UPS">UPS</option>
                                            <option value="FedEx">FedEx</option>
                                        </select>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" id="trackNo" name="trackNo"
                                               placeholder="Tracking Number" required value={this.state.trackNo} onChange={this.trackNoOnChange}/>
                                    </div>
                                    <button className="btn btn-dark">Ship</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Order;