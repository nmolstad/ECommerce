import React, {Component} from 'react';
import Item from './Item';
import Spinner from './spinner';
import {Comsumer} from "../context";
import axios from "axios";

class Items extends Component {
    render() {
        return (
            <Comsumer>
                {value => {
                    const { items, isLoaded } = value.state;
                    if(!isLoaded) {
                        return <Spinner/>
                    } else if(items === undefined || items.length === 0) {
                        return (
                            <div className="card mb-4 shadow-sm mx-3 py-4 d-flex justify-content-center">
                                <h1 className="mx-auto"><strong>There are currently no items.</strong></h1>
                            </div>
                        )
                    } else {
                        return (
                            <React.Fragment>
                                <div className="row mx-1">
                                    {items.map(item => (
                                        <Item key={item.id} item={item} deleteItem={value.deleteItem}/>
                                    ))}
                                </div>
                            </React.Fragment>
                        )

                    }
                }}
            </Comsumer>
        );


    }
}

export default Items;

