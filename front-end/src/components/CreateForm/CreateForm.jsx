import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { storage } from '../../firebase';
import './CreateForm.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null,
            creator: sessionStorage.getItem('userId'),
            title: null,
            description: null,
            category: null,
            images: [],
            imageUrls: [],
            contactName: null,
            contactInfo: null,
            redirect: false
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {images} = this.state;

        images.forEach(img => {
        const uploadTask = storage.ref(`images/${img.name}`).put(img);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // progrss function ....
        }, 
        (error) => {
            // error function ....
            console.log(error);
        }, 
        () => {
            // complete function ....
            storage.ref('images').child(img.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({
                imageUrls: [url, ...this.state.imageUrls]
                })
            })
        });
        })

        const { creator, title, description, category, imageUrls, contactName, contactInfo } = this.state;

        fetch('http://localhost:9999/animal/create', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ creator, title, description, category, imageUrls, contactName, contactInfo })
            }).then(res=>res.json())
            .then(body=>{
                this.setState({
                    id: body.animal._id,
                    redirect: true
                })
            }).catch(err => console.log(err))
    }

    onChange = ({target}) => {
        if (target.files) {
        const images = Array.from(target.files);
        this.setState({
            [target.name]: images
        })
        } else {
        this.setState({
            [target.name]: target.value
        })
        }
    }

    handleUpload = () => {
        
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={`animal/${this.state.id}`} />
        }

        return (
            <form onSubmit={this.onSubmit} encType="multipart/form-data" className="CreateForm">
            <h1>Create a post</h1>
            <div className="form-group">
                <label htmlFor="image">Upload photo</label>
                <input 
                    onChange={this.onChange}
                    type="file" 
                    className="form-control" 
                    name="images" 
                    id="images"
                    multiple={true}
                />
            </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                    onChange={this.onChange}
                    type="text" 
                    className="form-control" 
                    name="title" 
                    id="title"
                    placeholder="Enter title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                    onChange={this.onChange}
                    className="form-control" 
                    name="description" 
                    id="description"
                    placeholder="Enter description">
                </textarea>
            </div>
            <div className="form-group">
                <label htmlFor="category">Select category</label>
                <select className="form-control" onChange={this.onChange} name="category" id="category">
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="contactName">Contact Name</label>
                <input 
                    onChange={this.onChange}
                    type="text" 
                    className="form-control" 
                    name="contactName" 
                    id="contactName" 
                    placeholder="Enter contact name" 
                />
            </div>
            <div className="form-group">
                <label htmlFor="contactInfo">Contact Info</label>
                <input 
                    onChange={this.onChange}
                    type="text" 
                    className="form-control" 
                    name="contactInfo" 
                    id="contactInfo" 
                    placeholder="Enter contact info"
                />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
            </form>
        );
    }
}

export default App;