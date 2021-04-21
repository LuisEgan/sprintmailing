import { gql } from "@apollo/client";

// * Example how to use Example Mutation and Query
export interface ImutationExampleInput {
  mutationExampleInput: {
    input: string;
  };
}
export interface ImutationExampleResponse {
  mutationExample: {
    response: string;
  };
}
const MUTATION_EXAMPLE = gql`
  mutation mutationExample($mutationExampleInput: MutationExampleInput!) {
    mutationExample(mutationExampleInput: $mutationExampleInput) {
      data
    }
  }
`;

const QUERY_EXAMPLE = gql`
  query queryExample {
    queryExample
  }
`;

export default {
  MUTATION_EXAMPLE,
  QUERY_EXAMPLE,
};
