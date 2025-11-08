import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import gsap from "gsap";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../Graphql/user.graphql";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Login = ({ onLoginSuccess }: any) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();
	const loginRef = useRef(null);

	const [parentlogin] = useMutation(LOGIN);

	const handleLogin = async () => {
		if (!username || !password) {
			alert("Please fill in all fields");
			return;
		}

		try {
			const res = await parentlogin({
				variables: {
					input: {
						email: username,
						password,
					},
				},
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = (res as any).data?.parentslogin;

			if (!response?.success) {
				alert("Invalid Username or Password");
				return;
			}

			const { accessToken, refreshToken } = response.data;

			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			login(username, password, onLoginSuccess);
		} catch (err) {
			console.error(err);
			alert("Something went wrong!");
		}
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
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			<div
				ref={loginRef}
				className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden"
			>
				{/* Decorative gradient orb */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

				<div className="relative z-10">
					{/* Logo and Title */}
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="relative">
								<div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj-MM_UyJqsvN2GeGKQKLEHNaL-cfeoLa-Q&s"
									alt="Logo"
									className="relative w-16 h-16 rounded-full border-2 border-blue-500/30 shadow-lg"
								/>
							</div>
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
							Pramukh Sevak
						</h1>
						<p className="text-gray-600 text-sm">
							Welcome back! Please login to continue
						</p>
					</div>

					{/* Form */}
					<div className="space-y-5">
						{/* Username Input */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Username
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<input
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="Enter your username"
									className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
								/>
							</div>
						</div>

						{/* Password Input */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && handleLogin()}
									placeholder="Enter your password"
									className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showPassword ? (
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
											/>
										</svg>
									) : (
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

						{/* Login Button */}
						<button
							onClick={handleLogin}
							className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-6"
						>
							Login
						</button>

						{/* Forgot Password Link */}
						<div className="text-center mt-4">
							<a
								href="#"
								className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
							>
								Forgot Password?
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
