import React, { Component } from 'react';
import { storage } from './firebase/index';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: null,
      description: null,
      image: null,
      imageUrl: null,
      contactName: null
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    console.log('Why ???');
    console.log(this.state);

  //   fetch('http://localhost:9999/animal/create', {
  //           method: 'POST',
  //           headers: {
  //               'content-type': 'application/json',
  //           },
  //           body: JSON.stringify(this.state)
  //       })
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
    const {image} = this.state;

    image.forEach(img => {
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
              imageUrl: [url, this.state.imageUrl]
            })
        })
      });
    })
}

  render() {
    return (
      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <a className="navbar-brand" href="#">Navbar</a>
      //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      //     <span className="navbar-toggler-icon"></span>
      //   </button>

      //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="nav-item active">
      //         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="#">Link</a>
      //       </li>
      //       <li className="nav-item dropdown">
      //         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      //           Dropdown
      //         </a>
      //         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      //           <a className="dropdown-item" href="#">Action</a>
      //           <a className="dropdown-item" href="#">Another action</a>
      //           <div className="dropdown-divider"></div>
      //           <a className="dropdown-item" href="#">Something else here</a>
      //         </div>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link disabled" href="#">Disabled</a>
      //       </li>
      //     </ul>
      //     <form className="form-inline my-2 my-lg-0">
      //       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      //       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      //     </form>
      //   </div>
      // </nav>
      <div className="App">
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <label>Title: </label>
          <input type="text" name="title" onChange={this.onChange} />
          <label>Description: </label>
          <input type="text" name="description" onChange={this.onChange} />
          <label>Contact Name: </label>
          <input type="text" name="contactName" onChange={this.onChange} />
          <label>Image: </label>
          <input type="file" multiple={true} name="image" onChange={this.onChange} />
          <button onClick={this.handleUpload.bind(this)}>Upload</button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
