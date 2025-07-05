export const typeDefs = `#graphql
type Project {
  id: ID!
  name: String!
  description: String
  createdAt: String!
  tasks: [Task!] # Link tasks to a project
  # Add fields like status, dueDate, members if needed
}

type Task {
  id: ID!
  title: String!
  description: String
  createdAt: String!
  isCompleted: Boolean!
  project: Project # Link to its parent project
  # Add fields for assignee, priority, dueDate
  assignee: User # Assuming User type is updated/reused
  priority: String # e.g., "High", "Medium", "Low"
  dueDate: String # ISO date string
}
  type TimeLog {
  id: ID!
  startTime: String!
  endTime: String
  duration: Int # Duration in minutes/seconds, calculated or stored
  task: Task! # Link to the task it's for
  user: User! # Who logged the time
  # Add description if needed for the log entry
}

  type Snippet {
    id: ID!
    title: String!
    code: String!
    language: String
    tags: [String]
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

type Query {
  # ... existing queries ...
  projects: [Project!]!
  project(id: ID!): Project
  task(id: ID!): Task
  timeLogs(taskId: ID): [TimeLog!]! # Filter by task
  snippets(search: String, language: String, tags: [String]): [Snippet!]!
  snippet(id: ID!): Snippet
}

type Mutation {
  addSnippet(title: String!, code: String!, language: String): Snippet!
  register(input: RegisterInput!): User!
  login(input: LoginInput!): AuthPayload!

  addProject(name: String!, description: String): Project!
  updateProject(id: ID!, name: String, description: String): Project!
  deleteProject(id: ID!): Boolean!

  addTask(projectId: ID!, title: String!, description: String, assigneeId: ID, priority: String, dueDate: String): Task! # Link to project
  updateTask(id: ID!, title: String, description: String, isCompleted: Boolean, assigneeId: ID, priority: String, dueDate: String): Task!
  deleteTask(id: ID!): Boolean!

  startTimer(taskId: ID!): TimeLog!
  stopTimer(timeLogId: ID!): TimeLog!
  addTimeLog(taskId: ID!, startTime: String!, endTime: String!): TimeLog! # For manual logs

  updateSnippet(id: ID!, title: String, code: String, language: String, tags: [String]): Snippet!
  deleteSnippet(id: ID!): Boolean!
}
`;
