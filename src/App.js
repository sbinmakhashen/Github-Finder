import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/Pages/About';
import GithubState from './Context/github/GithubState';

const App = () => {
  const [alert, setAlert] = useState(null);

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
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};
export default App;
