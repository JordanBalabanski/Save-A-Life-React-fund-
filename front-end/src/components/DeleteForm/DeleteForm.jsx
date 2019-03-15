import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { storage } from '../../firebase';
import './DeleteForm.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MDSpinner from "react-md-spinner";

class DeleteForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null,
            imageUrl: '',
            title: '',
            description: '',
            category: '',
            image: '',
            imageName: '',
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

        storage.ref('images').child(`${this.state.imageName}`).delete().then(() => {
            
            fetch(`http://localhost:9999/animal/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(res=>res.json())
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
        });
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:9999/animal/${id}/delete`, { 
            method: 'GET', 
            headers: { 
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(body => { 
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
                    const {animal} = body;
                    this.setState({
                    isLoading: false, 
                    id: animal._id,
                    imageUrl: animal.imageUrl,
                    title: animal.title,
                    description: animal.description,
                    imageName: animal.imageName,
                    contactName: animal.contactName,
                    contactInfo: animal.contactInfo,
            })}})
            .catch(err => console.log(err))
        }

    render() {

        const { creator, title, description, imageUrl, contactName, contactInfo } = this.state; 

        if (this.state.errorRedirect) {
            return <Redirect to="/" />
        }

        if (this.state.redirect) {
            return <Redirect to={`/animals`} />
        }

        if (this.state.isLoading) {
            return <MDSpinner size={50}/>
        }

        return (
            <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data" className="CreateForm">
                <h1>Delete post</h1>
                <section className="info">
                    <h1>Title: { title }</h1>
                    <img className="picture" src={imageUrl}
                        alt="Animal in need" />
                    <p>Description: {description}</p>
                    <p>Created by: {creator}</p>
                    <p>Contact name: {contactName}</p>
                    <p>Contact info: {contactInfo}</p>
                </section>
            <button type="submit" className="btn btn-danger">Delete</button>
            </form>
        );
    }
}

export default DeleteForm;
