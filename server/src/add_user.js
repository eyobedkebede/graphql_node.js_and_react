import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {ADD_USER} from './Graphql/Mutations'


const AddUserForm = () => {
  const [values, setValues] = React.useState({
    first_name: '',
    last_name: '',
    age: '',
    email: ''
  });

  const [newUser, setNewUser] = useState({});
  const [message, setMessage] = useState('');

  const [addUser, { loading, error, data }] = useMutation(ADD_USER, {
    onCompleted: () => {
      // Reset form values after successful mutation
      setValues({
        first_name: '',
        last_name: '',
        age: '',
        email: ''
      });
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    addUser({
      variables: {
        first_name: values.first_name,
        last_name: values.last_name,
        age: parseInt(values.age),
        email: values.email
      }
    });

    if(data){
      console.log("here")
      setNewUser(data.addUser.user);
      setMessage(data.addUser.message)
    }
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };


  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
      {loading && <p>Adding user...</p>}
      {error && <p>Error: {error.message}</p>}
      <h2>Response</h2>
      {data && <h3>{data.addUser.message}</h3>}
      {data && 
      <div>
        id: {data.addUser.user.id}<br/>
        first_name: {data.addUser.user.first_name} <br/>
        last_name: {data.addUser.user.last_name}<br/>
        age: {data.addUser.user.age}
      </div>}
    </div>
  );
};

export default AddUserForm