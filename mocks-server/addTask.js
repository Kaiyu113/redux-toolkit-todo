const schema = `
  type User {
    id: Int!
    name: String!
  }

  type Query {
    currentUser: User!
  }

  type Mutation {
    createUser(name: String!): User!
    updateUser(id: Int!, name: String!): User!
  }
`;

module.exports = {
  path: "/api/addTask",
  method: "POST",
  template: function (pathParams, queryVariables, postBody) {},
};
