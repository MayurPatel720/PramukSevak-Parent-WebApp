import { useState } from "react";
import {
	Bell,
	ArrowLeft,
	Calendar,
	Search,
	FileText,
	ExternalLink,
	X,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import { useQuery } from "@apollo/client/react";
import { GET_NOTICE } from "../../Graphql/user.graphql";

const NoticeBoardPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedNotice, setSelectedNotice] = useState(null);
	const navigate = useNavigate();
	const { data, loading, error, refetch } = useQuery(GET_NOTICE, {
		variables: {
			input: { page: 1, limit: 10 },
		},
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const notices = (data as any)?.getNoticeboard.data || [];

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
				<Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
				<p className="text-gray-600">Loading notices...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
				<div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h3 className="text-xl font-bold mb-2">Error</h3>
					<p className="text-gray-600 mb-4">{error.message}</p>
					<button
						onClick={() => refetch()}
						className="bg-blue-600 text-white px-6 py-3 rounded-lg"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

	const formatTime = (dateString: string) =>
		new Date(dateString).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});

	const filteredNotices = notices.filter((notice) => {
		const matchesSearch =
			notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			notice.content.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesSearch;
	});

	return (
		<div className="min-h-screen bg-linear-to-b from-blue-50 via-gray-50 to-gray-100 font-sans">
			{/* Header */}
			<div className="bg-linear-to-r from-indigo-700 via-purple-700 to-indigo-600 text-white px-6 py-6 rounded-b-3xl shadow-lg sticky top-0 z-20">
				<div className="flex items-center justify-between mb-6">
					<button
						onClick={() => navigate("/home")}
						className="flex items-center gap-2 text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300"
						aria-label="Go back"
					>
						<ArrowLeft className="w-6 h-6" />
					</button>
					<h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
						<Bell className="w-6 h-6" />
						Hostel Notice Board
					</h2>
					<div className="w-8" />
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 gap-3 sm:gap-4">
					{[
						{ label: "Total", count: notices.length },
						{
							label: "Active",
							count: notices.filter((n) => !n.is_deleted).length,
						},
					].map((stat, i) => (
						<div
							key={i}
							className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 text-center shadow-inner transition-transform hover:scale-105"
						>
							<p className="text-xs sm:text-sm opacity-80 font-medium">
								{stat.label}
							</p>
							<p className="text-xl sm:text-2xl font-bold">{stat.count}</p>
						</div>
					))}
				</div>
			</div>

			{/* Body */}
			<div className="p-5 sm:p-6 max-w-2xl mx-auto mb-24">
				{/* Search Bar */}
				<div className="relative mb-6">
					<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="text"
						placeholder="Search hostel notices..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-sm sm:text-base transition-all"
					/>
				</div>

				{/* Notices */}
				<div className="space-y-4">
					{filteredNotices.map((notice) => (
						<div
							key={notice._id}
							onClick={() => setSelectedNotice(notice)}
							className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-5 cursor-pointer"
						>
							<div className="">
								<div className="mb-2">
									<h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
										{notice.title}
									</h3>
								</div>
								<p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
									{notice.content}
								</p>
								<div className="flex items-center text-xs text-gray-500 gap-2 mt-3">
									<Calendar className="w-3.5 h-3.5" />
									{formatDate(notice.createdAt)} •{" "}
									{formatTime(notice.createdAt)}
								</div>
							</div>
						</div>
					))}

					{filteredNotices.length === 0 && (
						<p className="text-center text-gray-500 text-sm mt-8">
							No notices found.
						</p>
					)}
				</div>
			</div>

			{/* Modal */}
			{selectedNotice && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
					<div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
						<button
							onClick={() => setSelectedNotice(null)}
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
						>
							<X className="w-6 h-6" />
						</button>

						<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							{selectedNotice.title}
						</h3>
						<p className="text-gray-600 text-sm leading-relaxed mb-4">
							{selectedNotice.content}
						</p>

						<div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4">
							<Calendar className="w-4 h-4 mr-1" />
							{formatDate(selectedNotice.createdAt)} •{" "}
							{formatTime(selectedNotice.createdAt)}
						</div>

						{selectedNotice.attachments.length > 0 && (
							<div className="space-y-3">
								<p className="text-sm font-semibold text-gray-700 mb-2">
									Attachments:
								</p>
								{selectedNotice.attachments.map((url, idx) =>
									url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
										<img
											key={idx}
											src={url}
											alt={`Notice attachment ${idx + 1}`}
											className="rounded-lg w-full object-cover max-h-64"
										/>
									) : (
										<a
											key={idx}
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-indigo-600 text-sm hover:underline"
										>
											<FileText className="w-4 h-4" /> View Document{" "}
											<ExternalLink className="w-3 h-3" />
										</a>
									)
								)}
							</div>
						)}
					</div>
				</div>
			)}

			<Footer
				onLogoutSuccess={() => {
					navigate("/login");
				}}
			/>
		</div>
	);
};

export default NoticeBoardPage;
