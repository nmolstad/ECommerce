import React, {Component, createRef} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Comsumer} from "../context";
import axios from "axios";

class ItemAdd extends Component {
    state = {
        title: '',
        description: '',
        price: '',
        redirect: false
    }

    addItem = (state, e) => {
        e.preventDefault();

        var price = parseFloat(this.state.price);
        price = price.toFixed(2)

        axios({
            method: 'post',
            url: `/zuul/item-service`,
            data: {
                "title": this.state.title,
                "description": this.state.description,
                "unitPrice": price
            }
        }).then(res => {
           let items = state.items.push(res.data);
           
            state.dispatch({
                type: 'ADD_ITEM',
                payload: state.items
            })

            this.setState({redirect: true})
        }).catch(err => console.log(err));
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/' />
        } else {
            return (
                <Comsumer>
                    {value => {
                        return (
                            <div className="mx-5">
                                <h1>Create Item</h1>
                                <hr/>
                                <br/>
                                <form onSubmit={this.addItem.bind(this, value.state)}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="title" name='title'
                                               placeholder="Title" required value={this.state.title} onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" id="description" name='description' rows="3" required value={this.state.description} onChange={this.onChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <input type="number" className="form-control" id="price" name='price'
                                               placeholder="Price" min="0.01" step="0.01" required value={this.state.price} onChange={this.onChange}/>
                                    </div>
                                    <hr/>
                                    <button className="btn btn-lg btn-dark btn-block" type='submit'>Create Item</button>
                                </form>
                            </div>
                        )
                    }}
                </Comsumer>
            );
        }
    }

}

export default ItemAdd;