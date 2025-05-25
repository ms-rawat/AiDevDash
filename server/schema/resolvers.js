import User from "../models/User.js";
import  bcrypt  from 'bcrypt';
import { configDotenv } from "dotenv";
import jsonwebtoken from "jsonwebtoken";
const resolvers = {
  Query: {
    hello: () => "Hello from the Developer Dashboard GraphQL API!",
    tasks: async () => {
      // Dummy data (replace with DB fetch later)
      return [
        {
          id: "1",
          title: "First Task",
          description: "This is your first task!",
          createdAt: new Date().toISOString(),
          isCompleted: false,
        },
      ];
    },
    snippets: async () => {
      return [
        {
          id: "1",
          title: "Sample Snippet",
          code: 'console.log("Hello World");',
          language: "JavaScript",
          tags: ["console", "log"],
        },
      ];
    },
  },

  Mutation: {
    addTask: async (_, { title, description }) => {
      const newTask = {
        id: Date.now().toString(),
        title,
        description: description || "",
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
        language: language || "JavaScript",
        tags: [],
      };
      return newSnippet;
    },
    register: async (_, { input }) => {
      const { name, email, password } = input;

      //checking i user Exists
      const existnguser = await User.findOne({ email });
      if (existnguser) {
        throw new Error("User already exists with this email");
      }
      const newUser = new User({ name, email, password });
      await newUser.save();
      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
    },
    login : async (_, {input}) => {
    const {email,password} = input ;

    const user = await User.findOne({email});

    if(!user){
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      throw new Error("Invalid credentials");
    }

    const token =jsonwebtoken.sign({userId: user._id, email: user.email},
      process.env.JWTSECRETKEY,
      { expiresIn :'1d'}
    );

    return {
      token ,
      user : {
        id : user._id,
        email: user.email,
        name: user.name
      }
    }
  }
  },

};

export default resolvers;
