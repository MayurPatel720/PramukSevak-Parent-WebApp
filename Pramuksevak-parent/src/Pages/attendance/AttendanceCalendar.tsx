import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Calendar, ArrowLeft } from "lucide-react";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom"; // ✅ import

interface DailyReport {
	date: string;
	[key: string]: string;
}

interface Props {
	reports: DailyReport[];
}

const AttendanceCalendar: React.FC<Props> = ({ reports }) => {
	const navigate = useNavigate(); // ✅ initialize navigation
	const [month, setMonth] = useState(dayjs().month() + 1);
	const [year, setYear] = useState(dayjs().year());
	const [absentDates, setAbsentDates] = useState<string[]>([]);
	const [selectedDay, setSelectedDay] = useState<string | null>(null);
	const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

	useEffect(() => {
		const absents = reports
			.filter((r) =>
				Object.keys(r).some(
					(key) =>
						key.includes("attendance") && r[key]?.toLowerCase() === "absent"
				)
			)
			.map((r) => dayjs(r.date).format("YYYY-MM-DD"));
		setAbsentDates(absents);
	}, [reports]);

	const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();

	const handleDayClick = (day: number) => {
		const dateStr = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
		const report = reports.find(
			(r) => dayjs(r.date).format("YYYY-MM-DD") === dateStr
		);
		if (report) {
			const reason = Object.keys(report)
				.filter((k) => k.includes("attendance"))
				.map((k) => report[k])
				.join(", ");
			setSelectedDay(dateStr);
			setSelectedDetail(reason);
		} else {
			setSelectedDay(dateStr);
			setSelectedDetail(null);
		}
	};

	const onLogoutSuccess = () => {
		navigate("/login");
	};

	return (
		<>
			{/* Header */}
			<div className="flex items-center justify-between bg-blue-500 text-white px-4 py-4 rounded-b-2xl shadow-md sticky top-0 z-10">
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

			{/* Main content */}
			<div className="p-4 max-w-md mx-auto mb-20">
				{" "}
				{/* added mb-20 for footer space */}
				{/* Month-Year Selector */}
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

					<input
						type="number"
						value={year}
						onChange={(e) => setYear(Number(e.target.value))}
						className="border border-gray-300 rounded-lg p-2 w-20 text-center text-sm focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				{/* Calendar Grid */}
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
							const isAbsent = absentDates.includes(dateStr);

							return (
								<button
									key={day}
									onClick={() => handleDayClick(day)}
									className={`p-2 rounded-md text-sm w-full transition-all duration-200 ${
										isAbsent
											? "bg-linear-to-br from-red-500 to-red-600 text-white shadow"
											: "bg-linear-to-br from-blue-100 to-blue-200 text-blue-800 hover:from-blue-200 hover:to-blue-300"
									}`}
								>
									{day}
								</button>
							);
						})}
					</div>
				</div>
				{/* Modal */}
				{selectedDay && (
					<div
						onClick={() => setSelectedDay(null)}
						className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className="bg-white rounded-xl p-6 w-80 shadow-lg"
						>
							<h3 className="text-lg font-bold text-blue-700 mb-2">
								{dayjs(selectedDay).format("MMMM D, YYYY")}
							</h3>
							{selectedDetail ? (
								<p className="text-red-500 font-medium">
									Absent ({selectedDetail})
								</p>
							) : (
								<p className="text-green-600 font-medium">Present</p>
							)}
							<button
								onClick={() => setSelectedDay(null)}
								className="mt-4 w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>

			{/* ✅ Add Footer at bottom */}
			<Footer onLogoutSuccess={onLogoutSuccess} />
		</>
	);
};

export default AttendanceCalendar;
