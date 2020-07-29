import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Order from "./Order";
import axios from "axios";
import Spinner from "./spinner";

class Orders extends Component {
    state = {
        orders: {},
        filteredOrders: {},
        isLoaded: false
    }

    filterOrders = (e) => {
        let filter = e.target.value;
        let filtered;

        switch (filter) {
            case 'all':
                this.setState({filteredOrders: this.state.orders});
                break;
            case 'shipped':
                filtered = this.state.orders.filter(order => order.shipped === true);
                this.setState({filteredOrders: filtered});
                break;
            case 'not-shipped':
                filtered = this.state.orders.filter(order => order.shipped === false);
                this.setState({filteredOrders: filtered});
                break;
        }
    }

    setShipped = (id, carrier, trackNo, e) => {
        e.preventDefault();

        let url = `/zuul/order-service/${id}/${carrier}/${trackNo}`;
        console.log(url)

        if (localStorage.getItem('user') && carrier.length > 0) {
            axios({
                method: 'patch',
                url: url,
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('credentials')}`
                }
            }).then(res => {
                this.setState({orders: this.state.orders.map(order => {
                        if(order.id === id) {
                            order = res.data;
                        }
                        return order;
                    })})
                this.setState({filteredOrders: this.state.orders});
            }).catch(err => this.setState({orders: undefined, isLoaded: true}));
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            axios({
                method: 'get',
                url: `/zuul/order-service`,
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('credentials')}`
                }
            }).then(res => {
                this.setState({orders: res.data, filteredOrders: res.data, isLoaded: true})
                console.log(this.state.orders)
            }).catch(err => this.setState({items: undefined, isLoaded: true}));
        }
    }

    render() {
        if (localStorage.getItem('user')) {
            if (this.state.isLoaded) {
                let select = (
                    <div className="form-group mx-2">
                        <label htmlFor="filter" className="mx-1">Filter</label>
                        <select name="filter" id="filter" onChange={this.filterOrders}>
                            <option value="all">All</option>
                            <option value="shipped">Shipped</option>
                            <option value="not-shipped">Not Shipped</option>
                        </select>
                    </div>
                );
                let orders = this.state.filteredOrders === undefined || this.state.filteredOrders.length === 0 ? (
                    <div className="card mb-4 shadow-sm mx-3 py-4 d-flex justify-content-center">
                        <h1 className="mx-auto"><strong>No orders.</strong></h1>
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="row mx-1">
                            {this.state.filteredOrders.map(order => (
                                <Order key={order.id} order={order} setShipped={this.setShipped}/>
                            ))}
                        </div>
                    </React.Fragment>
                );
                return (
                    <React.Fragment>
                        {select}
                        {orders}
                    </React.Fragment>
                );

            } else {
                return <Spinner/>
            }
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default Orders;