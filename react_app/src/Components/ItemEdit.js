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

    editItem = (state, e) => {
        const id = this.props.match.params.id;

        e.preventDefault();

        var price = parseFloat(this.state.price);
        price = price.toFixed(2)

        axios({
            method: 'patch',
            url: `/zuul/item-service/${id}`,
            data: {
                "title": this.state.title,
                "description": this.state.description,
                "unitPrice": price
            }
        }).then(res => {
            state.items = state.items.map(item => {
                if(item.id == id) {
                    item = res.data;
                }
                return item;
            })

            state.dispatch({
                type: 'EDIT_ITEM',
                payload: state.items
            })

            this.setState({redirect: true})
        }).catch(err => console.log(err));
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        axios.get(`/zuul/item-service/${this.props.match.params.id}`)
            .then(res => {
                this.setState({title: res.data.title, description: res.data.description, price: res.data.unitPrice.toFixed(2)})
            }).catch(err => {
            if(err instanceof Error) {
                this.setState({items: undefined, isLoaded: true})
            }
        });
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/'/>
        } else {
            return (
                <Comsumer>
                    {value => {
                        return (
                            <div className="mx-5">
                                <h1>Edit Item</h1>
                                <hr/>
                                <br/>
                                <form onSubmit={this.editItem.bind(this, value.state)}>
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
                                    <button className="btn btn-lg btn-dark btn-block" type='submit'>Update Item</button>
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