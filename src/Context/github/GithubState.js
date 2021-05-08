import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';
import githubContext from './githubContext';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users

  const searchUsers = async (text) => {
    // loading spinner to true
    setLoading();
    // searching for github users
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async (username) => {
    // loading spinner to true
    setLoading();
    // searching for github users
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    // loading spinner to true
    setLoading();
    // searching for github users
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
