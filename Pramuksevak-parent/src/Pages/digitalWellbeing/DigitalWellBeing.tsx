import React, { useState } from "react";
import {
  Smartphone,
  ArrowLeft,
  Clock,
  Unlock,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

const DigitalWellbeingPage = () => {
  const [activeTab, setActiveTab] = useState<"week" | "apps" | "insights">("week");

  const wellbeingData = {
    userId: "user123",
    days: [
      {
        date: "2025-10-21",
        totalScreenTime: 280,
        unlockCount: 78,
        apps: [
          { appName: "Instagram", packageName: "com.instagram", usageMinutes: 110 },
          { appName: "WhatsApp", packageName: "com.whatsapp", usageMinutes: 75 },
          { appName: "YouTube", packageName: "com.youtube", usageMinutes: 55 },
          { appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
        ],
      },
      {
        date: "2025-10-22",
        totalScreenTime: 310,
        unlockCount: 85,
        apps: [
          { appName: "Instagram", packageName: "com.instagram", usageMinutes: 125 },
          { appName: "WhatsApp", packageName: "com.whatsapp", usageMinutes: 80 },
          { appName: "YouTube", packageName: "com.youtube", usageMinutes: 65 },
          { appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
        ],
      },
      {
        date: "2025-10-23",
        totalScreenTime: 265,
        unlockCount: 72,
        apps: [
          { appName: "Instagram", packageName: "com.instagram", usageMinutes: 100 },
          { appName: "WhatsApp", packageName: "com.whatsapp", usageMinutes: 70 },
          { appName: "YouTube", packageName: "com.youtube", usageMinutes: 55 },
          { appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
        ],
      },
      {
        date: "2025-10-24",
        totalScreenTime: 325,
        unlockCount: 95,
        apps: [
          { appName: "Instagram", packageName: "com.instagram", usageMinutes: 135 },
          { appName: "WhatsApp", packageName: "com.whatsapp", usageMinutes: 85 },
          { appName: "YouTube", packageName: "com.youtube", usageMinutes: 65 },
          { appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
        ],
      },
      {
        date: "2025-10-25",
        totalScreenTime: 290,
        unlockCount: 80,
        apps: [
          { appName: "Instagram", packageName: "com.instagram", usageMinutes: 115 },
          { appName: "WhatsApp", packageName: "com.whatsapp", usageMinutes: 75 },
          { appName: "YouTube", packageName: "com.youtube", usageMinutes: 60 },
          { appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
        ],
      },
      {
        date: "2025-10-26",
        totalScreenTime: 300,
        unlockCount: 85,
        apps: [
          { appName: "Instagram", packageName: "com.instagram", usageMinutes: 120 },
          { appName: "WhatsApp", packageName: "com.whatsapp", usageMinutes: 80 },
          { appName: "YouTube", packageName: "com.youtube", usageMinutes: 60 },
          { appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
        ],
      },
      {
        date: "2025-10-27",
        totalScreenTime: 345,
        unlockCount: 92,
        apps: [
          { appName: "Instagram", packageName: "com.instagram", usageMinutes: 140 },
          { appName: "WhatsApp", packageName: "com.whatsapp", usageMinutes: 95 },
          { appName: "YouTube", packageName: "com.youtube", usageMinutes: 70 },
          { appName: "Chrome", packageName: "com.chrome", usageMinutes: 40 },
        ],
      },
    ],
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
  };

  const today = wellbeingData.days[wellbeingData.days.length - 1];
  const weeklyAvg = Math.round(
    wellbeingData.days.reduce((sum, day) => sum + day.totalScreenTime, 0) /
      wellbeingData.days.length
  );
  const weeklyUnlockAvg = Math.round(
    wellbeingData.days.reduce((sum, day) => sum + day.unlockCount, 0) /
      wellbeingData.days.length
  );

  const screenTimeChartData = wellbeingData.days.map((day) => ({
    date: formatDate(day.date),
    minutes: day.totalScreenTime,
    hours: (day.totalScreenTime / 60).toFixed(1),
  }));

  const unlockChartData = wellbeingData.days.map((day) => ({
    date: formatDate(day.date),
    unlocks: day.unlockCount,
  }));

  const appUsageMap = new Map<string, number>();
  wellbeingData.days.forEach((day) => {
    day.apps.forEach((app) => {
      const current = appUsageMap.get(app.appName) || 0;
      appUsageMap.set(app.appName, current + app.usageMinutes);
    });
  });

  const topApps = Array.from(appUsageMap.entries())
    .map(([name, minutes]) => ({ name, minutes }))
    .sort((a, b) => b.minutes - a.minutes)
    .slice(0, 5);

  const appPieData = topApps.map((app) => ({
    name: app.name,
    value: app.minutes,
    percentage: ((app.minutes / topApps.reduce((sum, a) => sum + a.minutes, 0)) * 100).toFixed(1),
  }));

  const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

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

  const mostUsedApp = topApps[0];
  const peakDay = wellbeingData.days.reduce((max, day) =>
    day.totalScreenTime > max.totalScreenTime ? day : max
  );
  const leastDay = wellbeingData.days.reduce((min, day) =>
    day.totalScreenTime < min.totalScreenTime ? day : min
  );
  
  const yesterdayIndex = wellbeingData.days.length - 2;
  const changeFromYesterday = today.totalScreenTime - wellbeingData.days[yesterdayIndex].totalScreenTime;
  const percentChange = ((changeFromYesterday / wellbeingData.days[yesterdayIndex].totalScreenTime) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-4 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1 text-white hover:bg-white/20 rounded-lg p-2 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Digital Wellbeing
          </h2>
          <div className="w-8" />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <Clock className="w-4 h-4 mx-auto mb-1 opacity-90" />
            <p className="text-xs opacity-90 mb-1">Today</p>
            <p className="text-lg font-bold">{formatTime(today.totalScreenTime)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <Calendar className="w-4 h-4 mx-auto mb-1 opacity-90" />
            <p className="text-xs opacity-90 mb-1">Avg/Day</p>
            <p className="text-lg font-bold">{formatTime(weeklyAvg)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <Unlock className="w-4 h-4 mx-auto mb-1 opacity-90" />
            <p className="text-xs opacity-90 mb-1">Unlocks</p>
            <p className="text-lg font-bold">{today.unlockCount}</p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto mb-20">
        <div className="flex gap-2 mb-4 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab("week")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "week"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <BarChart3 className="w-4 h-4 mx-auto mb-1" />
            Weekly
          </button>
          <button
            onClick={() => setActiveTab("apps")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "apps"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <PieChart className="w-4 h-4 mx-auto mb-1" />
            Apps
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "insights"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <TrendingUp className="w-4 h-4 mx-auto mb-1" />
            Insights
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === "week" && (
            <>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  Screen Time This Week
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={screenTimeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [formatTime(value), "Screen Time"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: "#8B5CF6", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Unlock className="w-4 h-4 text-blue-600" />
                  Phone Unlocks
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={unlockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [value, "Unlocks"]}
                    />
                    <Bar dataKey="unlocks" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Daily Breakdown</h3>
                <div className="space-y-2">
                  {wellbeingData.days.slice().reverse().map((day) => (
                    <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{formatDate(day.date)}</p>
                        <p className="text-xs text-gray-500">{day.unlockCount} unlocks</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-purple-600">{formatTime(day.totalScreenTime)}</p>
                        <p className="text-xs text-gray-500">screen time</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "apps" && (
            <>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Apps Usage</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RePieChart>
                    <Pie
                      data={appPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {appPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [formatTime(value), "Usage"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">App Usage Details</h3>
                <div className="space-y-3">
                  {topApps.map((app, index) => (
                    <div key={app.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                          style={{ backgroundColor: COLORS[index] + "20" }}
                        >
                          {getAppIcon(app.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{app.name}</p>
                          <p className="text-xs text-gray-500">
                            {((app.minutes / topApps.reduce((sum, a) => sum + a.minutes, 0)) * 100).toFixed(0)}% of usage
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold" style={{ color: COLORS[index] }}>
                          {formatTime(app.minutes)}
                        </p>
                        <p className="text-xs text-gray-500">this week</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "insights" && (
            <>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  {changeFromYesterday > 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  Today vs Yesterday
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{Math.abs(changeFromYesterday)} min</p>
                    <p className="text-sm text-gray-500">{changeFromYesterday > 0 ? "increase" : "decrease"}</p>
                  </div>
                  <div className={`text-3xl font-bold ${changeFromYesterday > 0 ? "text-red-500" : "text-green-500"}`}>
                    {changeFromYesterday > 0 ? "+" : ""}{percentChange}%
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Insights</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-start gap-2">
                      <div className="text-2xl">{getAppIcon(mostUsedApp.name)}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Most Used App</p>
                        <p className="text-xs text-gray-600 mt-1">
                          You spent {formatTime(mostUsedApp.minutes)} on {mostUsedApp.name} this week
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Peak Usage Day</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Your highest screen time was {formatTime(peakDay.totalScreenTime)} on {formatDate(peakDay.date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-start gap-2">
                      <TrendingDown className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Best Day</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Your lowest screen time was {formatTime(leastDay.totalScreenTime)} on {formatDate(leastDay.date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-start gap-2">
                      <Unlock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Average Unlocks</p>
                        <p className="text-xs text-gray-600 mt-1">
                          You unlock your phone about {weeklyUnlockAvg} times per day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 shadow-sm border border-purple-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">💡 Recommendations</h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Try setting app timers for {mostUsedApp.name} to reduce usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Consider using Focus Mode during work hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Reduce phone unlocks by checking notifications less frequently</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalWellbeingPage;