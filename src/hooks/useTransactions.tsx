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
    addTransaction: (transaction: Omit<IUserTransactions,"id" | "date">) => void;
  }

  const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

  //Creating Provider
  export function TransactionsProvider({children}: {children: React.ReactNode}){
    const [transactions, setTransactions] = useState<IUserTransactions[]>(() => {
      const savedTransactions = Cookies.get("transactions");
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    useEffect(() => {
      Cookies.set("transactions", JSON.stringify(transactions), {expires: 365})
    },[transactions])

    function addTransaction(transaction: Omit<IUserTransactions, "id" | "date">) {
      const newTransaction = {
        ...transaction,
        id: `${crypto.randomUUID}`,
        date: new Date()
      }

      setTransactions((prev) => [...prev, newTransaction])
    }

    return (
      <TransactionsContext.Provider value={{ transactions, setTransactions, addTransaction }}>
        {children}
      </TransactionsContext.Provider>
    );
  }

  //Creating Hook
  export function useTransactions() {
    const context = useContext(TransactionsContext);

    if(!context){
        throw new Error("useTransactions must be used within TransactionsProvider");
    }

    return context;
  }