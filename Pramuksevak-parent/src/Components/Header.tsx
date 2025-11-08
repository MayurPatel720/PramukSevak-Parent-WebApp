import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	return (
		<>
			<header className="flex items-center rounded-b-xl  justify-between px-4 py-4 bg-linear-to-r from-blue-600 via-blue-700 to-indigo-600 text-white shadow-lg ">
				<div
					className="flex items-center space-x-2"
					onClick={() => navigate("/")}
				>
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj-MM_UyJqsvN2GeGKQKLEHNaL-cfeoLa-Q&s"
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
