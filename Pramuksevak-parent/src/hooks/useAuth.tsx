import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
	id: number;
	name: string;
	balance: number;
	avatar: string;
}

interface AuthContextType {
	currentUser: User | null;
	isLoggedIn: boolean;
	users: User[];
	login: (username: string, password: string, onSuccess?: () => void) => void;
	logout: (onSuccess?: () => void) => void;
	switchUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate(); // ✅ Add this line
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const users: User[] = [
		{ id: 1, name: "Rajesh Kumar", balance: 25430.5, avatar: "RK" },
		{ id: 2, name: "Priya Sharma", balance: 18920.75, avatar: "PS" },
		{ id: 3, name: "Amit Patel", balance: 32150.0, avatar: "AP" },
	];

	const login = (
		username: string,
		password: string,
		onSuccess?: () => void
	) => {
		if (username && password) {
			setCurrentUser(users[0]);
			setIsLoggedIn(true);
			if (onSuccess) onSuccess();
		}
	};

	const logout = (onSuccess?: () => void) => {
		setCurrentUser(null);
		setIsLoggedIn(false);
		navigate("/login"); // ✅ Now works properly
		if (onSuccess) onSuccess();
	};

	const switchUser = (user: User) => {
		setCurrentUser(user);
	};

	return (
		<AuthContext.Provider
			value={{ currentUser, isLoggedIn, users, login, logout, switchUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
