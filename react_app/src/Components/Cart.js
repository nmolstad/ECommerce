import React, {Component} from 'react';
import axios from 'axios';
import CartItem from "./CartItem";
import Spinner from './spinner';
import {Link} from "react-router-dom";

class Cart extends Component {
    state = {
        items: {},
        total: {},
        isLoaded: false
    }

    removeItem = (id) => {
        axios.delete(`/zuul/cart-service/removeItem/${id}/${localStorage.getItem('username')}`).then(res => {
            this.setState({items: [...this.state.items.filter(item => item.id !== id)]})
            let price = 0;
            this.state.items.forEach(item => {
                price += item.quantity * item.unitPrice;
            })
            this.setState({total: price})
        }).catch(err => console.log(err));
    }

    changeQuantity = (event, id) => {
        let quantity = event.target.value;
        event.target.value = quantity;
        axios.patch(`/zuul/cart-service/changeQuantity/${id}/${quantity}/${localStorage.getItem('username')}`).then(res => {
            // eslint-disable-next-line array-callback-return
            this.setState({items: this.state.items.map(item => {
                    if(item.id === id) {
                        item.quantity = quantity;
                    }
                    return item;
                })})
            let price = 0;
            this.state.items.forEach(item => {
                price += item.quantity * item.unitPrice;
            })
            this.setState({total: price})
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        axios.get(`/zuul/cart-service/showCart/${localStorage.getItem('username')}`)
            .then(res => {
                this.setState({items: res.data.items, total: res.data.total, isLoaded: true})
            }).catch(err => {
                if(err instanceof Error) {
                    this.setState({items: undefined, isLoaded: true})
                }
        });
    }

    render() {
        const {items, total, isLoaded} = this.state;
        if (!isLoaded) {
            return <Spinner/>
        } else if (items === undefined || items.length === 0) {
            return (
                <div className="card mb-4 shadow-sm mx-3 py-4 d-flex justify-content-center">
                    <h1 className="mx-auto"><strong>There are currently no items in your cart.</strong></h1>
                    <br />
                    <Link to={`/`} className="btn btn-dark float-left mx-auto btn-lg">
                        Go to store
                    </Link>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="row mx-1">
                        <div className="col-2"></div>
                        <div className="col-8 row">
                            {items.map(item => (
                                <CartItem key={item.id} item={item} removeItem={this.removeItem} changeQuantity={this.changeQuantity}/>
                            ))}
                            <div className="row mt-3 w-100">
                                <div className="col-md-11">
                                    <h4 className="float-right"><strong>Sub-total</strong></h4>
                                </div>
                                <div className="col-md-1">
                                    <h4 className="float-right">${total.toFixed(2)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="card col-2" style={{height: '200px'}}>
                            <div className="mx-auto my-3">
                                <h3><strong>Checkout</strong></h3>
                            </div>
                            <div className="mx-2">
                                <div className="d-flex justify-content-between">
                                    <h5><strong>Sub-total</strong></h5>
                                    <h5>${total.toFixed(2)}</h5>
                                </div>
                                <hr />
                                <div className="my-3">
                                    <Link to={'/checkout'} className="btn btn-dark w-100">Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Cart;