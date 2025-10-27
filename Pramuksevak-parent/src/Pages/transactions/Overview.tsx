import React, { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDownRight, RefreshCw, Plus } from "lucide-react";
import gsap from "gsap";

interface Transaction {
  amount: number;
  createdAt: string;
  credited_to: any;
  debited_from: any;
  description: string;
  transaction_type: string;
}

interface TransactionOverviewProps {
  transactions: Transaction[];
  onSeeMore: () => void;
}

const TransactionOverview: React.FC<TransactionOverviewProps> = ({
  transactions,
  onSeeMore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate summary cards
      gsap.from(".summary-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Animate transaction items
      gsap.from(".transaction-item", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.3,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [transactions]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "REFUND":
        return <RefreshCw className="w-4 h-4" />;
      case "ORDER":
        return <ArrowUpRight className="w-4 h-4" />;
      case "CREDITTOUSER":
        return <ArrowDownRight className="w-4 h-4" />;
      case "DEBITFROMUSER":
        return <ArrowUpRight className="w-4 h-4" />;
      default:
        return <Plus className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "REFUND":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "ORDER":
        return "bg-red-50 text-red-600 border-red-200";
      case "CREDITTOUSER":
        return "bg-green-50 text-green-600 border-green-200";
      case "DEBITFROMUSER":
        return "bg-orange-50 text-orange-600 border-orange-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const isCredit = (transaction: Transaction) => {
    return (
      transaction.transaction_type === "REFUND" ||
      transaction.transaction_type === "CREDITTOUSER" ||
      (transaction.transaction_type === "ORDER" && transaction.credited_to)
    );
  };

  // Calculate summary
  const totalCredit = transactions.reduce(
    (sum, t) => (isCredit(t) ? sum + t.amount : sum),
    0
  );
  const totalDebit = transactions.reduce(
    (sum, t) => (!isCredit(t) ? sum + t.amount : sum),
    0
  );
  const balance = totalCredit - totalDebit;

  // Show only last 3 transactions
  const recentTransactions = transactions.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-sm mx-auto">
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Transactions Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="summary-card bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl border border-green-200 shadow-sm">
          <p className="text-xs text-green-700 font-medium mb-1">Credit</p>
          <p className="text-lg font-bold text-green-800">
            ₹{totalCredit.toFixed(0)}
          </p>
        </div>

        <div className="summary-card bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl border border-red-200 shadow-sm">
          <p className="text-xs text-red-700 font-medium mb-1">Debit</p>
          <p className="text-lg font-bold text-red-800">
            ₹{totalDebit.toFixed(0)}
          </p>
        </div>

        <div className="summary-card bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200 shadow-sm">
          <p className="text-xs text-blue-700 font-medium mb-1">Balance</p>
          <p className="text-lg font-bold text-blue-800">
            ₹{balance.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-2 mb-4">
        {recentTransactions.map((transaction, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="transaction-item bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg border ${getTransactionColor(
                    transaction.transaction_type
                  )}`}
                >
                  {getTransactionIcon(transaction.transaction_type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    isCredit(transaction) ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCredit(transaction) ? "+" : "-"}₹{transaction.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <button
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 text-sm font-medium shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        onClick={onSeeMore}
      >
        See All Transactions
      </button>
    </div>
  );
};


export default TransactionOverview
