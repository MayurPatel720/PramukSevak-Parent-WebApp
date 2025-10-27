import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import WelcomeAnimation from "./Components/WelcomeAnimation";
import AttendanceCalendar from "./Pages/attendance/AttendanceCalendar";
import Transactions from "./Pages/transactions/Transactions";
import DigitalWellbeing from "./Pages/digitalWellbeing/DigitalWellBeing";

const App = () => {
  const [appState, setAppState] = useState<"login" | "welcome" | "home">(
    "login"
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    document.head.appendChild(script);
  }, []);
  const reports = [
    {
      _id: "68ff5d538ec6925908cc2d00",
      createdAt: "2025-10-27T11:53:55.395Z",
      month: 8,
      roll: 10,
      updatedAt: "2025-10-27T11:53:55.395Z",
      year: 2025,
      user_data_monthwise: {
        jabha_lengha_absent: null,
        samuh_puja_absent: null,
        daily_report: [
          {
            date: "2025-08-01T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Present",
            mobile: "Default",
            morning_sabha_attendance: "Seva",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-02T05:30:00.000Z",
            dinner_attendance: "Seva",
            evening_sabha_attendance: "Seva",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-03T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Absent",
            lunch_attendance: "Seva",
            mobile: "Default",
            morning_sabha_attendance: "Seva",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-04T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-05T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Seva",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-06T05:30:00.000Z",
            dinner_attendance: "Seva",
            evening_sabha_attendance: "Seva",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-07T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-08T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Absent",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-09T05:30:00.000Z",
            dinner_attendance: "Leave",
            evening_sabha_attendance: "Leave",
            lunch_attendance: "Seva",
            mobile: "Leave",
            morning_sabha_attendance: "Seva",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-10T05:30:00.000Z",
            dinner_attendance: "Leave",
            evening_sabha_attendance: "Leave",
            lunch_attendance: "Leave",
            mobile: "Leave",
            morning_sabha_attendance: "Leave",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-11T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Leave",
            mobile: "Default",
            morning_sabha_attendance: "Leave",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-12T05:30:00.000Z",
            dinner_attendance: "Seva",
            evening_sabha_attendance: "Seva",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-13T05:30:00.000Z",
            dinner_attendance: "Seva",
            evening_sabha_attendance: "Seva",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-14T05:30:00.000Z",
            dinner_attendance: "Leave",
            evening_sabha_attendance: "Leave",
            lunch_attendance: "Leave",
            mobile: "Leave",
            morning_sabha_attendance: "Leave",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-15T05:30:00.000Z",
            dinner_attendance: "Leave",
            evening_sabha_attendance: "Leave",
            lunch_attendance: "Leave",
            mobile: "Leave",
            morning_sabha_attendance: "Leave",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-16T05:30:00.000Z",
            dinner_attendance: "Leave",
            evening_sabha_attendance: "Leave",
            lunch_attendance: "Leave",
            mobile: "Leave",
            morning_sabha_attendance: "Leave",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-17T05:30:00.000Z",
            dinner_attendance: "Leave",
            evening_sabha_attendance: "Leave",
            lunch_attendance: "Leave",
            mobile: "Leave",
            morning_sabha_attendance: "Leave",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-18T05:30:00.000Z",
            dinner_attendance: "Leave",
            evening_sabha_attendance: "Leave",
            lunch_attendance: "Leave",
            mobile: "Leave",
            morning_sabha_attendance: "Leave",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-19T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-20T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Present",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-21T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-22T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-23T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Present",
          },
          {
            date: "2025-08-24T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Present",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-25T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-26T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Absent",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-27T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Present",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-28T05:30:00.000Z",
            dinner_attendance: "Present",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-29T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-30T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Absent",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
          {
            date: "2025-08-31T05:30:00.000Z",
            dinner_attendance: "Absent",
            evening_sabha_attendance: "Present",
            lunch_attendance: "Present",
            mobile: "Default",
            morning_sabha_attendance: "Present",
            reading_attendance: "Absent",
          },
        ],
        statistics: {
          total_evening_sabha: 0,
          total_evening_sabha_absent: 0,
          total_late_night: 0,
          total_mobile_absent: 0,
          total_mobile_leave: 0,
          total_mobile_present: 0,
          total_month_days: 0,
          total_morning_sabha: 0,
          total_morning_sabha_absent: 0,
          total_reading: 0,
          total_reading_present: 0,
        },
      },
      user_id: {
        _id: "6866d6bbba7f9bdc7d1fa274",
        mobile: "+919426315990",
        name: "Dharmik Pradipbhai Patel",
        roll: "10",
        url: "https://avashyakam.sngmyhome.com/api/user/image/20250010",
      },
    },
  ];
  return (
    <Routes>
      <Route
        path="/"
        element={
          appState === "login" ? (
            <Login onLoginSuccess={() => setAppState("welcome")} />
          ) : appState === "welcome" ? (
            <WelcomeAnimation onComplete={() => setAppState("home")} />
          ) : (
            <Home onLogoutSuccess={() => setAppState("login")} />
          )
        }
      />
      <Route
        path="/home"
        element={<Home onLogoutSuccess={() => setAppState("login")} />}
      />

      <Route
        path="/attendance"
        element={
          <AttendanceCalendar
            reports={reports[0].user_data_monthwise.daily_report}
          />
        }
      />

      <Route path="/transactions" element={<Transactions />} />

      <Route path="/digital-wellbeing" element={<DigitalWellbeing />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
