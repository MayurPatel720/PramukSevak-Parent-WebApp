/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useQuery } from "@apollo/client/react";
import {
	GET_ATTENDANCE,
	GET_NOTICE,
	GET_TRANSECTIONS,
} from "../Graphql/user.graphql";
import AttendanceSummary from "../Pages/attendance/AttendanceSummary";
import NoticeBoardOverview from "../Pages/Notice/Overview";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
import TransactionOverview from "../Pages/transactions/Overview";
import { AlertCircle } from "lucide-react";

const Home = ({ onLogoutSuccess }: any) => {
	const navigate = useNavigate();
	const homeRef = useRef(null);
	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const user = useAuth();

	const { data, loading, error } = useQuery(GET_ATTENDANCE, {
		variables: {
			input: { month, year, userId: user?.currentUser?._id },
		},
	});

	const {
		data: getnotices,
		loading: noticeloading,
		error: noerror,
	} = useQuery(GET_NOTICE, {
		variables: {
			input: {
				page: 1,
				limit: 10,
			},
		},
	});

	const {
		data: transection,
		loading: tloading,
		error: terror,
	} = useQuery(GET_TRANSECTIONS, {
		variables: {
			filters: {
				page: 1,
				limit: 10,
				userId: user?.currentUser?._id,
			},
		},
	});

	let totalDays = 0;
	let presentDays = 0;
	let absentDays = 0;

	const attendanceData =
		(data as any)?.viewAttendaceOfUserByIdMonthWise?.data?.[0]
			?.user_data_monthwise?.daily_report || [];

	attendanceData.forEach(
		(day: {
			morning_sabha_attendance: any;
			lunch_attendance: any;
			evening_sabha_attendance: any;
			dinner_attendance: any;
			reading_attendance: any;
			mobile: any;
		}) => {
			const fields = [
				day.morning_sabha_attendance,
				day.lunch_attendance,
				day.evening_sabha_attendance,
				day.dinner_attendance,
				day.reading_attendance,
				day.mobile,
			];

			let presentCount = 0;
			let absentCount = 0;

			fields.forEach((value) => {
				if (value === "Present") presentCount++;
				else if (value === "NotSubmitted" || value === "Absent") absentCount++;
				// Leave & Default → ignored
			});

			// If no useful data, skip day entirely
			if (presentCount === 0 && absentCount === 0) return;

			totalDays++;
			if (presentCount > absentCount) presentDays++;
			else absentDays++;
		}
	);

	useEffect(() => {
		if (typeof gsap !== "undefined" && homeRef.current) {
			gsap.fromTo(
				homeRef.current,
				{ scale: 1.05, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
			);
		}
	}, []);
	if (loading || tloading || noticeloading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
				<div className="flex space-x-2">
					<div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
					<div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
					<div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
				</div>
				<p className="mt-4 text-gray-600 font-medium">
					Getting things ready...
				</p>
			</div>
		);
	}
	if (error || terror || noerror) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
				<div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h3 className="text-xl font-bold mb-2">Error</h3>
					<p className="text-gray-600 mb-4">
						{terror?.message || noerror?.message || error?.message}
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div
				ref={homeRef}
				className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100"
			>
				<Header />

				<main className="flex-1 p-4 overflow-y-auto">
					<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-white rounded-2xl shadow-lg p-5">
							<AttendanceSummary
								totalDays={totalDays}
								presentDays={presentDays}
								absentDays={absentDays}
							/>
						</div>

						{/* Noticeboard */}
						<div className="bg-white rounded-2xl shadow-lg p-5">
							<NoticeBoardOverview
								notices={(getnotices as any)?.getNoticeboard.data}
								onSeeMore={() => navigate("/notices")}
							/>
						</div>

						{/* Transactions */}
						<div className="bg-white rounded-2xl shadow-lg p-5">
							<TransactionOverview
								transactions={(transection as any)?.findTransactionWithFilter?.data}
								onSeeMore={() => navigate("/transactions")}
							/>
						</div>

						{/* Digital Well Being */}
						{/* <div className="bg-white rounded-2xl shadow-lg p-5">
						<DigitalWellBeingOverview
							data={demoDigitalWellBeingData}
							onSeeMore={() => navigate("/digital-wellbeing")}
						/>
					</div> */}
					</div>
				</main>

				{/* ✅ Pass the logout handler properly */}
			</div>
			<Footer onLogoutSuccess={onLogoutSuccess} />
		</>
	);
};

export default Home;
