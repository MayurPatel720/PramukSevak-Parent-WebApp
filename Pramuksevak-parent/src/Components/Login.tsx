import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import gsap from "gsap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Login = ({ onLoginSuccess }: any) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const loginRef = useRef(null);

	const handleLogin = () => {
		login(username, password, () => {
			if (typeof gsap !== "undefined" && loginRef.current) {
				gsap.to(loginRef.current, {
					scale: 0.95,
					opacity: 0,
					duration: 0.4,
					ease: "power2.in",
					onComplete: onLoginSuccess,
				});
			} else {
				onLoginSuccess();
			}
		});
	};

	useEffect(() => {
		if (typeof gsap !== "undefined" && loginRef.current) {
			gsap.fromTo(
				loginRef.current,
				{ scale: 1.05, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
			);
		}
	}, []);

	return (
		<div
			ref={loginRef}
			className="min-h-screen flex items-center justify-center p-4 bg-linear-to-r from-blue-50 to-indigo-100"
		>
			<div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Pramuk Sevak
					</h1>
					<p className="text-gray-600">
						Welcome back! Please login to continue
					</p>
				</div>

				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Username
						</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
							placeholder="Enter your username"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleLogin()}
							className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
							placeholder="Enter your password"
						/>
					</div>

					<button
						onClick={handleLogin}
						className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
					>
						Login
					</button>
				</div>

				<div className="mt-6 text-center text-sm text-gray-600">
					<p>Demo: Use any username and password</p>
				</div>
			</div>
		</div>
	);
};
export default Login;
