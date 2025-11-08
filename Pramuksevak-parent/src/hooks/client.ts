import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: "https://vmjt1nrg-3000.inc1.devtunnels.ms/graphql",
	// uri: "https://avashyakam.sngmyhome.com/avdev/graphql",
});

const authLink = setContext((_, { headers }) => {
	// const token =
	// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VySWQiOiI2ODM4ODc1OGQ5MjM4ZjdkMTBkYzYwYjYiLCJ0b2tlblZlcnNpb24iOiI0MTdiMjYyNS01NDA0LTQ5ZmUtODZkMC01NmQzZWVkNDZhNzMiLCJpYXQiOjE3NjE1NTk4MDcsImV4cCI6MTc2MTU2MzQwN30.NFKkyFlJ-cYrzAZzeiuUiJOV3hZxfnfovPbkkQF7qRM";
	const token = localStorage.getItem("accessToken");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// Create Apollo Client
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
