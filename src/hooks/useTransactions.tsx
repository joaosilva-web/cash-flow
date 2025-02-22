import { createContext, useContext, useState } from "react";


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
  }

  const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

  //Creating Provider
  export function TransactionsProvider({children}: {children: React.ReactNode}){
    const [transactions, setTransactions] = useState<IUserTransactions[]>([]);

    return (
        <TransactionsContext.Provider value={{transactions, setTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
  }

  //Creating Hook
  export function useTransactions() {
    const context = useContext(TransactionsContext);

    if(!context){
        throw new Error("useTransactions must be used within TransactionsProvider");
    }

    return context;
  }