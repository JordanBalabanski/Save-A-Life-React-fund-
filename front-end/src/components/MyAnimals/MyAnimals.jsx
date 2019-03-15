import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import MDSpinner from "react-md-spinner";

class MyAnimals extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            animals: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/animal/my-animals', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(animals => this.setState({isLoading: false, animals}))
            .catch(err => console.log(err))
    }
    
    render() { 

        const { animals } = this.state;

        if (!sessionStorage.getItem('username')) {
            return <Redirect to="/animals" />
        }

        if (this.state.isLoading) {
            return <MDSpinner size={50}/>
        }

        return ( 
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                    {
                        animals.map((animal) => ((
                            <div className="col-md-4" key={animal._id}>
                                <Link to={`/animal/${animal._id}`} >
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top" src={animal.imageUrl}
                                        alt="Animal in need" />
                                    <hr />
                                    <div className="card-body">
                                        <p className="card-text">{animal.title}</p>
                                        <p className="card-text">Created by: {animal.creator.username}</p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        )))
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default MyAnimals;