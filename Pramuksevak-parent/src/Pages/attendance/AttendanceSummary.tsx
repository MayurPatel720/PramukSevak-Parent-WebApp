import { Calendar } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface AttendanceSummaryProps {
	totalDays: number;
	presentDays: number;
	absentDays: number;
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({
	totalDays,
	presentDays,
	absentDays,
}) => {
	const attendancePercentage = Math.round((presentDays / totalDays) * 100);
	const navigate = useNavigate();

	return (
		<div className="w-full max-w-sm mx-auto  rounded-2xl ">
			<h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
				<Calendar className="w-6 h-6 text-blue-600" />
				Attendance Overview
			</h2>

			{/* Summary Cards */}
			<div className="grid grid-cols-3 gap-3 text-center">
				<div className="bg-linear-to-br from-green-400/90 to-green-500 text-white p-3 rounded-xl shadow-sm">
					<p className="text-2xl font-bold">{presentDays}</p>
					<p className="text-xs opacity-90">Present</p>
				</div>

				<div className="bg-linear-to-br from-rose-400/90 to-red-500 text-white p-3 rounded-xl shadow-sm">
					<p className="text-2xl font-bold">{absentDays}</p>
					<p className="text-xs opacity-90">Absent</p>
				</div>

				<div className="bg-linear-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-xl shadow-sm">
					<p className="text-2xl font-bold">{attendancePercentage}%</p>
					<p className="text-xs opacity-90">Rate</p>
				</div>
			</div>

			{/* Button */}
			<button
				className="mt-5 w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium shadow hover:from-blue-700 hover:to-indigo-700 transition-all"
				onClick={() => navigate("/attendance")}
			>
				View Full Calendar
			</button>
		</div>
	);
};

export default AttendanceSummary;
