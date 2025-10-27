import { useEffect, useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import WelcomeAnimation from "./Components/WelcomeAnimation";

const App = () => {
	const [showLogin, setShowLogin] = useState(true);
	const [showWelcome, setShowWelcome] = useState(false);
	const [showHome, setShowHome] = useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
		document.head.appendChild(script);
	}, []);

	const handleLoginSuccess = () => {
		setShowLogin(false);
		setShowWelcome(true);
	};

	const handleWelcomeComplete = () => {
		setShowWelcome(false);
		setShowHome(true);
	};

	const handleLogoutSuccess = () => {
		setShowHome(false);
		setShowLogin(true);
	};

	return (
		<>
			{showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
			{showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
			{showHome && <Home onLogoutSuccess={handleLogoutSuccess} />}
		</>
	);
};

export default App;
