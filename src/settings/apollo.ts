/*eslint-disable */
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  DocumentNode,
  fromPromise,
  InMemoryCache,
  NormalizedCacheObject,
  RequestHandler,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { signOutActions } from "context/auth";
import { gqlDoNothing, gqlUser } from "gql";
import { createClient } from "graphql-ws";
import Router from "next/router";
import { PUBLIC_ROUTES } from "routes/routes";
import { getQueryOperator } from "utils/helpers";
import {
  GraphQLErrors,
  isBrowser,
  REFRESH_TOKEN_PERSIST,
  USER_LANG,
  USER_TOKEN_PERSIST,
} from "./constants";

let apolloClient: ApolloClient<NormalizedCacheObject>;
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_APP_API_URL}/graphql`,
});

let wsLink: ApolloLink | RequestHandler;

if (isBrowser) {
  wsLink = new GraphQLWsLink(
    createClient({
      url: `${process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL}/subscriptions`,
    }),
  );
}

const authLink = setContext((_, params) => {
  const { headers } = params;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_PERSIST)}`,
      "x-custom-lang": localStorage.getItem(USER_LANG) || "en",
    },
  };
});

const getNewToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apolloClient.mutate({
        mutation: gqlUser.mutations.REFRESH_ACCESS_TOKEN,
        variables: {
          refreshAccessTokenInput: {
            refreshToken: localStorage.getItem(REFRESH_TOKEN_PERSIST),
          },
        },
      });

      const { refreshAccessToken } = response.data;

      if (refreshAccessToken) {
        localStorage.setItem(
          USER_TOKEN_PERSIST,
          `${refreshAccessToken.accessToken}`,
        );

        resolve(refreshAccessToken.accessToken);
      } else {
        reject();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const onErrorLink = onError(
  ({ graphQLErrors, operation, forward, networkError }) => {
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);

      // if (Router.asPath !== "/500") {
      //   signOutActions();
      //   Router.push(PUBLIC_ROUTES[500].path);
      // }

      // return;
    }

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          case GraphQLErrors.UNAUTHENTICATED:
            return fromPromise(
              getNewToken().catch(() => {
                signOutActions();
                Router.push(PUBLIC_ROUTES.login.path);
              }),
            )
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
          case GraphQLErrors.INTERNAL_SERVER_ERROR:
            console.error(err);
            break;
          case GraphQLErrors.GRAPHQL_VALIDATION_FAILED:
          case GraphQLErrors.GRAPHQL_PARSE_FAILED:
            console.error(err.message);
            break;
          default:
            if (err.extensions.code === GraphQLErrors.BAD_USER_INPUT) {
              console.error(err.message);
              break;
            } else {
              signOutActions();
              Router.push(PUBLIC_ROUTES.login.path);
              break;
            }
        }
      }
    }
  },
);

let splitLink: ApolloLink;

if (isBrowser) {
  splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );
}

const authFlowLink = authLink.concat(onErrorLink);
const link = authFlowLink.concat(splitLink || httpLink);

apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link,
});

export const forceRefetchQueries = async (queries: DocumentNode[]) => {
  // * Hack for run refetch queries by Name Without real mutation
  const queryNames = queries.map(getQueryOperator);

  return apolloClient.mutate({
    mutation: gqlDoNothing.mutations.DO_NOTHING,
    awaitRefetchQueries: true,
    refetchQueries: () => queryNames,
  });
};

export default apolloClient;
