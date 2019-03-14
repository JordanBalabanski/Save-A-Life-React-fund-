import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { storage } from '../../firebase';
import './CreateForm.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null,
            creator: sessionStorage.getItem('userId'),
            title: null,
            description: null,
            category: null,
            image: null,
            contactName: null,
            contactInfo: null,
            redirect: false
        }
    }

    onSubmit = async function (event) {
        event.preventDefault();

        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            }, 
            (error) => {
                // error function ....
                console.log(error);
            }, 
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(imageUrl => {
                    const { creator, title, description, category, contactName } = this.state;
                    const contactInfo = this.state.contactInfo || 'Sorry, the user hasn\'t provided contact info. Try the comment section below to connect.';
                    const imageName = image.name
        
                fetch('http://localhost:9999/animal/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ creator, title, description, category, imageUrl, imageName, contactName, contactInfo })
                    }).then(res=>res.json())
                    .then(body=>{
                        if (!body.animal) {
                            toast.error(body.message, {position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true});
                        } else {
                            const { message } = body
                            toast.success(message, {position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true});
                            this.setState({
                                id: body.animal._id.toString(),
                                redirect: true
                            })
                        }
                    }).catch(err => console.log(err))
                })
        });


        

    }

    onChange = ({target}) => {
        if (target.files) {
        const images = Array.from(target.files);
        this.setState({
            [target.name]: target.files[0]
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
            <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data" className="CreateForm">
            <h1>Create a post</h1>
            <div className="form-group">
                <label htmlFor="image">Upload photo</label>
                <input 
                    onChange={this.onChange}
                    type="file" 
                    className="form-control" 
                    name="image" 
                    id="image"
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
                    <option disabled selected hidden>Select category</option>
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

export default CreateForm;
