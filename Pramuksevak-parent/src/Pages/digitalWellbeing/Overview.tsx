import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Smartphone,
  TrendingUp,
  TrendingDown,
  Clock,
  Unlock,
  Eye
} from "lucide-react";

interface AppUsage {
  appName: string;
  packageName: string;
  usageMinutes: number;
  icon?: string;
}

interface DayData {
  date: string;
  totalScreenTime: number;
  unlockCount: number;
  apps: AppUsage[];
}

interface WellbeingData {
  userId: string;
  days: DayData[];
}

interface DigitalWellbeingOverviewProps {
  data: WellbeingData;
  onSeeMore: () => void;
}

const DigitalWellbeingOverview: React.FC<DigitalWellbeingOverviewProps> = ({
  data,
  onSeeMore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wellbeing-header", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".stat-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "back.out(1.7)",
      });

      gsap.from(".app-item", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: "power2.out",
      });

      gsap.from(".see-more-btn", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.7,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  // Calculate today's stats
  const today = data.days[data.days.length - 1];
  const yesterday = data.days[data.days.length - 2];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const screenTimeChange = calculateChange(
    today.totalScreenTime,
    yesterday?.totalScreenTime || 0
  );

  const unlockChange = calculateChange(
    today.unlockCount,
    yesterday?.unlockCount || 0
  );

  // Get top 3 apps
  const topApps = [...today.apps]
    .sort((a, b) => b.usageMinutes - a.usageMinutes)
    .slice(0, 3);

  const getAppIcon = (appName: string) => {
    const icons: Record<string, string> = {
      Instagram: "📸",
      WhatsApp: "💬",
      YouTube: "▶️",
      Chrome: "🌐",
      Gmail: "📧",
      Facebook: "👥",
      Twitter: "🐦",
      Spotify: "🎵",
      Netflix: "🎬",
    };
    return icons[appName] || "📱";
  };

  return (
    <div ref={containerRef} className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="wellbeing-header flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Smartphone className="w-6 h-6 text-purple-600" />
          Digital Wellbeing
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Today
          </span>
          <button onClick={onSeeMore} className="see-more-btn hover:cursor-pointer p-2 border-transparent rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="stat-card bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-purple-700" />
            <p className="text-xs text-purple-700 font-medium">Screen Time</p>
          </div>
          <p className="text-2xl font-bold text-purple-800 mb-1">
            {formatTime(today.totalScreenTime)}
          </p>
          <div className="flex items-center gap-1 text-xs">
            {screenTimeChange >= 0 ? (
              <TrendingUp className="w-3 h-3 text-red-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-green-600" />
            )}
            <span
              className={`font-medium ${
                screenTimeChange >= 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {Math.abs(screenTimeChange).toFixed(0)}%
            </span>
            <span className="text-gray-500">vs yesterday</span>
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Unlock className="w-4 h-4 text-blue-700" />
            <p className="text-xs text-blue-700 font-medium">Unlocks</p>
          </div>
          <p className="text-2xl font-bold text-blue-800 mb-1">
            {today.unlockCount}
          </p>
          <div className="flex items-center gap-1 text-xs">
            {unlockChange >= 0 ? (
              <TrendingUp className="w-3 h-3 text-red-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-green-600" />
            )}
            <span
              className={`font-medium ${
                unlockChange >= 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {Math.abs(unlockChange).toFixed(0)}%
            </span>
            <span className="text-gray-500">vs yesterday</span>
          </div>
        </div>
      </div>

      {/* Top Apps */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Most Used Apps
        </h3>
        <div className="space-y-2">
          {topApps.map((app, index) => {
            const percentage = (app.usageMinutes / today.totalScreenTime) * 100;
            return (
              <div
                key={app.packageName}
                className="app-item bg-white rounded-xl p-3 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getAppIcon(app.appName)}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {app.appName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(app.usageMinutes)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-purple-600">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* See More Button */}
    </div>
  );
};

export default DigitalWellbeingOverview;
