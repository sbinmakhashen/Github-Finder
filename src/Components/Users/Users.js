import React, { useContext } from 'react';
import UserItems from './UserItems';
import Spinner from '../Layout/Spinner';
import GithubContext from '../../Context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={gridUsers}>
        {users.map((user) => (
          <UserItems key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const gridUsers = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
