import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useQuery } from "@apollo/client/react";
import { DEMO } from "../Graphql/user.graphql";
import AttendanceSummary from "../Pages/attendance/AttendanceSummary";
import TransactionsOverview from "../Pages/transactions/Overview";
import DigitalWellBeingOverview from "../Pages/digitalWellbeing/Overview";
import NoticeBoardOverview from "../Pages/Notice/Overview";
import Header from "./Header";
import Footer from "./Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = ({ onLogoutSuccess }: any) => {
	const navigate = useNavigate();
	const homeRef = useRef(null);

	const demoTransactions = [
		{
			amount: 108,
			createdAt: "2025-10-14T19:30:10.270Z",
			credited_to: {
				name: "jeel kalathiya",
				roll: "202",
			},
			debited_from: null,
			description: "Project Paper's order's refund",
			transaction_type: "REFUND",
		},
		{
			amount: 25.2,
			createdAt: "2025-10-08T19:30:01.077Z",
			credited_to: {
				name: "jeel kalathiya",
				roll: "202",
			},
			debited_from: null,
			description: "fvygtbuk's order's refund",
			transaction_type: "REFUND",
		},
		{
			amount: 120,
			createdAt: "2025-10-07T09:17:35.856Z",
			credited_to: {
				name: "Stall C",
			},
			debited_from: {
				name: "jeel kalathiya",
				roll: "202",
			},
			description: "Project Paper's order placed",
			transaction_type: "ORDER",
		},
	];

	const demoDigitalWellBeingData = {
		userId: "user123",
		days: [
			{
				date: "2025-10-26",
				totalScreenTime: 300,
				unlockCount: 85,
				apps: [
					{
						appName: "Instagram",
						packageName: "com.instagram",
						usageMinutes: 120,
					},
					{
						appName: "WhatsApp",
						packageName: "com.whatsapp",
						usageMinutes: 80,
					},
					{ appName: "YouTube", packageName: "com.youtube", usageMinutes: 60 },
					{ appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
				],
			},
			{
				date: "2025-10-27",
				totalScreenTime: 345,
				unlockCount: 92,
				apps: [
					{
						appName: "Instagram",
						packageName: "com.instagram",
						usageMinutes: 140,
					},
					{
						appName: "WhatsApp",
						packageName: "com.whatsapp",
						usageMinutes: 95,
					},
					{ appName: "YouTube", packageName: "com.youtube", usageMinutes: 70 },
					{ appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
				],
			},
		],
	};

	const demoNotices = [
		{
			_id: "1",
			title: "Important: Campus Closure Notice",
			description:
				"The campus will remain closed on October 30th due to maintenance work. All classes are postponed.",
			media: ["image1.jpg", "document.pdf"],
			createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
			priority: "high",
			category: "Academic",
		},
		{
			_id: "2",
			title: "Exam Schedule Released",
			description:
				"Mid-term examination schedule for all departments has been published. Check the notice board for details.",
			media: [],
			createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
			priority: "medium",
			category: "Examination",
		},
		{
			_id: "3",
			title: "Library Hours Extended",
			description:
				"Library will now remain open until 10 PM on weekdays. New reading room facilities available.",
			media: ["timing.jpg"],
			createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
			priority: "low",
			category: "Facility",
		},
	];

	const { data, loading, error } = useQuery(DEMO);
	if (loading) console.log("Loading...");
	if (error) console.log("Error : ", error);
	if (data) console.log("Data : ", data);

	useEffect(() => {
		if (typeof gsap !== "undefined" && homeRef.current) {
			gsap.fromTo(
				homeRef.current,
				{ scale: 1.05, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
			);
		}
	}, []);

	return (
		<div
			ref={homeRef}
			className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100"
		>
			<Header />

			<main className="flex-1 p-4 pb-32 overflow-y-auto">
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white rounded-2xl shadow-lg p-5">
						<AttendanceSummary
							totalDays={30}
							presentDays={20}
							absentDays={10}
						/>
					</div>

					{/* Noticeboard */}
					<div className="bg-white rounded-2xl shadow-lg p-5">
						<NoticeBoardOverview
							notices={demoNotices}
							onSeeMore={() => navigate("/notices")}
						/>
					</div>

					{/* Transactions */}
					<div className="bg-white rounded-2xl shadow-lg p-5">
						<TransactionsOverview
							transactions={demoTransactions}
							onSeeMore={() => navigate("/transactions")}
						/>
					</div>

					{/* Digital Well Being */}
					<div className="bg-white rounded-2xl shadow-lg p-5">
						<DigitalWellBeingOverview
							data={demoDigitalWellBeingData}
							onSeeMore={() => navigate("/digital-wellbeing")}
						/>
					</div>
				</div>
			</main>

			{/* ✅ Pass the logout handler properly */}
			<Footer onLogoutSuccess={onLogoutSuccess} />
		</div>
	);
};

export default Home;
