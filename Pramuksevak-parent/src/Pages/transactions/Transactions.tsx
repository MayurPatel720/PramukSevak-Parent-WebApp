import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Calendar, ArrowLeft, Filter, Search, ArrowUpRight, ArrowDownRight, RefreshCw, Plus } from "lucide-react";

const Transactions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      amount: 108,
      createdAt: "2025-10-14T19:30:10.270Z",
      credited_to: {
        name: "jeel kalathiya",
        roll: "202",
      },
      debited_from: null,
      description: "Project Paper's order's refund",
      transaction_type: "REFUND",
    },
    {
      amount: 25.2,
      createdAt: "2025-10-08T19:30:01.077Z",
      credited_to: {
        name: "jeel kalathiya",
        roll: "202",
      },
      debited_from: null,
      description: "fvygtbuk's order's refund",
      transaction_type: "REFUND",
    },
    {
      amount: 1800,
      createdAt: "2025-10-08T19:30:00.560Z",
      credited_to: {
        name: "jeel kalathiya",
        roll: "202",
      },
      debited_from: null,
      description: "Zero Product's order's refund",
      transaction_type: "REFUND",
    },
    {
      amount: 120,
      createdAt: "2025-10-07T09:17:35.856Z",
      credited_to: {
        name: "Stall C",
      },
      debited_from: {
        name: "jeel kalathiya",
        roll: "202",
      },
      description: "Project Paper's order placed",
      transaction_type: "ORDER",
    },
    {
      amount: 100,
      createdAt: "2025-10-04T18:50:06.281Z",
      credited_to: null,
      debited_from: null,
      description: "credited in user account",
      transaction_type: "CREDITTOUSER",
    },
    {
      amount: 28,
      createdAt: "2025-10-01T06:22:22.647Z",
      credited_to: {
        name: "Stall C",
      },
      debited_from: {
        name: "jeel kalathiya",
        roll: "202",
      },
      description: "fvygtbuk's order placed",
      transaction_type: "ORDER",
    },
    {
      amount: 2000,
      createdAt: "2025-10-01T06:22:22.330Z",
      credited_to: {
        name: "Stall C",
      },
      debited_from: {
        name: "jeel kalathiya",
        roll: "202",
      },
      description: "Zero Product's order placed",
      transaction_type: "ORDER",
    },
    {
      amount: 400,
      createdAt: "2025-09-17T16:31:01.395Z",
      credited_to: null,
      debited_from: null,
      description: "debited from user account",
      transaction_type: "DEBITFROMUSER",
    },
    {
      amount: 20,
      createdAt: "2025-09-17T16:26:41.215Z",
      credited_to: null,
      debited_from: null,
      description: "credited in user account",
      transaction_type: "CREDITTOUSER",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-content", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

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
        ease: "power2.out",
      });

      gsap.from(".transaction-card", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.6,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "REFUND":
        return <RefreshCw className="w-5 h-5" />;
      case "ORDER":
        return <ArrowUpRight className="w-5 h-5" />;
      case "CREDITTOUSER":
        return <ArrowDownRight className="w-5 h-5" />;
      case "DEBITFROMUSER":
        return <ArrowUpRight className="w-5 h-5" />;
      default:
        return <Plus className="w-5 h-5" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "REFUND":
        return "bg-blue-500";
      case "ORDER":
        return "bg-red-500";
      case "CREDITTOUSER":
        return "bg-green-500";
      case "DEBITFROMUSER":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const isCredit = (transaction: any) => {
    return (
      transaction.transaction_type === "REFUND" ||
      transaction.transaction_type === "CREDITTOUSER" ||
      (transaction.transaction_type === "ORDER" && transaction.credited_to)
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter and search logic
  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter =
      filterType === "ALL" || t.transaction_type === filterType;
    const matchesSearch = t.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate statistics
  const totalCredit = transactions.reduce(
    (sum, t) => (isCredit(t) ? sum + t.amount : sum),
    0
  );
  const totalDebit = transactions.reduce(
    (sum, t) => (!isCredit(t) ? sum + t.amount : sum),
    0
  );
  const balance = totalCredit - totalDebit;

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.createdAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header-content bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 text-white hover:bg-white/20 rounded-lg p-2 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Transactions
          </h2>
          <div className="w-8" />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="summary-stat bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xs opacity-90 mb-1">Credit</p>
            <p className="text-lg font-bold">₹{totalCredit.toFixed(0)}</p>
          </div>
          <div className="summary-stat bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xs opacity-90 mb-1">Debit</p>
            <p className="text-lg font-bold">₹{totalDebit.toFixed(0)}</p>
          </div>
          <div className="summary-stat bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xs opacity-90 mb-1">Balance</p>
            <p className="text-lg font-bold">₹{balance.toFixed(0)}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto mb-20">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {["ALL", "REFUND", "ORDER", "CREDITTOUSER", "DEBITFROMUSER"].map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  filterType === type
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {type === "ALL"
                  ? "All"
                  : type === "CREDITTOUSER"
                  ? "Credit"
                  : type === "DEBITFROMUSER"
                  ? "Debit"
                  : type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            )
          )}
        </div>

        {/* Transactions List */}
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1">
                {formatDate(dayTransactions[0].createdAt)}
              </h3>
              <div className="space-y-3">
                {dayTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="transaction-card bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`${getTransactionColor(
                          transaction.transaction_type
                        )} p-3 rounded-xl text-white flex-shrink-0`}
                      >
                        {getTransactionIcon(transaction.transaction_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTime(transaction.createdAt)}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p
                              className={`text-base font-bold ${
                                isCredit(transaction)
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {isCredit(transaction) ? "+" : "-"}₹
                              {transaction.amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        {(transaction.credited_to || transaction.debited_from) && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-xs text-gray-600">
                              {transaction.credited_to && (
                                <span>
                                  To: <span className="font-medium">{transaction.credited_to.name}</span>
                                </span>
                              )}
                              {transaction.debited_from && (
                                <span>
                                  From: <span className="font-medium">{transaction.debited_from.name}</span>
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* Footer Spacer */}
      <div className="h-20" />
    </div>
  );
};

export default Transactions;