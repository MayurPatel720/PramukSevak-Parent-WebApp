/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useEffect,
	useRef,
	useState,
	type JSXElementConstructor,
	type Key,
	type ReactElement,
	type ReactNode,
	type ReactPortal,
} from "react";
import gsap from "gsap";
import {
	Calendar,
	ArrowLeft,
	Search,
	ArrowUpRight,
	ArrowDownRight,
	RefreshCw,
	Plus,
	ChevronLeft,
	ChevronRight,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { GET_TRANSECTIONS } from "../../Graphql/user.graphql";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@apollo/client/react";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [filterType, setFilterType] = useState<string>("ALL");
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 20; // you can change this

	const user = useAuth();
	const userName = user?.currentUser?.name || "";
	const userId = user?.currentUser?._id || "";

	const {
		data: transection,
		loading: tloading,
		error: terror,
		refetch,
	} = useQuery(GET_TRANSECTIONS, {
		variables: {
			filters: { page: currentPage, limit, userId },
		},
		fetchPolicy: "cache-and-network",
	});
	const navigate = useNavigate();
	const transactions =
		(transection as any)?.findTransactionWithFilter?.data || [];
	const totalPages =
		(transection as any)?.findTransactionWithFilter?.totalPages || 1;

	/* ---------- GSAP – run on every mount (even while loading) ---------- */
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".header-content", { y: -20, opacity: 0, duration: 0.5 });
			gsap.from(".summary-stat", {
				scale: 0.8,
				opacity: 0,
				duration: 0.6,
				stagger: 0.1,
				delay: 0.2,
				ease: "back.out(1.7)",
			});
			gsap.from(".filter-btn", {
				y: 20,
				opacity: 0,
				duration: 0.5,
				stagger: 0.08,
				delay: 0.4,
			});
			gsap.from(".transaction-card", {
				x: -30,
				opacity: 0,
				duration: 0.5,
				stagger: 0.08,
				delay: 0.6,
			});
		}, containerRef);

		return () => ctx.revert();
	}, []); // <-- run once on mount

	/* ---------- Helper functions ---------- */
	const getTransactionIcon = (type: string) => {
		switch (type) {
			case "REFUND":
				return <RefreshCw className="w-5 h-5" />;
			case "ORDER":
				return <ArrowUpRight className="w-5 h-5" />;
			case "CREDITTOUSER":
				return <ArrowDownRight className="w-5 h-5" />;
			case "DEBITFROMUSER":
			case "FINE":
				return <ArrowUpRight className="w-5 h-5" />;
			case "TRANSFER":
				return <Plus className="w-5 h-5" />;
			default:
				return <Plus className="w-5 h-5" />;
		}
	};

	const getTransactionColor = (type: string) => {
		switch (type) {
			case "REFUND":
			case "CREDITTOUSER":
				return "bg-green-500";
			case "ORDER":
			case "DEBITFROMUSER":
			case "FINE":
			case "TRANSFER":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const isCredit = (t: any) => {
		// Money coming **to** the logged-in user → credit
		if (t.credited_to?.name === userName) return true;
		if (t.transaction_type === "REFUND") return true;
		if (t.transaction_type === "CREDITTOUSER") return true;
		return false;
	};

	const getBalanceAfterTx = (t: any) =>
		isCredit(t) ? t.creditedusersamount : t.debitedusersamount;

	const formatDate = (d: string) =>
		new Date(d).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});

	const formatTime = (d: string) =>
		new Date(d).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});

	/* ---------- Filter & Search ---------- */
	const filteredTransactions = transactions.filter(
		(t: { transaction_type: string; description: string }) => {
			// type filter
			let match = true;
			if (filterType === "CREDIT") match = isCredit(t);
			else if (filterType === "DEBIT") match = !isCredit(t);
			else if (filterType !== "ALL") match = t.transaction_type === filterType;

			// search
			const search = t.description
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			return match && search;
		}
	);

	/* ---------- Stats ---------- */
	const totalCredit = transactions.reduce(
		(sum: any, t: { amount: any }) => (isCredit(t) ? sum + t.amount : sum),
		0
	);
	const totalDebit = transactions.reduce(
		(sum: any, t: { amount: any }) => (!isCredit(t) ? sum + t.amount : sum),
		0
	);

	// latest transaction gives the real balance
	const latestTx = transactions[0];
	const currentBalance = latestTx ? getBalanceAfterTx(latestTx) : 0;

	/* ---------- Group by date ---------- */
	const grouped = filteredTransactions.reduce(
		(
			acc: { [x: string]: any[] },
			tx: { createdAt: string | number | Date }
		) => {
			const dateKey = new Date(tx.createdAt).toDateString();
			if (!acc[dateKey]) acc[dateKey] = [];
			acc[dateKey].push(tx);
			return acc;
		},
		{} as Record<string, typeof transactions>
	);

	/* ---------- Pagination ---------- */
	const goToPage = (p: number) => {
		if (p >= 1 && p <= totalPages && p !== currentPage) {
			setCurrentPage(p);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	/* ---------- Render ---------- */
	if (tloading && transactions.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
				<Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
				<p className="text-gray-600">Loading transactions...</p>
			</div>
		);
	}

	if (terror) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
				<div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h3 className="text-xl font-bold mb-2">Error</h3>
					<p className="text-gray-600 mb-4">{terror.message}</p>
					<button
						onClick={() => refetch()}
						className="bg-blue-600 text-white px-6 py-3 rounded-lg"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div ref={containerRef} className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="header-content bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 rounded-b-3xl sticky top-0 z-10 shadow-lg">
				<div className="flex items-center justify-between mb-4">
					<button
						onClick={() => window.history.back()}
						className="p-2 hover:bg-white/20 rounded-lg transition"
					>
						<ArrowLeft className="w-6 h-6" />
					</button>
					<h2 className="text-xl font-bold flex items-center gap-2">
						<Calendar className="w-6 h-6" />
						Transactions
					</h2>
					<button
						onClick={() => refetch()}
						disabled={tloading}
						className="p-2 hover:bg-white/20 rounded-lg transition disabled:opacity-50"
					>
						<RefreshCw
							className={`w-6 h-6 ${tloading ? "animate-spin" : ""}`}
						/>
					</button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-3 gap-3">
					<div className="summary-stat bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
						<p className="text-xs opacity-90">Credit</p>
						<p className="text-lg font-bold">₹{totalCredit.toFixed(2)}</p>
					</div>
					<div className="summary-stat bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
						<p className="text-xs opacity-90">Debit</p>
						<p className="text-lg font-bold">₹{totalDebit.toFixed(2)}</p>
					</div>
					<div className="summary-stat bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
						<p className="text-xs opacity-90">Balance</p>
						<p className="text-lg font-bold">₹{currentBalance.toFixed(2)}</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="p-4 max-w-md mx-auto pb-24">
				{/* Search */}
				<div className="relative mb-4">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="text"
						placeholder="Search transactions..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
					/>
				</div>

				{/* Filters */}
				<div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
					{[
						{ label: "All", value: "ALL" },
						{ label: "Credit", value: "CREDIT" },
						{ label: "Debit", value: "DEBIT" },
						{ label: "Refund", value: "REFUND" },
						{ label: "Order", value: "ORDER" },
						{ label: "Transfer", value: "TRANSFER" },
						{ label: "Fine", value: "FINE" },
					].map((f) => (
						<button
							key={f.value}
							onClick={() => setFilterType(f.value)}
							className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
								filterType === f.value
									? "bg-blue-600 text-white shadow-md"
									: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
							}`}
						>
							{f.label}
						</button>
					))}
				</div>

				{/* Updating overlay */}
				{tloading && transactions.length > 0 && (
					<div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 flex items-center gap-2">
						<Loader2 className="w-4 h-4 animate-spin text-blue-600" />
						<span className="text-sm text-blue-700">Updating...</span>
					</div>
				)}

				{/* Transactions */}
				<div className="space-y-6">
					{Object.entries(grouped).map(([dateKey, dayTxs]) => (
						<div key={dateKey}>
							<h3 className="text-sm font-semibold text-gray-500 mb-3 px-1">
								{formatDate(dayTxs[0].createdAt)}
							</h3>
							<div className="space-y-3">
								{(dayTxs as any).map(
									(tx: {
										_id: Key | null | undefined;
										transaction_type: string;
										description:
											| string
											| number
											| bigint
											| boolean
											| ReactElement<
													unknown,
													string | JSXElementConstructor<any>
											  >
											| Iterable<ReactNode>
											| ReactPortal
											| Promise<
													| string
													| number
													| bigint
													| boolean
													| ReactPortal
													| ReactElement<
															unknown,
															string | JSXElementConstructor<any>
													  >
													| Iterable<ReactNode>
													| null
													| undefined
											  >
											| null
											| undefined;
										createdAt: string;
										amount: number;
										credited_to: {
											name:
												| string
												| number
												| bigint
												| boolean
												| ReactElement<
														unknown,
														string | JSXElementConstructor<any>
												  >
												| Iterable<ReactNode>
												| ReactPortal
												| Promise<
														| string
														| number
														| bigint
														| boolean
														| ReactPortal
														| ReactElement<
																unknown,
																string | JSXElementConstructor<any>
														  >
														| Iterable<ReactNode>
														| null
														| undefined
												  >
												| null
												| undefined;
											roll: any;
										};
										debited_from: {
											name:
												| string
												| number
												| bigint
												| boolean
												| ReactElement<
														unknown,
														string | JSXElementConstructor<any>
												  >
												| Iterable<ReactNode>
												| ReactPortal
												| Promise<
														| string
														| number
														| bigint
														| boolean
														| ReactPortal
														| ReactElement<
																unknown,
																string | JSXElementConstructor<any>
														  >
														| Iterable<ReactNode>
														| null
														| undefined
												  >
												| null
												| undefined;
											roll: any;
										};
									}) => {
										const credit = isCredit(tx);
										const balAfter = getBalanceAfterTx(tx);

										return (
											<div
												key={tx._id}
												className="transaction-card bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
											>
												<div className="flex items-start gap-3">
													<div
														className={`${getTransactionColor(
															tx.transaction_type
														)} p-3 rounded-xl text-white shrink-0`}
													>
														{getTransactionIcon(tx.transaction_type)}
													</div>

													<div className="flex-1 min-w-0">
														<div className="flex justify-between gap-3">
															<div className="flex-1">
																<p className="text-sm font-semibold text-gray-900 line-clamp-2">
																	{tx.description}
																</p>
																<p className="text-xs text-gray-500 mt-1">
																	{formatTime(tx.createdAt)}
																</p>
															</div>
															<div className="text-right">
																<p
																	className={`text-base font-bold ${
																		credit ? "text-green-600" : "text-red-600"
																	}`}
																>
																	{credit ? "+" : "-"}₹{tx.amount.toFixed(2)}
																</p>
																<p className="text-xs text-gray-500 mt-1">
																	Bal: ₹{balAfter.toFixed(2)}
																</p>
															</div>
														</div>

														{(tx.credited_to?.name ||
															tx.debited_from?.name) && (
															<div className="mt-2 pt-2 border-t border-gray-100">
																<p className="text-xs text-gray-600">
																	{tx.credited_to?.name && (
																		<span>
																			To:{" "}
																			<span className="font-medium">
																				{tx.credited_to.name}
																				{tx.credited_to.roll
																					? ` (${tx.credited_to.roll})`
																					: ""}
																			</span>
																		</span>
																	)}
																	{tx.debited_from?.name && (
																		<span className="ml-3">
																			From:{" "}
																			<span className="font-medium">
																				{tx.debited_from.name}
																				{tx.debited_from.roll
																					? ` (${tx.debited_from.roll})`
																					: ""}
																			</span>
																		</span>
																	)}
																</p>
															</div>
														)}
													</div>
												</div>
											</div>
										);
									}
								)}
							</div>
						</div>
					))}
				</div>

				{/* Empty state */}
				{filteredTransactions.length === 0 && !tloading && (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-8 h-8 text-gray-400" />
						</div>
						<p className="text-gray-500 font-medium">No transactions found</p>
						<p className="text-sm text-gray-400 mt-1">
							Try adjusting your filters or search query
						</p>
					</div>
				)}

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="mt-8 bg-white rounded-xl shadow-sm p-4">
						<div className="flex items-center justify-between">
							<button
								onClick={() => goToPage(currentPage - 1)}
								disabled={currentPage === 1}
								className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 disabled:opacity-50"
							>
								<ChevronLeft className="w-5 h-5" />
								Previous
							</button>

							<span className="text-sm text-gray-600">
								Page {currentPage} of {totalPages}
							</span>

							<button
								onClick={() => goToPage(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 disabled:opacity-50"
							>
								Next
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					</div>
				)}
			</div>
			<Footer onLogoutSuccess={() => navigate("/login")} />
		</div>
	);
};

export default Transactions;
