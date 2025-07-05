import User from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

// Dummy data for now (replace with DB queries as needed)
const dummyTask = {
  id: "1",
  title: "First Task",
  description: "This is your first task!",
  createdAt: new Date().toISOString(),
  isCompleted: false,
};

const dummySnippet = {
  id: "1",
  title: "Sample Snippet",
  code: 'console.log("Hello World");',
  language: "JavaScript",
  tags: ["console", "log"],
};

const resolvers = {
  Query: {

    projects: async () => {
      // TODO: Fetch all projects from DB
      return [];
    },

    project: async (_, { id }) => {
      // TODO: Fetch a single project by ID
      return null;
    },

    task: async (_, { id }) => {
      // TODO: Fetch a task by ID
      return dummyTask;
    },

    timeLogs: async (_, { taskId }) => {
      // TODO: Fetch logs (optionally filtered by taskId)
      return [];
    },

    snippets: async (_, { search, language, tags }) => {
      // TODO: Filter logic later
      return [dummySnippet];
    },

    snippet: async (_, { id }) => {
      // TODO: Fetch snippet by ID
      return dummySnippet;
    },
  },

  Mutation: {
    addProject: async (_, { name, description }) => {
      // TODO: Insert project to DB
      return {
        id: Date.now().toString(),
        name,
        description,
        createdAt: new Date().toISOString(),
        tasks: [],
      };
    },

    updateProject: async (_, { id, name, description }) => {
      // TODO: Update project in DB
      return {
        id,
        name: name || "Untitled",
        description: description || "",
        createdAt: new Date().toISOString(),
        tasks: [],
      };
    },

    deleteProject: async (_, { id }) => {
      // TODO: Delete project from DB
      return true;
    },

    addTask: async (_, { projectId, title, description, assigneeId, priority, dueDate }) => {
      // TODO: Insert task to DB
      return {
        id: Date.now().toString(),
        title,
        description,
        createdAt: new Date().toISOString(),
        isCompleted: false,
        priority,
        dueDate,
        project: null,
        assignee: null,
      };
    },

    updateTask: async (_, { id, title, description, isCompleted, assigneeId, priority, dueDate }) => {
      // TODO: Update task in DB
      return {
        id,
        title: title || "Untitled",
        description,
        isCompleted,
        createdAt: new Date().toISOString(),
        priority,
        dueDate,
        assignee: null,
        project: null,
      };
    },

    deleteTask: async (_, { id }) => {
      // TODO: Delete task from DB
      return true;
    },

    startTimer: async (_, { taskId }) => {
      // TODO: Start time tracking
      return {
        id: Date.now().toString(),
        startTime: new Date().toISOString(),
        endTime: null,
        duration: null,
        task: null,
        user: null,
      };
    },

    stopTimer: async (_, { timeLogId }) => {
      // TODO: Stop tracking and calculate duration
      return {
        id: timeLogId,
        startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        endTime: new Date().toISOString(),
        duration: 900, // in seconds
        task: null,
        user: null,
      };
    },

    addTimeLog: async (_, { taskId, startTime, endTime }) => {
      // TODO: Insert manual time log
      return {
        id: Date.now().toString(),
        startTime,
        endTime,
        duration: 600, // in seconds
        task: null,
        user: null,
      };
    },

    // updateSnippet: async (_, { id, title, code, language, tags }) => {
    //   // TODO: Update snippet in DB
    //   return {
    //     id,
    //     title,
    //     code,
    //     language,
    //     tags,
    //   };
    // },

    // deleteSnippet: async (_, { id }) => {
    //   // TODO: Delete snippet
    //   return true;
    // },

    register: async (_, { input }) => {
      const { name, email, password } = input;

      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashed = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashed });
      await newUser.save();

      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
    },

    login: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jsonwebtoken.sign(
        { userId: user._id, email: user.email },
        process.env.JWTSECRETKEY,
        { expiresIn: "1d" }
      );

      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      };
    },
  },
};

export default resolvers;
