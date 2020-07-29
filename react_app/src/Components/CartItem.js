import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CartItem extends Component {
    render() {
        const { id, title , unitPrice, quantity, subtotal } = this.props.item;
        return (
            <div className='col-md-12'>
                <div className="card">
                    <div className="card-body row">
                        <div className="col-md-6">
                            <h3><strong>{title}</strong></h3>
                            <p className="card-text">${unitPrice.toFixed(2)}</p>
                        </div>
                        <div className="col-md-6">
                            <div className="mt-4 float-right">
                                <form className="form-inline">
                                    <label className="my-1 mr-2" htmlFor="quantity">Quantity</label>
                                    <select className="custom-select my-1 mr-sm-2" value={quantity} id="quantity" onChange={(e) => this.props.changeQuantity(e, id)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <button type="button" className="btn btn-danger m-1" onClick={this.props.removeItem.bind(this, id)}>Remove item</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;