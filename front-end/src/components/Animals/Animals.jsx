import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Animals.css';

import MDSpinner from "react-md-spinner";

class Animals extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            animals: [],
            showAnimals: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/animal/animals/all')
            .then(res => res.json())
            .then(body => this.setState({isLoading: false, animals: body.animals, showAnimals: body.animals}))
            .catch(err => console.log(err))
    }

    handleClick = (str) => {
        fetch(`http://localhost:9999/animal/animals/${str}`)
        .then(res => res.json())
        .then(body => this.setState({isLoading: false, animals: body.animals, showAnimals: body.animals}))
        .catch(err => console.log(err))
    }

    onChange = ({target}) => {
        const searchBy = target.value;
        let { showAnimals, animals } = this.state;
        showAnimals = animals.filter(animal => animal.title.toLowerCase().includes(searchBy.toLowerCase()));
        this.setState({ showAnimals })
    }
    
    render() { 

        const { showAnimals } = this.state;

        if (this.state.isLoading) {
            return <MDSpinner size={50}/>
        }

        return ( 
            <div className="album py-5 bg-light">
            <input name="Search" onChange={this.onChange} />
            <div className="categories">
                <button className="btn btn-primary" onClick={() => this.handleClick('all')}>All</button>
                <button className="btn btn-primary" onClick={() => this.handleClick('cat')}>Cats</button>
                <button className="btn btn-primary" onClick={() => this.handleClick('dog')}>Dogs</button>
                <button className="btn btn-primary" onClick={() => this.handleClick('other')}>Other</button>
            </div>
            <div className="container">
                <div className="row">
                {
                    showAnimals.map((animal) => ((
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

export default Animals;