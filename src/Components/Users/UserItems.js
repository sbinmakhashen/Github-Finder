import React from 'react';
import PropTypes from 'prop-types';

 const UserItems = ({user: {avatar_url, login, html_url}}) => {
    return (
      <div className="card text-center">
        <img
         src={avatar_url} 
         alt="" className="round-img" style={{width: '70px'}} 
         />
         <h3>{login}</h3>
         <div>
           <a href={html_url} className="btn btn-dark btn-sm my-1" target="_blank">Click for more</a>
         </div>
      </div>
    )
}

UserItems.propTypes ={
  user: PropTypes.object.isRequired
}

export default UserItems
