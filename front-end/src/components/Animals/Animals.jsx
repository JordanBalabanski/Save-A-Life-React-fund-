import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Animals.css';

class Animals extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            animals: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/animal/animals/all')
            .then(res => res.json())
            .then(body => this.setState({isLoading: false, animals: body.animals}))
            .catch(err => console.log(err))
    }

    handleClick = (str) => {
        fetch(`http://localhost:9999/animal/animals/${str}`)
        .then(res => res.json())
        .then(body => this.setState({isLoading: false, animals: body.animals}))
        .catch(err => console.log(err))
    }

    render() { 

        const { animals } = this.state;

        if (this.state.isLoading) {
            return <span>Loading!...</span>
        }

        return ( 
            <div className="album py-5 bg-light">
            <div className="categories">
                <button className="btn btn-primary" onClick={() => this.handleClick('all')}>All</button>
                <button className="btn btn-primary" onClick={() => this.handleClick('cat')}>Cats</button>
                <button className="btn btn-primary" onClick={() => this.handleClick('dog')}>Dogs</button>
                <button className="btn btn-primary" onClick={() => this.handleClick('other')}>Other</button>
            </div>
            <div className="container">
                <div className="row">
                {
                    animals.map((animal) => ((
                        <div className="col-md-4" key={animal._id}>
                            <Link to={`animal/${animal._id}`} >
                            <div className="card mb-4 box-shadow">
                                <img className="card-img-top" src={animal.imageUrls[0]}
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

export default Animals;