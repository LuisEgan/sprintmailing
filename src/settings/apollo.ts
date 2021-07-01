/*eslint-disable */

import {
  ApolloClient,
  createHttpLink,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { signOutActions } from "context/auth";
import { gqlUser } from "gql";
import Router from "next/router";
import { PUBLIC_ROUTES } from "routes/routes";

import { REFRESH_TOKEN_PERSIST, USER_TOKEN_PERSIST } from "./constants";

let apolloClient;
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_APP_API_URL}/graphql`,
});

const authLink = setContext((_, params) => {
  const { headers } = params;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_PERSIST)}`,
    },
  };
});

const getNewToken = () =>
  apolloClient
    .mutate({
      mutation: gqlUser.mutations.REFRESH_ACCESS_TOKEN,
      variables: {
        refreshAccessTokenInput: {
          refreshToken: localStorage.getItem(REFRESH_TOKEN_PERSIST),
        },
      },
    })
    .then((response) => {
      const { refreshAccessToken } = response.data;
      if (refreshAccessToken) {
        localStorage.setItem(
          USER_TOKEN_PERSIST,
          `${refreshAccessToken.accessToken}`,
        );

        return refreshAccessToken.accessToken;
      }
    });

const onErrorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.exception.status) {
        case 422:
          signOutActions();
          Router.push(PUBLIC_ROUTES.login.path);
          break;
        case 401:
          return fromPromise(getNewToken().catch(() => {}))
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  Authorization: `Bearer ${accessToken}`,
                },
              });

              return forward(operation);
            });
        default:
          break;
      }
    }
  }
});

const authFlowLink = authLink.concat(onErrorLink);
const link = authFlowLink.concat(httpLink);

apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link,
});

export default apolloClient;
