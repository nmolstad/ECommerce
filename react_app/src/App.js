import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from './context';
import Items from './Components/Items'
import ItemAdd from './Components/ItemAdd'
import ItemEdit from './Components/ItemEdit'
import Checkout from './Components/Checkout'
import Cart from './Components/Cart'
import Orders from './Components/Orders'
import Login from './Components/Login'
import Logout from './Components/Logout'
import NotFound from './Components/NotFound'

import './App.css';
import Navbar from "./Components/Navbar";
import axios from "axios";

class App extends Component {

    componentDidMount() {
        localStorage.setItem('username', uuidv4());
        console.log(localStorage.getItem('username'));
        axios.post(`/zuul/cart-service/createCart/${localStorage.getItem('username')}`).then(res => {
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <Provider>
                <Router>
                    <React.Fragment>
                        <Navbar />
                        <div style={{marginTop: '160px'}}>
                            <Switch>
                                <Route exact path="/" component={Items} />
                                <Route exact path="/cart" component={Cart} />
                                <Route exact path="/orders" component={Orders} />
                                <Route exact path="/add-item" component={ItemAdd} />
                                <Route exact path="/edit-item/:id" component={ItemEdit} />
                                <Route exact path="/checkout" component={Checkout} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/logout" component={Logout} />
                                <Route path="*" component={NotFound}/>
                            </Switch>
                        </div>
                    </React.Fragment>
                </Router>
            </Provider>
        );
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line no-mixed-operators
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 || 0x8);
        return v.toString(16);
    });}

export default App;
