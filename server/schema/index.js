exports.typeDefs = `#graphql
  scalar Date

  type User {
    id: String,
    first_name: String,
    last_name: String,
    email: String!,
    age: Int,
    is_active: Boolean,
    createdAt: Date,
    updatedAt: Date
  }
  

  type Query{
    getAllUsers: [User]
    getUser(id: String!) : User
  }

  type SuccessfulResponse{
    message: String!,
    user: User,
  }

  type Mutation {
    addUser(first_name: String!, last_name: String!,
       age: Int!, email: String!)
     : SuccessfulResponse!
  }

`;