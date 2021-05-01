import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  // async and await
  async componentDidMount(){
    // console.log(REACT_APP_GITHUB_CLIENT_SECRETS)
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETS}`);

    this.setState({users: res.data, loading: false});
  }

  render(){
   return (
     <div className="App">
       <Navbar />
       <div className="container">
       <Users loading= {this.state.loading} users= {this.state.users} />
       </div>
     </div>
   );
 }
}

export default App;
