import React, { Component } from 'react';

import './Details.css'

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            creator: null,
            title: null,
            description: null,
            imageUrls: [],
            contactName: null,
            contactInfo: null,
            isLoading: true
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        const { id } = this.props.match.params;

        fetch(`http://localhost:9999/animal/${id}`)
            .then(res => res.json())
            .then(animal => this.setState({
                isLoading: false, 
                creator: animal.creator.username,
                title: animal.title,
                description: animal.description,
                imageUrl: animal.imageUrl,
                contactName: animal.contactName,
                contactInfo: animal.contactInfo
            }))
            .catch(err => console.log(err))
    }

    render() { 

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
                </section>
                <hr />

            </div>
        );
    }
}
 
export default Details;