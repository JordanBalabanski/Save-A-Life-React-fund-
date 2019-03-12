import React, { Component } from 'react';
import './CommentSection.css';

class CommentSection extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            comments: [],
            isLoading: true,
            content: null
        }
    }

    onChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    onSubmit = ({ target }) => {
        const { content } = this.state
        const author = sessionStorage.getItem('username') || 'Guest';
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true' || false;
        const post = this.props.article;

        fetch(`http://localhost:9999/animal/${post}/comment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ content, author, isAdmin, post })
        }).then(res => res.json())
        .then(body => {this.setState({
            comments: [ body.comment, ...this.state.comments]
        })}).catch(error=>console.log(error))
    }

    componentDidMount() {
        fetch(`http://localhost:9999/animal/${this.props.article}/comments`)
        .then(res => res.json())
        .then(comments => this.setState({isLoading: false ,comments}))
        .catch(error => console.log(error))
    }

    render() { 

        if (this.state.isLoading) {
            return <span>Loading!...</span>
        }

        return (
            <div className="CommentSection">
                <form onSubmit={this.onSubmit}>
                    <textarea 
                        onChange={this.onChange}
                        className="form-control" 
                        name="content" 
                        id="content"
                        placeholder="Enter comment">
                    </textarea>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
                {
                    this.state.comments.map(comment => (
                        <div className={ (comment.isAdmin === 'true' || comment.author === sessionStorage.getItem('username'))? "comment lightcoral" : "comment lightblue"}>
                            <div className={ (comment.isAdmin === 'true' || comment.author === sessionStorage.getItem('username'))? "creator red" : "creator blue"}>
                                <span className="username">{comment.author}</span>
                                <span className="date">{comment.creationDate}</span>
                            </div>
                            <p className="content">{comment.content}</p>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default CommentSection;