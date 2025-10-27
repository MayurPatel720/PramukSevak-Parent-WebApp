import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { Bell, Calendar, Clock, ChevronRight, AlertCircle } from "lucide-react";

interface Notice {
  _id: string;
  title: string;
  description: string;
  media?: string[];
  createdAt: string;
  priority: "high" | "medium" | "low";
  category: string;
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
      gsap.from(".notice-header", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".notice-stat", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.2,
        ease: "back.out(1.7)",
      });

      gsap.from(".notice-card", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.4,
        ease: "power2.out",
      });

      gsap.from(".see-more-btn", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [notices]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Show only latest 3 notices
  const recentNotices = useMemo(() => notices.slice(0, 3), [notices]);

  const highPriorityCount = notices.filter((n) => n.priority === "high").length;
  const unreadCount = notices.length;

  return (
    <div ref={containerRef} className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="notice-header flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Bell className="w-6 h-6 text-indigo-600" />
          Notice Board
        </h2>

        <div className="flex items-center gap-2">
          {highPriorityCount > 0 && (
            <span className="flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
              <AlertCircle className="w-3 h-3" />
              {highPriorityCount} urgent
            </span>
          )}
          <button onClick={onSeeMore} className="see-more-btn hover:cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="notice-stat bg-linear-to-br from-indigo-50 to-indigo-100 p-3 rounded-xl border border-indigo-200">
          <p className="text-xs text-indigo-700 font-medium mb-1">
            Total Notices
          </p>
          <p className="text-xl font-bold text-indigo-800">{unreadCount}</p>
        </div>
        <div className="notice-stat bg-linear-to-br from-purple-50 to-purple-100 p-3 rounded-xl border border-purple-200">
          <p className="text-xs text-purple-700 font-medium mb-1">This Week</p>
          <p className="text-xl font-bold text-purple-800">
            {
              notices.filter((n) => {
                const diff = Date.now() - new Date(n.createdAt).getTime();
                return diff < 7 * 24 * 60 * 60 * 1000;
              }).length
            }
          </p>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="space-y-3 mb-4">
        {recentNotices.map((notice) => (
          <div
            key={notice._id}
            className="notice-card bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div
                  key={notice._id}
                  className="notice-card relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex-1 pl-2">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {notice.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${getPriorityColor(
                          notice.priority
                        )}`}
                      >
                        {notice.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {notice.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(notice.createdAt)}
                        </span>
                        {notice.category && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {notice.category}
                          </span>
                        )}
                      </div>
                      {notice.media?.length ? (
                        <span>📎 {notice.media.length}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoardOverview;
