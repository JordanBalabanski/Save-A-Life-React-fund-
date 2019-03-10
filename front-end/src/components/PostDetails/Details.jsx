import React, { Component } from 'react';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            creator: null,
            title: null,
            description: null,
            category: null,
            imageUrls: [],
            contactName: null,
            contactInfo: null,
            isLoading: true
        }
    }
    render() { 
        if (this.state.isLoading) {
            return <span>Loading!...</span>
        }

        return ( 
            <span>hi</span>
        );
    }
}
 
export default Details;