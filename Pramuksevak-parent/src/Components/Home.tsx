import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
	LogOut,
	Calendar,
	Bell,
	CreditCard,
	Heart,
	ChevronDown,
} from "lucide-react";
import gsap from "gsap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = ({ onLogoutSuccess }: any) => {
	const { currentUser, users, logout, switchUser } = useAuth();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [selectedDate] = useState(new Date());
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

	const handleLogout = () => {
		if (typeof gsap !== "undefined" && homeRef.current) {
			gsap.to(homeRef.current, {
				scale: 0.95,
				opacity: 0,
				duration: 0.4,
				ease: "power2.in",
				onComplete: () => logout(onLogoutSuccess),
			});
		} else {
			logout(onLogoutSuccess);
		}
	};

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i);
		}
		return days;
	};

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

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
			<header className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md">
				<div className="flex items-center space-x-2">
					<img
						src="/logo.png"
						alt="Logo"
						className="w-8 h-8 rounded-full border border-white/30"
					/>
					<h1 className="text-xl font-semibold tracking-wide">Pramuk Sevak</h1>
				</div>
			</header>

			<main className="flex-1 p-4 pb-32 overflow-y-auto">
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white rounded-2xl shadow-lg p-5">
						<div className="flex items-center gap-2 mb-4">
							<Calendar className="w-6 h-6 text-blue-600" />
							<h2 className="text-lg font-bold text-gray-800">Calendar</h2>
						</div>
						<div className="text-center mb-3">
							<h3 className="font-semibold text-gray-700">
								{monthNames[selectedDate.getMonth()]}{" "}
								{selectedDate.getFullYear()}
							</h3>
						</div>
						<div className="grid grid-cols-7 gap-1 mb-2">
							{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
								<div
									key={day}
									className="text-center text-xs font-semibold text-gray-600 py-1"
								>
									{day}
								</div>
							))}
						</div>
						<div className="grid grid-cols-7 gap-1">
							{getDaysInMonth(selectedDate).map((day, idx) => (
								<div
									key={idx}
									className={`text-center py-2 text-sm rounded-lg ${
										day === new Date().getDate() &&
										selectedDate.getMonth() === new Date().getMonth()
											? "bg-blue-600 text-white font-bold"
											: day
											? "hover:bg-gray-100 cursor-pointer"
											: ""
									}`}
								>
									{day}
								</div>
							))}
						</div>
					</div>

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
							<div className="grid grid-cols-3 gap-2 mt-4">
								<div className="text-center p-3 bg-green-50 rounded-xl">
									<p className="text-2xl font-bold text-green-600">85%</p>
									<p className="text-xs text-gray-600 mt-1">Healthy</p>
								</div>
								<div className="text-center p-3 bg-blue-50 rounded-xl">
									<p className="text-2xl font-bold text-blue-600">6</p>
									<p className="text-xs text-gray-600 mt-1">Breaks</p>
								</div>
								<div className="text-center p-3 bg-purple-50 rounded-xl">
									<p className="text-2xl font-bold text-purple-600">4.2</p>
									<p className="text-xs text-gray-600 mt-1">Score</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200">
				<div className="max-w-4xl mx-auto p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3 flex-1">
							<div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
								{currentUser?.avatar}
							</div>
							<div className="flex-1">
								<p className="font-semibold text-gray-800">
									{currentUser?.name}
								</p>
								<p className="text-sm text-gray-600">
									Balance: ₹{currentUser?.balance.toLocaleString("en-IN")}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button
								onClick={() => setShowUserMenu(!showUserMenu)}
								className="p-2 hover:bg-gray-100 rounded-xl transition"
							>
								<ChevronDown
									className={`w-5 h-5 text-gray-600 transition-transform ${
										showUserMenu ? "rotate-180" : ""
									}`}
								/>
							</button>
							<button
								onClick={handleLogout}
								className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition"
							>
								<LogOut className="w-5 h-5 text-red-600" />
							</button>
						</div>
					</div>

					{showUserMenu && (
						<div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
							{users
								.filter((u) => u.id !== currentUser?.id)
								.map((user) => (
									<div
										key={user.id}
										onClick={() => switchUser(user)}
										className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition"
									>
										<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
											{user.avatar}
										</div>
										<div className="flex-1">
											<p className="font-medium text-gray-800 text-sm">
												{user.name}
											</p>
											<p className="text-xs text-gray-600">
												₹{user.balance.toLocaleString("en-IN")}
											</p>
										</div>
									</div>
								))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
