import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { USER_TOKEN_PERSIST } from "./constants";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_APP_API_URL,
});

// eslint-disable-next-line
console.log(
  "🚀 ~ file: apollo.ts ~ line 9 ~ process.env.NEXT_PUBLIC_APP_API_URL",
  process.env.NEXT_PUBLIC_APP_API_URL,
);

const authLink = setContext((_, params) => {
  const { headers } = params;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_PERSIST)}`,
    },
  };
});

const onErrorLink = onError((errorHandler) => {
  const { response } = errorHandler;
  if (
    response &&
    response.errors &&
    response?.errors[0]?.extensions?.exception?.status === 401
  ) {
    localStorage.removeItem(USER_TOKEN_PERSIST);
  }
});

const authFlowLink = authLink.concat(onErrorLink);
const link = authFlowLink.concat(httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link,
});

export default client;
