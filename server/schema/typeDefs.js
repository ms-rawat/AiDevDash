export const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    isCompleted: Boolean!
  }

  type Snippet {
    id: ID!
    title: String!
    code: String!
    language: String
    tags: [String]
  }

  type Query {
    hello: String
    tasks: [Task!]!
    snippets: [Snippet!]!
  }
    
  input RegisterInput {
  email: String!
  password: String!
  name: String!
}

input LoginInput {
email: String,
password: String,

}

type User {
  id: ID!
  email: String!
  name: String!
}
type AuthPayload {
  token: String!
  user: User!
}

type Mutation {
    addTask(title: String!, description: String): Task!
    addSnippet(title: String!, code: String!, language: String): Snippet!
    register(input: RegisterInput!): User!
    login(input: LoginInput!): AuthPayload!

  }
`;
