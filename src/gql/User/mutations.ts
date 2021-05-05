import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($signUpInput: CreateUserInput!) {
    signup(signUpInput: $signUpInput) {
      accessToken
    }
  }
`;

export default { SIGNUP };
