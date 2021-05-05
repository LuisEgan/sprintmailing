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

export interface ILoginActiveDirectory {
  activeDirectoryLogInInput: {
    accessToken: string;
  };
}
export interface ILoginActiveDirectoryRes {
  loginWithAzureActiveDirectory: {
    accessToken: string;
  };
}
const LOGIN_ACTIVE_DIRECTORY = gql`
  mutation loginWithAzureActiveDirectory(
    $activeDirectoryLogInInput: SocialNetworkLogInInput!
  ) {
    loginWithAzureActiveDirectory(
      activeDirectoryLogInInput: $activeDirectoryLogInInput
    ) {
      accessToken
    }
  }
`;

const SYNC_ACTIVE_DIRECTORY_USERS = gql`
  query syncADUsers {
    syncADUsers
  }
`;

export default {
  GET_USER,
  GET_FULL_USER,
  LOGIN,
  LOGIN_ACTIVE_DIRECTORY,
  GET_ACTIVE_USER,
  SYNC_ACTIVE_DIRECTORY_USERS,
};
