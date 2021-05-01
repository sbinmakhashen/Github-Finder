import React from 'react';
import UserItems from './UserItems';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types'

const Users = ({users, loading}) => {
  if(loading){
    return <Spinner />
  } else {
    return (
      <div style={gridUsers}>
        {users.map(user => 
          <UserItems key={user.id} user={user} />
          )}
      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const gridUsers = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
} 

export default Users
