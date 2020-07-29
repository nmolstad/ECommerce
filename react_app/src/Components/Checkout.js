import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Checkout extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        cc: '',
        exp: '',
        cvv: '',
        redirect: false
    }

    checkout = ( e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: `/zuul/checkout-service/${localStorage.getItem('username')}`,
            data: {
                "cardNumber": this.state.cc,
                "email": this.state.email
            }
        }).then(res => {

        }).catch(err => console.log(err));

        this.setState({redirect: true})
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/' />
        } else {
            return (
                <div className="mx-5">
                    <h1>Checkout</h1>
                    <hr/>
                    <br/>
                    <form onSubmit={this.checkout}>
                        <div className="form-row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="fname">First name</label>
                                <input type="text" className="form-control" id="fname" name="fname"
                                       placeholder="First name" required value={this.state.fname} onChange={this.onChange}/>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="lname">Last name</label>
                                <input type="text" className="form-control" id="lname" name="lname" placeholder="Last name"
                                       required value={this.state.lname} onChange={this.onChange}/>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="email">Email</label>
                                <div className="input-group">
                                    <input type="email" className="form-control" id="email" name="email"
                                           placeholder="name@email.com" required value={this.state.email} onChange={this.onChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" value={this.state.address} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" className="form-control" id="address2" name="address2"
                                   placeholder="Apartment, studio, or floor" value={this.state.address2} onChange={this.onChange}/>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" id="city" name="city" placeholder="City"
                                       required value={this.state.city} onChange={this.onChange}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="state">State</label>
                                <input type="text" className="form-control" id="state" name="state" placeholder="State"
                                       required value={this.state.state} onChange={this.onChange}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input type="text" className="form-control" id="zip" name="zip" placeholder="Zip"
                                       required value={this.state.zip} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc">Credit Card Number</label>
                                <input className="form-control" id="cc" name="cc" type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" maxLength="19" placeholder="xxxx xxxx xxxx xxxx"
                                       required value={this.state.cc} onChange={this.onChange}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="exp">Expiration Date</label>
                                <input type="month" className="form-control" id="exp" name="exp"
                                       required value={this.state.exp} onChange={this.onChange}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" className="form-control" id="cvv" name="cvv" pattern="[0-9\s]{3}" maxLength="3" placeholder="xxx"
                                       required value={this.state.cvv} onChange={this.onChange}/>
                            </div>
                        </div>
                        <hr/>
                        <button className="btn btn-primary btn-block btn-lg" type="submit">Checkout</button>
                    </form>
                </div>
            );
        }
    }
}

export default Checkout;