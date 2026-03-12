// import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, Observable, from } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// // HTTP Link
// const httpLink = createHttpLink({ uri: import.meta.env.VITE_BACKEND_URL });

// // Auth Link
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("accessToken");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// // Refresh token function
// async function refreshAccessToken() {
//   const refreshToken = localStorage.getItem("refreshToken");
//   if (!refreshToken) throw new Error("No refresh token");

//   const res = await fetch(import.meta.env.VITE_BACKEND_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: `
//         query ParentsRefreshTokens($token: String!) {
//           parentsRefreshTokens(token: $token) {
//             success
//             data { accessToken refreshToken }
//           }
//         }
//       `,
//       variables: { token: refreshToken },
//     }),
//   });

//   const result = await res.json();
//   if (result.data.parentsRefreshTokens.success) {
//     const tokens = result.data.parentsRefreshTokens.data;
//     localStorage.setItem("accessToken", tokens.accessToken);
//     localStorage.setItem("refreshToken", tokens.refreshToken);
//     return tokens.accessToken;
//   }
//   throw new Error("Refresh token failed");
// }

// // Refresh / logging link
// const refreshLink = new ApolloLink((operation, forward) => {
//   return new Observable((observer) => {
//     const handle = () => {
//       forward(operation).subscribe({
//         next: (result) => {
//           console.log(`Response for ${operation.operationName}:`, result);

//           const unauth = result.errors?.some(e => e.extensions?.code === "UNAUTHENTICATED");

//           if (unauth) {
//             // Retry with refresh token
//             from(refreshAccessToken()).subscribe({
//               next: (newToken) => {
//                 operation.setContext({
//                   headers: {
//                     ...operation.getContext().headers,
//                     authorization: `Bearer ${newToken}`,
//                   },
//                 });
//                 // Retry operation after refresh
//                 from(forward(operation)).subscribe(observer);
//               },
//               error: (err) => {
//                 // Refresh failed → logout
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("refreshToken");
//                 window.location.href = "/login";
//                 observer.error(err);
//               },
//             });
//           } else {
//             observer.next(result);
//             observer.complete();
//           }
//         },
//         error(err) {
//           observer.error(err);
//         },
//       });
//     };
//     handle();
//   });
// });

// // Apollo Client
// const client = new ApolloClient({
//   link: refreshLink.concat(authLink.concat(httpLink)),
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// HTTP link
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
});

// Auth link to attach access token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Refresh token function
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query ParentsRefreshTokens($token: String!) {
            parentsRefreshTokens(token: $token) {
              success
              data { accessToken refreshToken }
            }
          }
        `,
        variables: { token: refreshToken },
      }),
    });
    const result = await response.json();
    if (result.data?.parentsRefreshTokens?.success) {
      const tokens = result.data.parentsRefreshTokens.data;
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      return tokens.accessToken;
    }
  } catch (err) {
    console.error("Refresh token failed", err);
  }

  // Clear tokens if refresh fails
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
  return null;
}

// Error link to intercept 401 responses
const errorLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: async (result) => {
        // Check if response has UNAUTHENTICATED errors
        const unauthenticated = result.errors?.some(
          (e) => e.extensions?.code === "UNAUTHENTICATED"
        );

        if (unauthenticated) {
          // Try refreshing token
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry the operation with new token
            operation.setContext(({ headers = {} }) => ({
              headers: { ...headers, authorization: `Bearer ${newToken}` },
            }));
            forward(operation).subscribe(observer); // Retry
            return;
          }
        }

        observer.next(result);
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    });

    return () => subscription.unsubscribe();
  });
});

// Apollo Client
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;