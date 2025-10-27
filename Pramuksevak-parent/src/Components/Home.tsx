import { useEffect, useRef } from "react";
import { Bell, CreditCard, Heart } from "lucide-react";
import gsap from "gsap";
import { useQuery } from "@apollo/client/react";
import { DEMO } from "../Graphql/user.graphql";
import AttendanceSummary from "../Pages/attendance/AttendanceSummary";
import Header from "./Header";
import Footer from "./Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = ({ onLogoutSuccess }: any) => {
	const homeRef = useRef(null);

	const notices = [
		{ id: 1, title: "Community Meeting", date: "2025-10-30", type: "event" },
		{ id: 2, title: "Payment Due Reminder", date: "2025-11-05", type: "alert" },
		{ id: 3, title: "Festival Celebration", date: "2025-11-10", type: "event" },
	];

	const transactions = [
		{
			id: 1,
			type: "credit",
			amount: 5000,
			desc: "Monthly Contribution",
			date: "2025-10-25",
		},
		{
			id: 2,
			type: "debit",
			amount: 1200,
			desc: "Community Event",
			date: "2025-10-20",
		},
		{
			id: 3,
			type: "credit",
			amount: 3000,
			desc: "Festival Fund",
			date: "2025-10-15",
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
						<div className="flex items-center gap-2 mb-4">
							<Bell className="w-6 h-6 text-orange-600" />
							<h2 className="text-lg font-bold text-gray-800">Noticeboard</h2>
						</div>
						<div className="space-y-3">
							{notices.map((notice) => (
								<div
									key={notice.id}
									className="p-3 bg-linear-to-br from-orange-50 to-red-50 rounded-xl border-l-4 border-orange-500"
								>
									<h3 className="font-semibold text-gray-800 text-sm">
										{notice.title}
									</h3>
									<p className="text-xs text-gray-600 mt-1">{notice.date}</p>
									<span
										className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
											notice.type === "event"
												? "bg-blue-100 text-blue-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{notice.type}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Transactions */}
					<div className="bg-white rounded-2xl shadow-lg p-5">
						<div className="flex items-center gap-2 mb-4">
							<CreditCard className="w-6 h-6 text-green-600" />
							<h2 className="text-lg font-bold text-gray-800">Transactions</h2>
						</div>
						<div className="space-y-3">
							{transactions.map((txn) => (
								<div
									key={txn.id}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
								>
									<div className="flex-1">
										<p className="font-semibold text-sm text-gray-800">
											{txn.desc}
										</p>
										<p className="text-xs text-gray-600 mt-1">{txn.date}</p>
									</div>
									<div
										className={`font-bold text-sm ${
											txn.type === "credit" ? "text-green-600" : "text-red-600"
										}`}
									>
										{txn.type === "credit" ? "+" : "-"}₹{txn.amount}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Digital wellbeing */}
					<div className="bg-white rounded-2xl shadow-lg p-5">
						<div className="flex items-center gap-2 mb-4">
							<Heart className="w-6 h-6 text-pink-600" />
							<h2 className="text-lg font-bold text-gray-800">
								Digital Wellbeing
							</h2>
						</div>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between text-sm mb-2">
									<span className="text-gray-600">App Usage Today</span>
									<span className="font-semibold text-gray-800">2h 15m</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-linear-to-br from-pink-500 to-purple-500 h-3 rounded-full"
										style={{ width: "65%" }}
									></div>
								</div>
							</div>

							<div>
								<div className="flex justify-between text-sm mb-2">
									<span className="text-gray-600">Weekly Goal</span>
									<span className="font-semibold text-gray-800">12h / 15h</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-linear-to-br from-blue-500 to-cyan-500 h-3 rounded-full"
										style={{ width: "80%" }}
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* ✅ Pass the logout handler properly */}
			<Footer onLogoutSuccess={onLogoutSuccess} />
		</div>
	);
};

export default Home;
