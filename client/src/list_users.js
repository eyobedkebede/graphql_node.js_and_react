import React, { useState, useEffect } from 'react';
import { getAllUsers } from './Graphql/Query';
import { useQuery } from '@apollo/client';

const Users = () => {
  const [users, setUsers] = useState([]);
  const {error, loading, data} = useQuery(getAllUsers);

  function getUsers(){
    if(data)
    setUsers(data.getAllUsers);
  }

  useEffect(()=>{
    getUsers()
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  
  return (
    <div>
      <h2>Users List</h2>
      {users && users.map(user => 
        <div key={user.id}>
          <p>Name: {user.first_name} {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
          {/* Render other user information */}
          <hr/>
        </div>
      )}
      <h6> {users[0] && <a href={`user/${users[0].id}`}>
       view single user </a>} </h6>
    </div>
  );
}

export default Users;