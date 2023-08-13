import { gql } from "@apollo/client";

// Define the GraphQL mutation
export const ADD_USER = gql`
  mutation AddUser($first_name: String!, $last_name: String!, 
    $age: Int!, $email: String!) {
    addUser(first_name: $first_name, last_name: $last_name, 
      age: $age, email: $email) {
        message
        user {
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
  }
`;