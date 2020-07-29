import React, {Component} from 'react';
import { Link} from "react-router-dom";
import axios from 'axios';

import PropTypes from 'prop-types';

class Item extends Component {
    addToCart = (item) => {
        axios({
            method: 'post',
            url: `/zuul/cart-service/addToCart/${localStorage.getItem('username')}`,
            data: {
                "id": parseInt(item.id),
                "title": item.title,
                "description": item.description,
                "unitPrice": item.unitPrice.toFixed(2),
                "quantity": 1
            }
        }).then(res => {
            this.setState({items:res.data})
        }).catch(err => console.log(err));
    }

    render() {
        const { id, title, description, unitPrice } = this.props.item;
        return (
            <div className='col-md-3'>
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h3><strong>{title}</strong></h3>
                        <p className="card-text">{description}</p>
                        <p className="card-text">${unitPrice.toFixed(2)}</p>
                        <button className="btn btn-dark m-1" onClick={this.addToCart.bind(this, this.props.item)}>Add to cart</button>
                        <div className="float-right">
                            <Link to={`/edit-item/${id}`} className="btn btn-info m-1">Edit item</Link>
                            <button className="btn btn-danger m-1" onClick={this.props.deleteItem.bind(this, id)}><i
                                className="fas fa-trash"> Delete</i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired
}

const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'
}

export default Item;