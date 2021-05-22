import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($signUpInput: CreateUserInput!) {
    signup(signUpInput: $signUpInput) {
      accessToken
    }
  }
`;

export interface IChangePasswordRequestInput {
  email: string;
}

const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $changePasswordRequestInput: ChangePasswordRequestInput!
  ) {
    changePassword(changePasswordRequestInput: $changePasswordRequestInput) {
      id
      name
      email
    }
  }
`;

export interface IChangePasswordInput {
  passwordRecoveryToken: string;
  userId: string;
  password: string;
}

const DO_RESET_PASSWORD = gql`
  mutation DoResetPassword($changePasswordInput: ChangePasswordInput!) {
    doResetPassword(changePasswordInput: $changePasswordInput) {
      id
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation updateProfile($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
    }
  }
`;

export default {
  SIGNUP,
  CHANGE_PASSWORD,
  DO_RESET_PASSWORD,
  UPDATE_USER_PROFILE,
};
