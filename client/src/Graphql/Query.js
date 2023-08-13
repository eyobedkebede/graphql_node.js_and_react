import {gql} from '@apollo/client';

export const getUser = gql`
query GetUser($id: String!) {
  getUser(id: $id) {
    id
    first_name
    last_name
    email
    age
    is_active
    createdAt
    updatedAt
  }
}
`;

export const getAllUsers = gql`
query GetAllUsers {
  getAllUsers {
      id,
      first_name,
      last_name,
      email,
      age
  }
}
`;