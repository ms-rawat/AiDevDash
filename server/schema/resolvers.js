const resolvers = {
  Query: {
    hello: () => 'Hello from the Developer Dashboard GraphQL API!',
    tasks: async () => {
      // Dummy data (replace with DB fetch later)
      return [
        {
          id: '1',
          title: 'First Task',
          description: 'This is your first task!',
          createdAt: new Date().toISOString(),
          isCompleted: false,
        },
      ];
    },
    snippets: async () => {
      return [
        {
          id: '1',
          title: 'Sample Snippet',
          code: 'console.log("Hello World");',
          language: 'JavaScript',
          tags: ['console', 'log'],
        },
      ];
    },
  },

  Mutation: {
    addTask: async (_, { title, description }) => {
      const newTask = {
        id: Date.now().toString(),
        title,
        description: description || '',
        createdAt: new Date().toISOString(),
        isCompleted: false,
      };
      return newTask;
    },

    addSnippet: async (_, { title, code, language }) => {
      const newSnippet = {
        id: Date.now().toString(),
        title,
        code,
        language: language || 'JavaScript',
        tags: [],
      };
      return newSnippet;
    },
      register: async (_, { input }) => {
    // Register logic (validate, hash password, store in DB, etc.)
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    };
  }
  },
};

export default resolvers;
