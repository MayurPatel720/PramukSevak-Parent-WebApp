import { gql } from "@apollo/client";

export const DEMO = gql`
	query GetFeeds {
		getFeeds(input: { limit: 10, page: 1 }) {
			code
			limit
			message
			page
			success
			totalItems
			totalPages
			data {
				_id
				createdAt
				description
				expires_at
				is_deleted
				level
				m
				p
				s
				start_at
				title
				updatedAt
			}
		}
	}
`;
