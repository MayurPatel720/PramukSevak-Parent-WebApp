import { useEffect, useRef } from "react";
import { Bell, CreditCard, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useQuery } from "@apollo/client/react";
import { DEMO } from "../Graphql/user.graphql";
import AttendanceSummary from "../Pages/attendance/AttendanceSummary";
import TransactionsOverview from "../Pages/transactions/Overview";
import Header from "./Header";
import Footer from "./Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = ({ onLogoutSuccess }: any) => {
	const navigate = useNavigate()
  const homeRef = useRef(null);

  const notices = [
    { id: 1, title: "Community Meeting", date: "2025-10-30", type: "event" },
    { id: 2, title: "Payment Due Reminder", date: "2025-11-05", type: "alert" },
    { id: 3, title: "Festival Celebration", date: "2025-11-10", type: "event" },
  ];

  const demoTransactions = [
    {
      amount: 108,
      createdAt: "2025-10-14T19:30:10.270Z",
      credited_to: {
        name: "jeel kalathiya",
        roll: "202",
      },
      debited_from: null,
      description: "Project Paper's order's refund",
      transaction_type: "REFUND",
    },
    {
      amount: 25.2,
      createdAt: "2025-10-08T19:30:01.077Z",
      credited_to: {
        name: "jeel kalathiya",
        roll: "202",
      },
      debited_from: null,
      description: "fvygtbuk's order's refund",
      transaction_type: "REFUND",
    },
    {
      amount: 120,
      createdAt: "2025-10-07T09:17:35.856Z",
      credited_to: {
        name: "Stall C",
      },
      debited_from: {
        name: "jeel kalathiya",
        roll: "202",
      },
      description: "Project Paper's order placed",
      transaction_type: "ORDER",
    },
  ];

  const { data, loading, error } = useQuery(DEMO);
  if (loading) console.log("Loading...");
  if (error) console.log("Error : ", error);
  if (data) console.log("Data : ", data);

  useEffect(() => {
    if (typeof gsap !== "undefined" && homeRef.current) {
      gsap.fromTo(
        homeRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={homeRef}
      className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100"
    >
      <Header />

      <main className="flex-1 p-4 pb-32 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <AttendanceSummary
              totalDays={30}
              presentDays={20}
              absentDays={10}
            />
          </div>

          {/* Noticeboard */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
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
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <TransactionsOverview
              transactions={demoTransactions}
		    onSeeMore={() => navigate('/transactions')}
            />
          </div>

          {/* Digital wellbeing */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-600" />
              <h2 className="text-lg font-bold text-gray-800">
                Digital Wellbeing
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">App Usage Today</span>
                  <span className="font-semibold text-gray-800">2h 15m</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-linear-to-br from-pink-500 to-purple-500 h-3 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Weekly Goal</span>
                  <span className="font-semibold text-gray-800">12h / 15h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-linear-to-br from-blue-500 to-cyan-500 h-3 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Pass the logout handler properly */}
      <Footer onLogoutSuccess={onLogoutSuccess} />
    </div>
  );
};

export default Home;
