import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import WelcomeAnimation from "./Components/WelcomeAnimation";
import AttendanceCalendar from "./Pages/attendance/AttendanceCalendar";
import Transactions from "./Pages/transactions/Transactions";
import DigitalWellbeing from "./Pages/digitalWellbeing/DigitalWellBeing";
import Notices from "./Pages/Notice/Notices";

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

			<Route path="/attendance" element={<AttendanceCalendar />} />

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default App;
