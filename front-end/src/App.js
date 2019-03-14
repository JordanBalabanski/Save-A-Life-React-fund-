import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { storage } from './firebase/index';
import './App.css';
import Header from './components/HeaderAndFooter/Header';
import Footer from './components/HeaderAndFooter/Footer';
import Home from './components/Home/Home';
import Animals from './components/Animals/Animals';
import MyAnimals from './components/MyAnimals/MyAnimals';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import CreateForm from './components/CreateForm/CreateForm';
import Details from './components/PostDetails/Details';
import EditForm from './components/EditForm/EditForm';
import DeleteForm from './components/DeleteForm/DeleteForm';

import NotFound from './components/NotFound/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      if (!data.username) {
        toast.error(data.message, {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true});
      } else {
        const { message } = data;
        toast.success(message, {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true});
        this.login({username: user.username, password: user.password})
      }
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
      if (!body.username) {
        toast.error(body.message, {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true});
      } else {
        const { message, token, userId, username, isAdmin } = body
        toast.success(message, {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true});
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('isAdmin', isAdmin);
        this.setState({username: sessionStorage.getItem('username')});
      }
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
    toast.success('Logged out!', {position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true});
  }

  render() {
    return (
      <div className="App">
        <Header username={this.state.username} logout={this.logout} />
        <main>
          <ToastContainer>
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          </ToastContainer> 
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/animals" component={() => <Animals />} />
              <Route exact path="/my-animals" component={() => <MyAnimals />} />
              <Route exact path="/animal/:id" component={Details} />
              <Route exact path="/animal/:id/edit" component={EditForm} />
              <Route exact path="/animal/:id/delete" component={DeleteForm} />
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
