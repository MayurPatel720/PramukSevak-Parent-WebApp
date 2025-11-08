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

export const LOGIN = gql`
	mutation Parentslogin($input: ParentsLoginDto!) {
		parentslogin(parentsLoginDto: $input) {
			code
			message
			success
			data {
				accessToken
				refreshToken
			}
		}
	}
`;

export const GET_ALL_CHILD = gql`
	query GetAllChild {
		getAllChild {
			code
			message
			success
			data {
				Banklockout
				_id
				balance
				branch
				college
				createdAt
				earlymorningBlock
				earphoneBlock
				email
				erpId
				father_email
				father_mobile
				fcmToken
				first_name
				houseRoom
				isNocTaken
				laptopUser
				latenightBlock
				lockout
				loginAttempts
				loginPin
				middle_name
				mobile
				mobileReadingBlock
				name
				onPrayshchit
				password
				paymentAttempts
				paymentPin
				propertyNo
				return_date
				role
				roll
				roomId
				room_number
				s_type
				salt
				scanned
				status
				surname
				tokenVersion
				updatedAt
				url
				devices {
					date
					deviceId
				}
				house {
					_id
					name
				}
			}
		}
	}
`;

export const GET_ATTENDANCE = gql`
	query ViewAttendaceOfUserByIdMonthWise(
		$input: ViewAttendanceMonthWiseInput!
	) {
		viewAttendaceOfUserByIdMonthWise(input: $input) {
			code
			message
			success
			data {
				_id
				createdAt
				month
				roll
				updatedAt
				year
				user_data_monthwise {
					daily_report {
						date
						dinner_attendance
						evening_sabha_attendance
						lunch_attendance
						mobile
						morning_sabha_attendance
						reading_attendance
					}
				}
			}
		}
	}
`;

export const GET_TRANSECTIONS = gql`
	query FindTransactionWithFilter($filters: TransactionFilterDto) {
		findTransactionWithFilter(filters: $filters) {
			code
			limit
			message
			page
			success
			totalItems
			totalPages
			data {
				_id
				amount
				createdAt
				creditedusersamount
				debitedusersamount
				description
				transaction_type
				updatedAt
				credited_to {
					name
					roll
					url
					Stallname
				}
				debited_from {
					name
					roll
					url
					Stallname
				}
			}
		}
	}
`;

export const GET_NOTICE = gql`
	query GetNoticeboard($input: GetNoticeboardInput) {
		getNoticeboard(input: $input) {
			data {
				_id
				attachments
				content
				createdAt
				is_deleted
				title
				updatedAt
			}
			code
			page
			message
			limit
			success
			totalPages
			totalItems
		}
	}
`;
