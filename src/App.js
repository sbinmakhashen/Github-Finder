import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search'
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  // async and await
  async componentDidMount(){
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });

    this.setState({users: res.data, loading: false});
  }

  render(){
   return (
     <div className="App">
       <Navbar />
       <div className="container">
         <Search />
       <Users loading= {this.state.loading} users= {this.state.users} />
       </div>
     </div>
   );
 }
}

export default App;
