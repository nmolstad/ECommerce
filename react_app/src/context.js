import React, {Component, useReducer} from 'react';
import axios from "axios";

const Context = React.createContext(undefined);

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: action.payload
            };
        case 'EDIT_ITEM':
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        items:[],
        isLoaded: false,
        dispatch: action => this.setState(state => reducer(state, action))
    }

    deleteItem = (id) => {
        axios.delete(`/zuul/item-service/${id}`).then(res => {
            this.setState({items:[...this.state.items.filter(item => item.id != id)]})
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        axios.get(`/zuul/item-service`).then(res => {
            this.setState({items:res.data, isLoaded: true})
        }).catch(err => {
            if(err instanceof Error) {
                this.setState({isLoaded: true})
            }
        });
    }

    render() {
        return (
            <Context.Provider value={{state: this.state, deleteItem: this.deleteItem, addItem: this.addItem}}>
                {this.props.children}
            </Context.Provider>
        );
    }
}



export const Comsumer = Context.Consumer;