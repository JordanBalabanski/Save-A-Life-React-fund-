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
import EditForm from './components/EditForm/EditForm';

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

  login = (user) => {
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
        this.setState({username: sessionStorage.getItem('username'), message});
    })
    .catch(err => console.log(err));
  }

  logout = () => {
    this.setState({
      username: null,
      isAdmin: false
    })
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAdmin');
  }

  render() {
    return (
      <div className="App">
        <Header username={this.state.username} logout={this.logout} />
        <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/animals" component={() => <Animals />} />
              <Route exact path="/animal/:id" component={Details} />
              <Route exact path="/animal/:id/edit" component={EditForm} />
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
