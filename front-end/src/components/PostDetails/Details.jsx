import React, { Component } from 'react';

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

        fetch('http://localhost:9999/animal/' + id)
            .then(res => res.json())
            .then(animal => this.setState({
                isLoading: false, 
                creator: animal.creator.username,
                title: animal.title,
                description: animal.description,
                imageUrls: animal.imageUrls,
                contactName: animal.contactName,
                contactInfo: animal.contactInfo
            }))
            .catch(err => console.log(err))
    }

    render() { 

        const { creator, title, description, imageUrls, contactName, contactInfo } = this.state; 

        if (this.state.isLoading) {
            return <span>Loading!...</span>
        }

        return ( 
            <div>
                <section className="info">
                    <h1>{ title }</h1>
                    <div className="row">
                {
                    imageUrls.map((img) => ((
                        <div className="col-md-4" key={img._id}>
                            <div className="card mb-4 box-shadow">
                                <img className="card-img-top" src={img.imageUrls[0]}
                                    alt="Animal in need" />
                            </div>
                        </div>
                    )))
                }
                </div>
                    <p>{description}</p>
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