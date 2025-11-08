import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Bell, Calendar, ChevronRight, Paperclip, Trash2 } from "lucide-react";

interface Notice {
	_id: string;
	title: string;
	content: string;
	attachments: string[];
	createdAt: string;
	updatedAt: string;
	is_deleted: boolean;
}

interface NoticeBoardOverviewProps {
	notices: Notice[];
	onSeeMore: () => void;
}

const NoticeBoardOverview: React.FC<NoticeBoardOverviewProps> = ({
	notices,
	onSeeMore,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".notice-header", { y: -20, opacity: 0, duration: 0.5 });
			gsap.from(".notice-stat", {
				scale: 0.9,
				opacity: 0,
				duration: 0.5,
				stagger: 0.1,
			});
			gsap.from(".notice-card", {
				y: 20,
				opacity: 0,
				duration: 0.4,
				stagger: 0.15,
			});
		}, containerRef);
		return () => ctx.revert();
	}, [notices]);

	const getDeletedStyle = (isDeleted: boolean) => {
		if (isDeleted) {
			return "line-through opacity-60";
		}
		return "";
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffHours / 24);
		if (diffHours < 1) return "Just now";
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	};

	// Show all notices, including deleted
	const recentNotices = notices?.slice(0, 3);

	return (
		<div ref={containerRef} className="relative rounded-2xl overflow-hidden">
			{/* Header */}
			<div className="notice-header flex items-center justify-between mb-5">
				<h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
					<Bell className="w-5 h-5 text-indigo-600" />
					Notice Board
				</h2>

				<div className="flex items-center gap-3">
					<button
						onClick={onSeeMore}
						className="see-more-btn flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow transition-all"
					>
						All <ChevronRight className="w-3 h-3" />
					</button>
				</div>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-2 gap-3 mb-4">
				<div className="notice-stat bg-indigo-50 border border-indigo-100 p-3 rounded-xl">
					<p className="text-xs text-indigo-700 font-medium mb-1">
						Total Notices
					</p>
					<p className="text-xl font-bold text-indigo-800">{notices?.length}</p>
				</div>
				<div className="notice-stat bg-purple-50 border border-purple-100 p-3 rounded-xl">
					<p className="text-xs text-purple-700 font-medium mb-1">Active</p>
					<p className="text-xl font-bold text-purple-800">
						{notices?.filter((n) => !n.is_deleted).length}
					</p>
				</div>
			</div>

			{/* Notice Cards */}
			<div className="space-y-3">
				{recentNotices?.map((notice) => (
					<div
						key={notice._id}
						className="notice-card relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 cursor-pointer group"
					>
						<div className="pl-3">
							<div className="flex items-start justify-between mb-1">
								<h3
									className={`text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition }`}
								>
									{notice.title}
								</h3>
							</div>

							<div className="flex items-center justify-between text-[11px] text-gray-500">
								<div className="flex items-center gap-2">
									<span className="flex items-center gap-1">
										<Calendar className="w-3 h-3" />
										{formatDate(notice.createdAt)}
									</span>
								</div>

								{notice.attachments.length > 0 && (
									<span className="flex items-center gap-1 text-indigo-600 font-medium">
										<Paperclip className="w-3 h-3" />{" "}
										{notice.attachments.length}
									</span>
								)}
							</div>
						</div>
					</div>
				))}
				{recentNotices?.length === 0 && (
					<div className="notice-card bg-white border border-gray-100 rounded-xl shadow-sm p-3 text-center text-gray-500">
						No notices available.
					</div>
				)}
			</div>
		</div>
	);
};

export default NoticeBoardOverview;
