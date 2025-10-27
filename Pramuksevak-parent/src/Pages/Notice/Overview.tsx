import { Bell } from "lucide-react";

const Overview = () => {
	const notices = [
		{ id: 1, title: "Community Meeting", date: "2025-10-30", type: "event" },
		{ id: 2, title: "Payment Due Reminder", date: "2025-11-05", type: "alert" },
		{ id: 3, title: "Festival Celebration", date: "2025-11-10", type: "event" },
	];
	return (
		<>
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
		</>
	);
};

export default Overview;
