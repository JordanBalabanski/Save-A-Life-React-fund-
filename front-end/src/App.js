import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { storage } from './firebase/index';
import './App.css';
import Header from './components/HeaderAndFooter/Header';
import Footer from './components/HeaderAndFooter/Footer';
import Home from './components/Home/Home';
import Animals from './components/Animals/Animals';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import CreateForm from './components/CreateForm/CreateForm';
import Details from './components/PostDetails/Details';

import NotFound from './components/NotFound/NotFound';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: sessionStorage.getItem('username'),
      isAdmin: sessionStorage.getItem('isAdmin')
    }
  }

  register = (user) => {
    fetch(`http://localhost:9999/auth/signup`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
    .then((data) => {
      this.login({username: user.username, password: user.password})
    })
  }

  login(user) {
    fetch(`http://localhost:9999/auth/signin`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
    .then(body => {
        const { message, token, userId, username, isAdmin } = body
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('isAdmin', isAdmin);
        this.setState({username: sessionStorage.getItem('username')});
    })
    .catch(err => console.log(err));
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
      <div className="App">
        <Header username={this.state.username}/>
        <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/animals" component={() => <Animals />} />
              <Route exact path="/animal/:id" component={Details} />
              <Route exact path="/register" render={() => <RegisterForm register={this.register} />} />
              <Route exact path="/login" component={() => <LoginForm login={this.login} />} />
              <Route exact path="/create-post" component={() => <CreateForm />} />
              <Route component={NotFound} />
            </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
