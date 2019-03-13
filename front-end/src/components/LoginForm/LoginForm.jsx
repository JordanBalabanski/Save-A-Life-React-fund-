import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './LoginForm.css'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: null,
            password: null,
            error: null,
            message: null
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { username, password } = this.state;

        this.props.login({ username, password });
    }

    onChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    }

    render() { 

        if (sessionStorage.getItem('username')) {
            return <Redirect to='/' />
        }

        return ( 
            <form onSubmit={this.onSubmit} className="LoginForm">
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        onChange={this.onChange}
                        type="text" 
                        className="form-control" 
                        name="username" 
                        id="username"
                        placeholder="Enter username" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={this.onChange}
                        type="password" 
                        className="form-control" 
                        name="password" 
                        id="password" 
                        placeholder="Enter password" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        );
    }
}

export default LoginForm;