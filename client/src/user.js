import React, { useState, useEffect } from 'react';
import { getUser } from './Graphql/Query';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GetUser = () => {
  const {id} = useParams();

  const [user, setUser] = useState({});
  const {error, loading, data} = useQuery(getUser, {
    variables: {id}
  });

  function getSingleUser(){
    if(data){
      setUser(data.getUser);
    }
  }

  useEffect(()=>{
    getSingleUser()
  }, [data])

  if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>User</h2>
      {
        <div key={user.id}>
          <p>Name: {user.first_name} {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
          <p>Is active: {`${user.is_active}`}</p>
          {console.log(user.is_active)}
          <p>created at: {user.createdAt}</p>
          <p>updated at: {user.updatedAt}</p>
          <hr/>
        </div>
      }
    </div>
  );
}

export default GetUser;