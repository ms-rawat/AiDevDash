// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation RegisterUser($input : RegisterInput!){
register(input: $input){
id
name
email
}}
`

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
