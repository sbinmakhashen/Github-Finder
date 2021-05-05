import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/Pages/About'
import axios from 'axios';
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // search github users
    searchUsers = async text => {
      // loading spinner to true
      this.setState({loading: true});
      // searching for github users
      const res = await axios.get(`https://api.github.com/search/users?q=${text}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      });
      this.setState({loading: false, users: res.data.items});
    }
    // Getting data from a single user
    getUser = async username => {
      this.setState({loading: true})
      const res = await axios.get(`https://api.github.com/search/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      })
      this.setState({loading: false, user: res.data})
    }
    
    // clearing the users in the clear btn
    clearUsers = () => this.setState({users: [], loading: false});

    // setAlert to give an alert whne user submits  an empty str
    setAlert = (msg, type) => {
      this.setState({ alert: {msg, type} })
      setTimeout(() => this.setState({alert: null}), 4000)
    }
  render(){
    const {users, user, loading} = this.state
   return (
     <Router>
     <div className="App">
       <Navbar />
       <div className="container">
         <Alert alert={this.state.alert} />
         <Switch>
           <Route exact path='/' render={props => (
             <Fragment>
               <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
       <Users loading= {loading} users= {users} />
             </Fragment>
           )} />
           <Route exact path='/about' component={About} />
           <Route exact path='/user/:login' render={props => (
             <User { ...props} getUser={this.getUser} user={user} loading={loading} />
           )} 
           />
         </Switch>
         
       </div>
     </div>
     </Router>
   );
 }
}
export default App;
