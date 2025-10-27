import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	return (
		<>
			<header className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md">
				<div
					className="flex items-center space-x-2"
					onClick={() => navigate("/")}
				>
					<img
						src="/logo.png"
						alt="Logo"
						className="w-8 h-8 rounded-full border border-white/30"
					/>
					<h1 className="text-xl font-semibold tracking-wide">Pramuk Sevak</h1>
				</div>
			</header>
		</>
	);
};

export default Header;
