import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { storage } from '../../firebase';
import './EditForm.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MDSpinner from "react-md-spinner";

class EditForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null,
            title: '',
            description: '',
            category: '',
            image: '',
            oldImageName: '',
            contactName: '',
            contactInfo: '',
            redirect: false,
            errorRedirect: false,
            isLoading: true
        }
    }

    onSubmit = async function (event) {
        event.preventDefault();

        const { id } = this.props.match.params;
        const {image} = this.state;

        if(image){
            await storage.ref('images').child(`${this.state.oldImageName}`).delete();
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
                        const { title, description, category, contactName, contactInfo } = this.state;
                        const imageName = image.name;

            
                    fetch(`http://localhost:9999/animal/${id}/edit`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                            },
                            body: JSON.stringify({ title, description, category, imageUrl, imageName, contactName, contactInfo })
                        }).then(res=>res.json())
                        .then(body=>{
                            if (body.message === 'Unauthorized!') {
                                toast.error(body.message, {position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true})
                                this.setState({
                                    errorRedirect: true
                                })
                            } else {
                                toast.success(body.message, {position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true})
                                this.setState({
                                    redirect: true
                                })
                            }
                        }).catch(err => console.log(err))
                    })
            });
        } else {
            const { title, description, category, contactName, contactInfo } = this.state;
            fetch(`http://localhost:9999/animal/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, description, category, contactName, contactInfo })
            }).then(res=>res.json())
                .then(body=>{
                    if (body.message === 'Unauthorized!') {
                        toast.error(body.message, {position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true})
                        this.setState({
                            errorRedirect: true
                        })
                    } else {
                        toast.success(body.message, {position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true})
                        this.setState({
                            redirect: true
                        })
                    }
                }).catch(err => console.log(err))
            }
        
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

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:9999/animal/${id}/edit`, { 
            method: 'GET', 
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(body => { 
                const {message, animal} = body;
                if(animal){
                    this.setState({
                    isLoading: false, 
                    id: animal._id,
                    title: animal.title,
                    description: animal.description,
                    oldImageName: animal.imageName,
                    contactName: animal.contactName,
                    contactInfo: animal.contactInfo,
                    })
                } else {
                    this.setState({errorRedirect:true});
                }
            })
            .catch(err => console.log(err))
        }

    render() {

        const { title, description, contactName, contactInfo } = this.state; 

        if (this.state.errorRedirect) {
            return <Redirect to="/" />
        }

        if (this.state.redirect) {
            return <Redirect to={`/animal/${this.state.id}`} />
        }

        if (this.state.isLoading) {
            return <MDSpinner size={50}/>
        }

        return (
            <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data" className="CreateForm">
            <h1>Edit post</h1>
            <div className="form-group">
                <label htmlFor="image">Change photo</label>
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
                    value={title}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                    onChange={this.onChange}
                    className="form-control" 
                    name="description" 
                    id="description"
                    value={description}>
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
                    value={contactName}
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
                    value={contactInfo}
                />
            </div>
            <button type="submit" className="btn btn-primary">Edit</button>
            </form>
        );
    }
}

export default EditForm;
