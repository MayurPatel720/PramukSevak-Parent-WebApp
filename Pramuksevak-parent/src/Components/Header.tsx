import { useNavigate } from "react-router-dom";
import logo from "../assets/app_logo.png";	

const Header = () => {
	const navigate = useNavigate();

	return (
		<>
			<header className="flex items-center rounded-b-xl  justify-between px-4 py-4 bg-linear-to-r from-blue-500 via-blue-600 to-indigo-400 text-white shadow-lg ">
				<div
					className="flex items-center space-x-2"
					onClick={() => navigate("/")}
				>
					<img
						src={logo}
						alt="Logo"
						className="w-8 h-8 rounded-full"
					/>
					<h1 className="font-bold text-lg">Pramukh Sevak</h1>
				</div>
			</header>
		</>
	);
};

export default Header;
