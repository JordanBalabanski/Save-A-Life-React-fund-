import React, { Component, Fragment } from 'react';
import './Details.css';

import CommentSection from '../CommentSection/CommentSection';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            creator: null,
            title: null,
            description: null,
            imageUrl: null,
            contactName: null,
            contactInfo: null,
            isLoading: true,
            id: null
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        const { id } = this.props.match.params;

        fetch(`http://localhost:9999/animal/${id}`)
            .then(res => res.json())
            .then(animal => {console.log(animal); this.setState({
                isLoading: false, 
                id: animal._id,
                creator: animal.creator.username,
                title: animal.title,
                description: animal.description,
                imageUrl: animal.imageUrl,
                contactName: animal.contactName,
                contactInfo: animal.contactInfo
            })})
            .catch(err => console.log(err))
    }

    render() { 
        const username = sessionStorage.getItem('username');
        const isAdmin = sessionStorage.getItem('isAdmin');
        const { creator, title, description, imageUrl, contactName, contactInfo } = this.state; 

        if (this.state.isLoading) {
            return <span>Loading!...</span>
        }

        return ( 
            <div>
                <section className="info">
                    <h1>Title: { title }</h1>
                    <img className="picture" src={imageUrl}
                        alt="Animal in need" />
                    <p>Description: {description}</p>
                    <p>Created by: {creator}</p>
                    <p>Contact name: {contactName}</p>
                    <p>Contact info: {contactInfo}</p>
                    { username === creator ?
                    <Fragment>
                        <button type="button" className="btn btn-primary">Edit</button> 
                        <button type="button" className="btn btn-danger">Delete</button>
                    </Fragment>
                    : isAdmin === "true" ?
                    <button type="button" className="btn btn-danger">Delete</button>
                    : null
                    }
                </section>
                <hr />
                <CommentSection article={this.state.id}/>
            </div>
        );
    }
}
 
export default Details;