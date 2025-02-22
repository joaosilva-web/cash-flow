import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export interface IUserTransactions {
  id: string;
  title: string;
  value: string;
  category: string;
  date: Date;
  type: "inflow" | "outflow";
}

interface TransactionsContextType {
  transactions: IUserTransactions[];
  setTransactions: React.Dispatch<React.SetStateAction<IUserTransactions[]>>;
  addTransaction: (transaction: Omit<IUserTransactions, "id" | "date">) => void;
  deleteTransaction: (id: string) => void;
  totalAmount: number;
  totalInFlow: number;
  totalOutFlow: number;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

//Creating Provider
export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<IUserTransactions[]>(() => {
    const savedTransactions = Cookies.get("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [totalAmount, setTotalAmount] = useState<number>(() => {
    const savedTotalAmount = Cookies.get("totalAmount");
    return savedTotalAmount ? Number(savedTotalAmount) : 0;
  });
  const [totalInFlow, setTotalInFlow] = useState<number>(() => {
    const savedInFlow = Cookies.get("totalInFlow");
    return savedInFlow ? Number(savedInFlow) : 0;
  });

  const [totalOutFlow, setTotalOutFlow] = useState<number>(() => {
    const savedOutFlow = Cookies.get("totalOutFlow");
    return savedOutFlow ? Number(savedOutFlow) : 0;
  });

  useEffect(() => {
    const inFlow = transactions
      .filter((transaction) => transaction.type === "inflow")
      .reduce((total, transaction) => total + Number(transaction.value), 0);
    const outFlow = transactions
      .filter((transaction) => transaction.type === "outflow")
      .reduce((total, transaction) => total + Number(transaction.value), 0);

    const newTotal = inFlow - outFlow;

    setTotalInFlow(inFlow);
    setTotalOutFlow(outFlow);
    setTotalAmount(newTotal);

    Cookies.set("totalAmount", String(newTotal));
    Cookies.set("totalInFlow", String(inFlow));
    Cookies.set("totalOutFlow", String(outFlow));
  }, [transactions]);

  useEffect(() => {
    Cookies.set("transactions", JSON.stringify(transactions), { expires: 365 });
    Cookies.set("totalAmount", String(totalAmount), {
      expires: 365,
      path: "/",
    });
  }, [transactions, totalAmount]);

  function addTransaction(transaction: Omit<IUserTransactions, "id" | "date">) {
    const newTransaction = {
      ...transaction,
      value: transaction.value.replace(",", "."),
      id: `${crypto.randomUUID()}`,
      date: new Date(),
    };

    setTransactions((prev) => [...prev, newTransaction]);
  }

  function deleteTransaction(id: string) {
    console.log(id);
    const newTransactionsArr = transactions.filter((prev) => prev.id !== id);
    setTransactions(newTransactionsArr);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        deleteTransaction,
        totalAmount,
        totalInFlow,
        totalOutFlow
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

//Creating Hook
export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }

  return context;
}
