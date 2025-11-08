/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client/react";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_CHILD } from "../Graphql/user.graphql";

interface User {
	_id: string;
	name: string;
	balance: number;
	url: string;
	role: string;
	email: string;
	mobile: string;
	avatar?: string;
}

interface AuthContextType {
	currentUser: User | null;
	users: User[];
	isLoggedIn: boolean;
	login: (username: string, password: string, onSuccess?: () => void) => void;
	logout: (onSuccess?: () => void) => void;
	switchUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [users, setUsers] = useState<User[]>([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const token = localStorage.getItem("accessToken");

	const { refetch } = useQuery(GET_ALL_CHILD, {
		skip: !token,
		fetchPolicy: "network-only",
	});

	// ✅ Restore user after refresh
	useEffect(() => {
		if (!token) return;

		refetch().then((result) => {
			const fetchedUsers = (result as any).data?.getAllChild?.data || [];
			setUsers(fetchedUsers);

			// Try restoring last selected user
			const savedUser = localStorage.getItem("currentUser");
			if (savedUser) {
				setCurrentUser(JSON.parse(savedUser));
			} else {
				setCurrentUser(fetchedUsers[0] || null);
			}

			setIsLoggedIn(true);
		});
	}, [refetch, token]);

	const login = async (
		username: string,
		password: string,
		onSuccess?: () => void
	) => {
		const result = await refetch();
		const fetchedUsers = (result as any).data?.getAllChild?.data || [];

		if (!fetchedUsers.length) return alert("No users found");

		setUsers(fetchedUsers);
		setCurrentUser(fetchedUsers[0]);
		localStorage.setItem("currentUser", JSON.stringify(fetchedUsers[0])); // ✅ Save selected user

		setIsLoggedIn(true);
		onSuccess?.();
	};

	const logout = (onSuccess?: () => void) => {
		setCurrentUser(null);
		setUsers([]);
		setIsLoggedIn(false);
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("currentUser");
		navigate("/login");
		onSuccess?.();
	};

	const switchUser = (user: User) => {
		setCurrentUser(user);
		localStorage.setItem("currentUser", JSON.stringify(user));
	};

	return (
		<AuthContext.Provider
			value={{ currentUser, users, isLoggedIn, login, logout, switchUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
