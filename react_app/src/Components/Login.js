import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Login extends Component {
    state = {
        username: '',
        password: '',
        redirect: false
    }

    login = (e) => {
        e.preventDefault();

        var config = {
            method: 'get',
            url: `/user-repository/${this.state.username}/${this.state.password}`,
        };

        axios(config).then(res => {
            if(res.data) {
                localStorage.setItem('user', this.state.username);
                let credentials = btoa(`${this.state.username}:${this.state.password}`)
                localStorage.setItem('credentials', credentials);
            }

            this.setState({redirect: true})
        }).catch(err => console.log(err));
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/orders" />
        } else {
            return (
                <div className="mx-5">
                    <h1>Login</h1>
                    <hr/>
                    <br/>
                    <form onSubmit={this.login.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" name='username'
                                   placeholder="Username" required value={this.state.title} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Password</label>
                            <input type="password" className="form-control" id="password" name='password'
                                   placeholder="Password" required value={this.state.title} onChange={this.onChange}/>
                        </div>
                        <hr/>
                        <button className="btn btn-lg btn-dark btn-block" type='submit'>Login</button>
                    </form>
                </div>
            );
        }
    }
}

export default Login;