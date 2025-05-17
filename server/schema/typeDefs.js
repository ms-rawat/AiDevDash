
const typeDefs = `#graphql
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

  type Mutation {
    addTask(title: String!, description: String): Task!
    addSnippet(title: String!, code: String!, language: String): Snippet!
  }
`;

export default typeDefs;
