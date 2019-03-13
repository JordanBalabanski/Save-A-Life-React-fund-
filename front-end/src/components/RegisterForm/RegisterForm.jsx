import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import './RegisterForm.css'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: sessionStorage.getItem('username'),
            password: null,
            confirmPassword: null,
            error: null,
            message: null
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { username, password, confirmPassword } = this.state;

        if (password === confirmPassword && username) {
            this.props.register({ username, password });
        } else {
            this.setState({
                error: 'Please fill the fields correctly!'
            })
        }
    }

    onChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    }

    render() { 
        const {username} = this.state

        if (sessionStorage.getItem('username')) {
            return <Redirect to='/' />
        }

        return ( 
            <form onSubmit={this.onSubmit} className="RegisterForm">
                <h1>Register</h1>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input 
                        onChange={this.onChange}
                        type="password" 
                        className="form-control" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="Confirm password" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        );
    }
}

export default RegisterForm;