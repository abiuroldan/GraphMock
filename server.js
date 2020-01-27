var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: String
    name: String
    email: String
    userType: String
  }

  type Query {
    user(email: String): User
  }
`);

const fakeDatabase = [
  {
    id: '123',
    name: 'alice',
    email: 'alice@gmail.com',
    userType: 'Cliente'
  },
  {
    id: '3242',
    name: 'bob',
    email: 'bob@gmail.com',
    userType: 'Vendedor'
  },
  {
    id: '3242',
    name: 'bob',
    email: 'bob@gmail.com',
    userType: 'Garlock'
  },
  {
    id: '3242',
    name: 'Abiu',
    email: 'abiu@gmail.com',
    userType: 'Cliente'
  }
]

// The root provides a resolver function for each API endpoint
var root = {
  user: ({ email }) => {

    for (var i = 0; i < fakeDatabase.length; i++) {
      if (fakeDatabase[i].email === email) {
        return fakeDatabase[i];
      }
    }
    return fakeDatabase[i];
  }
};

var app = express();
app.use('/login', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');