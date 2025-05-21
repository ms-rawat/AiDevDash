// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $name: String!) {
    register(input: { email: $email, password: $password, name: $name }) {
      id
      email
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;
