/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import dayjs from "dayjs";
import { Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";

const AttendanceCalendar: React.FC = () => {
	const navigate = useNavigate();

	// ✅ Real API data (mocked here for example)
	const data = {
		data: {
			viewAttendaceOfUserByIdMonthWise: {
				code: 201,
				message: "Data created successfully!",
				success: true,
				data: [
					{
						_id: "68ff5fed8ec6925908cc369d",
						createdAt: "2025-10-27T12:05:01.596Z",
						month: 7,
						roll: 901,
						updatedAt: "2025-10-27T12:05:12.022Z",
						year: 2025,
						user_data_monthwise: {
							jabha_lengha_absent: null,
							samuh_puja_absent: null,
							daily_report: [
								{
									date: "2025-07-01T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-02T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-03T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-04T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-05T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Present",
								},
								{
									date: "2025-07-06T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Present",
								},
								{
									date: "2025-07-07T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Present",
								},
								{
									date: "2025-07-08T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-09T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-10T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-11T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-12T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-13T05:30:00.000Z",
									dinner_attendance: "Leave",
									evening_sabha_attendance: "Leave",
									lunch_attendance: "Present",
									mobile: "Leave",
									morning_sabha_attendance: "Present",
									reading_attendance: "Leave",
								},
								{
									date: "2025-07-14T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-15T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-16T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-17T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-18T05:30:00.000Z",
									dinner_attendance: "Leave",
									evening_sabha_attendance: "Leave",
									lunch_attendance: "Absent",
									mobile: "Leave",
									morning_sabha_attendance: "Present",
									reading_attendance: "Leave",
								},
								{
									date: "2025-07-19T05:30:00.000Z",
									dinner_attendance: "Leave",
									evening_sabha_attendance: "Leave",
									lunch_attendance: "Leave",
									mobile: "Leave",
									morning_sabha_attendance: "Leave",
									reading_attendance: "Leave",
								},
								{
									date: "2025-07-20T05:30:00.000Z",
									dinner_attendance: "Leave",
									evening_sabha_attendance: "Leave",
									lunch_attendance: "Leave",
									mobile: "Leave",
									morning_sabha_attendance: "Leave",
									reading_attendance: "Leave",
								},
								{
									date: "2025-07-21T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Leave",
									mobile: "Default",
									morning_sabha_attendance: "Leave",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-22T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Leave",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Leave",
								},
								{
									date: "2025-07-23T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-24T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-25T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-26T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-27T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Absent",
									reading_attendance: "Present",
								},
								{
									date: "2025-07-28T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-29T05:30:00.000Z",
									dinner_attendance: "Seva",
									evening_sabha_attendance: "Seva",
									lunch_attendance: "Absent",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-30T05:30:00.000Z",
									dinner_attendance: "Present",
									evening_sabha_attendance: "Present",
									lunch_attendance: "Present",
									mobile: "Default",
									morning_sabha_attendance: "Present",
									reading_attendance: "Absent",
								},
								{
									date: "2025-07-31T05:30:00.000Z",
									dinner_attendance: "Absent",
									evening_sabha_attendance: "Absent",
									lunch_attendance: "Leave",
									mobile: "Default",
									morning_sabha_attendance: "Leave",
									reading_attendance: "Absent",
								},
							],
							statistics: null,
						},
						user_id: {
							_id: "6866d695ba7f9bdc7d1fa014",
							mobile: "+919726528720",
							name: "Mayur Nileshbhai Patel",
							roll: "901",
							url: "https://avashyakam.sngmyhome.com/api/user/image/20222015",
						},
					},
				],
			},
		},
	};

	const reports =
		data.data.viewAttendaceOfUserByIdMonthWise.data[0].user_data_monthwise
			.daily_report;

	const [month, setMonth] = useState(7);
	const [year, setYear] = useState(2025);
	const [selectedReport, setSelectedReport] = useState<any | null>(null);

	const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
	const currentYear = dayjs().year();

	const handleDayClick = (day: number) => {
		const dateStr = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
		const report = reports.find(
			(r) => dayjs(r.date).format("YYYY-MM-DD") === dateStr
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
								(r) => dayjs(r.date).format("YYYY-MM-DD") === dateStr
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
