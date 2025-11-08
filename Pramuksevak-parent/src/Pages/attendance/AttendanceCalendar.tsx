/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import dayjs from "dayjs";
import { Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@apollo/client/react";
import { GET_ATTENDANCE } from "../../Graphql/user.graphql";

const AttendanceCalendar: React.FC = () => {
	const navigate = useNavigate();

	const currentYear = dayjs().year();
	const [month, setMonth] = useState(dayjs().month() + 1);

	const [year, setYear] = useState(currentYear);
	const [selectedReport, setSelectedReport] = useState<any | null>(null);

	const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();

	const user = useAuth();
	const { data, loading, error } = useQuery(GET_ATTENDANCE, {
		variables: {
			input: { month, year, userId: user?.currentUser?._id },
		},
		skip: !user?.currentUser?._id,
	});

	if (loading) return <p>loading</p>;
	if (error) return <p>error</p>;

	const reports =
		(data as any)?.viewAttendaceOfUserByIdMonthWise?.data?.[0]
			?.user_data_monthwise?.daily_report ?? [];

	const handleDayClick = (day: number) => {
		const dateStr = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
		const report = reports?.find(
			(r: { date: string | number | Date | dayjs.Dayjs | null | undefined }) =>
				dayjs(r.date).format("YYYY-MM-DD") === dateStr
		);
		if (report) setSelectedReport(report);
	};

	// ✅ Coloring logic
	const getDayColor = (report: any) => {
		if (!report) return "bg-gray-100 text-gray-500";
		const statuses = Object.keys(report)
			.filter((k) => k.includes("_attendance"))
			.map((k) => report[k]?.toLowerCase());

		if (statuses.includes("absent"))
			return "bg-gradient-to-br from-red-500 to-red-600 text-white shadow";
		if (statuses.includes("leave"))
			return "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow";
		return "bg-white text-gray-700 border border-gray-200";
	};

	return (
		<>
			{/* Header */}
			<div className="flex items-center justify-between bg-blue-600 text-white px-4 py-4 rounded-b-2xl shadow-md sticky top-0 z-10">
				<button
					onClick={() => navigate("/home")}
					className="flex items-center gap-1 text-white hover:text-blue-200 transition"
				>
					<ArrowLeft className="w-5 h-5" />
				</button>
				<h2 className="text-lg font-semibold flex items-center gap-2">
					<Calendar className="w-5 h-5" />
					Attendance
				</h2>
				<div className="w-8" />
			</div>

			{/* Main Content */}
			<div className="p-4 max-w-md mx-auto mb-20">
				{/* Month & Year Selector */}
				<div className="flex justify-between items-center mb-5 bg-white p-3 rounded-xl shadow-sm border border-blue-100">
					<select
						value={month}
						onChange={(e) => setMonth(Number(e.target.value))}
						className="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500"
					>
						{Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
							<option key={m} value={m}>
								{dayjs()
									.month(m - 1)
									.format("MMMM")}
							</option>
						))}
					</select>
					<select
						value={year}
						onChange={(e) => setYear(Number(e.target.value))}
						className="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500"
					>
						{Array.from({ length: 3 }, (_, i) => currentYear - 2 + i).map(
							(y) => (
								<option key={y} value={y}>
									{y}
								</option>
							)
						)}
					</select>
				</div>

				{/* Calendar */}
				<div className="bg-white rounded-2xl p-3 shadow-md border border-blue-100">
					<div className="grid grid-cols-7 gap-2 text-center mb-2">
						{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
							<div
								key={d}
								className="font-semibold text-xs text-blue-700 uppercase"
							>
								{d}
							</div>
						))}

						{Array.from({ length: dayjs(`${year}-${month}-01`).day() }).map(
							(_, i) => (
								<div key={`empty-${i}`} />
							)
						)}

						{Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
							const dateStr = dayjs(`${year}-${month}-${day}`).format(
								"YYYY-MM-DD"
							);
							const report = reports.find(
								(r: {
									date: string | number | dayjs.Dayjs | Date | null | undefined;
								}) => dayjs(r.date).format("YYYY-MM-DD") === dateStr
							);
							return (
								<button
									key={day}
									onClick={() => handleDayClick(day)}
									className={`p-2 rounded-md text-sm w-full transition-all duration-200 ${getDayColor(
										report
									)}`}
								>
									{day}
								</button>
							);
						})}
					</div>
				</div>

				{/* Modal for Day Details */}
				{selectedReport && (
					<div
						onClick={() => setSelectedReport(null)}
						className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className="bg-white rounded-xl p-6 w-80 shadow-lg"
						>
							<h3 className="text-lg font-bold text-blue-700 mb-2">
								{dayjs(selectedReport.date).format("MMMM D, YYYY")}
							</h3>
							<div className="text-sm text-gray-700 space-y-1 max-h-60 overflow-y-auto">
								{Object.keys(selectedReport)
									.filter((k) => k.includes("_attendance"))
									.map((k) => (
										<p key={k}>
											<span className="font-semibold capitalize">
												{k.replaceAll("_", " ")}:
											</span>{" "}
											{selectedReport[k]}
										</p>
									))}
							</div>
							<button
								onClick={() => setSelectedReport(null)}
								className="mt-4 w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>

			<Footer onLogoutSuccess={() => navigate("/login")} />
		</>
	);
};

export default AttendanceCalendar;
