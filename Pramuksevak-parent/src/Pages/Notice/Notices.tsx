import React, { useState } from "react";
import {
  Bell,
  ArrowLeft,
  Calendar,
  Search,
  ImageIcon,
  FileText,
  ExternalLink,
  X,
} from "lucide-react";

interface Notice {
  _id: string;
  title: string;
  description: string;
  media: string[];
  createdAt: string;
  priority: "high" | "medium" | "low";
  category: string;
  author?: string;
}

const NoticeBoardPage = () => {
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Updated notices for hostel management
  const notices: Notice[] = [
    {
      _id: "1",
      title: "🚨 Urgent: Water Supply Maintenance",
      description:
        "Water supply in Hostel Blocks A and B will be unavailable on November 1st from 9 AM to 2 PM due to scheduled pipeline maintenance. Please store sufficient water in advance.",
      media: [
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800",
        "https://example.com/maintenance-schedule.pdf",
      ],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      priority: "high",
      category: "Maintenance",
      author: "Hostel Administration",
    },
    {
      _id: "2",
      title: "🎉 Hostel Fest 2025 Registration Open",
      description:
        "Join the annual Hostel Fest on November 15th! Register your teams for cultural and sports events by November 10th via the hostel portal.",
      media: ["https://images.unsplash.com/photo-1517457373958-b4bdd8b50d2a?w=800"],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      priority: "medium",
      category: "Events",
      author: "Hostel Event Committee",
    },
    {
      _id: "3",
      title: "📢 New Hostel Rules Update",
      description:
        "Updated hostel rules effective November 1st include revised visiting hours and mandatory room inspections every Friday. Check the hostel portal for details.",
      media: [],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      priority: "low",
      category: "Rules",
      author: "Hostel Warden",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

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
    const matchesPriority =
      filterPriority === "ALL" || notice.priority === filterPriority.toLowerCase();
    const matchesCategory =
      filterCategory === "ALL" || notice.category === filterCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesCategory && matchesSearch;
  });

  const highPriorityCount = notices.filter((n) => n.priority === "high").length;
  const mediumPriorityCount = notices.filter((n) => n.priority === "medium").length;
  const lowPriorityCount = notices.filter((n) => n.priority === "low").length;
  const categories = ["ALL", ...Array.from(new Set(notices.map((n) => n.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white px-6 py-5 rounded-b-3xl shadow-xl sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
          <button
            className="flex items-center gap-2 text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Bell className="w-6 h-6" />
            Hostel Notice Board
          </h2>
          <div className="w-8" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transition-transform hover:scale-105">
            <p className="text-sm font-medium opacity-90">Urgent</p>
            <p className="text-2xl font-bold">{highPriorityCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transition-transform hover:scale-105">
            <p className="text-sm font-medium opacity-90">Medium</p>
            <p className="text-2xl font-bold">{mediumPriorityCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transition-transform hover:scale-105">
            <p className="text-sm font-medium opacity-90">Info</p>
            <p className="text-2xl font-bold">{lowPriorityCount}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 max-w-2xl mx-auto mb-24">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search hostel notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
            aria-label="Search notices"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
          {["ALL", "HIGH", "MEDIUM", "LOW"].map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                filterPriority === priority
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
              aria-pressed={filterPriority === priority}
            >
              {priority}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                filterCategory === category
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
              aria-pressed={filterCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              onClick={() => setSelectedNotice(notice)}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && setSelectedNotice(notice)}
              aria-label={`View notice: ${notice.title}`}
            >
              <div className={`h-1.5 ${getPriorityColor(notice.priority)}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {notice.title}
                  </h3>
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium ${getPriorityBadgeColor(
                      notice.priority
                    )}`}
                  >
                    {notice.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {notice.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(notice.createdAt)} at {formatTime(notice.createdAt)}
                  {notice.author && <span>• {notice.author}</span>}
                </div>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <p className="text-center text-gray-500 text-sm mt-8">No notices found.</p>
          )}
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 relative animate-fade-in">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close notice"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedNotice.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{selectedNotice.description}</p>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(selectedNotice.createdAt)} • {formatTime(selectedNotice.createdAt)}
              {selectedNotice.author && <span> • {selectedNotice.author}</span>}
            </div>

            {selectedNotice.media.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">Attachments:</p>
                {selectedNotice.media.map((url, idx) =>
                  url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                    <img
                      key={idx}
                      src={url}
                      alt={`Notice media ${idx + 1}`}
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
                      <FileText className="w-4 h-4" /> View Document
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoardPage;