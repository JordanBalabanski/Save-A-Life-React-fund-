import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom'
import logo from './logo.png'
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
                <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div>
                        <Link to="/">
                            <img className="logo" src={logo} />
                        </Link>
                    </div>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/animals">View Animals</NavLink>
                        </li>
                        {
                            this.props.username ? 
                            (<Fragment><li className="nav-item">
                                <NavLink className="nav-link" to="/my-animals">My Animals</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/create-post">Create post</NavLink>
                            </li></Fragment>) : null
                        }
                    </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                        </form>
                            {
                                this.props.username ? (<ul className="navbar-nav mr-right mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <span className="nav-link">Welcome, {this.props.username}!</span>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                    </li>
                                </ul>) :
                                (<ul className="navbar-nav mr-right mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                </ul>)
                            }
                    </nav>
                </header>
        );
    }
}

export default Header;