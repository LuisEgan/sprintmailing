import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
    }
  }
`;

const GET_ACTIVE_USER = gql`
  query activeUsers {
    activeUsers {
      id
      name
      lastname
    }
  }
`;

const GET_USER = gql`
  query GetMyUser {
    user {
      id
      profileImage
      name
    }
  }
`;

const GET_FULL_USER = gql`
  query user {
    user {
      id
      profileImage
      name
      lastname
    }
  }
`;

export default {
  GET_USER,
  GET_FULL_USER,
  LOGIN,
  GET_ACTIVE_USER,
};
