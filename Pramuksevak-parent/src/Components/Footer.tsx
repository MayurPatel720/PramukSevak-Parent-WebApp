import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import gsap from "gsap";

interface FooterProps {
	onLogoutSuccess: () => void;
}

const Footer = ({ onLogoutSuccess }: FooterProps) => {
	const footerRef = useRef<HTMLDivElement>(null);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const { currentUser, logout, users, switchUser } = useAuth();

	useEffect(() => {
		if (footerRef.current) {
			gsap.fromTo(
				footerRef.current,
				{ y: 40, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
			);
		}
	}, []);

	const handleLogout = () => {
		if (footerRef.current) {
			gsap.to(footerRef.current, {
				y: 20,
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
				onComplete: () => {
					logout();
					onLogoutSuccess(); // ✅ Trigger state change in App
				},
			});
		} else {
			logout();
			onLogoutSuccess();
		}
	};

	return (
		<div
			ref={footerRef}
			className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200"
		>
			<div className="max-w-4xl mx-auto p-4">
				<div className="flex items-center justify-between">
					{/* User info */}
					<div className="flex items-center gap-3 flex-1">
						<div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
							{currentUser?.avatar || "U"}
						</div>
						<div className="flex-1">
							<p className="font-semibold text-gray-800">
								{currentUser?.name || "Guest"}
							</p>
							<p className="text-sm text-gray-600">
								Balance: ₹{currentUser?.balance?.toLocaleString("en-IN") || 0}
							</p>
						</div>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-2">
						<button
							onClick={() => setShowUserMenu(!showUserMenu)}
							className="p-2 hover:bg-gray-100 rounded-xl transition"
						>
							<ChevronDown
								className={`w-5 h-5 text-gray-600 transition-transform ${
									showUserMenu ? "rotate-180" : ""
								}`}
							/>
						</button>
						<button
							onClick={handleLogout}
							className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition"
						>
							<LogOut className="w-5 h-5 text-red-600" />
						</button>
					</div>
				</div>

				{/* User Switch Dropdown */}
				{showUserMenu && users?.length > 1 && (
					<div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
						{users
							.filter((u) => u.id !== currentUser?.id)
							.map((user) => (
								<div
									key={user.id}
									onClick={() => switchUser(user)}
									className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition"
								>
									<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
										{user.avatar}
									</div>
									<div className="flex-1">
										<p className="font-medium text-gray-800 text-sm">
											{user.name}
										</p>
										<p className="text-xs text-gray-600">
											₹{user.balance.toLocaleString("en-IN")}
										</p>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Footer;
