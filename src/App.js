import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/Pages/About';
import axios from 'axios';

import GithubState from './Context/github/GithubState';
import PropTypes from 'prop-types';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // search github users
  const searchUsers = async (text) => {
    // loading spinner to true
    setLoading(true);
    // searching for github users
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    setLoading(false);
    setUsers(res.data.items);
  };

  // Getting data from a single user
  const getUser = async (username) => {
    // loading spinner to true
    setLoading(true);
    // searching for github users
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    setLoading(false);
    setUser(res.data);
  };
  // Getting the user's repos
  const getUserRepos = async (username) => {
    // loading spinner to true
    setLoading(true);
    // searching for github users
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    setRepos(res.data);
    setLoading(false);
  };
  // clearing the users in the clear btn
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // setAlert to give an alert whne user submits  an empty str
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 4000);
  };
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};
export default App;
