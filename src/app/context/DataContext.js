'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

const INITIAL_STATE = {
  budgets: [],
  transactions: [],
  pots: [],
  recurringBills: [],
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('appData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      setLoading(false);
    }
  }, []);

  // Save data to localStorage whenever it changes
  const saveData = (newData) => {
    try {
      localStorage.setItem('appData', JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  // Budget functions
  const addBudget = (budget) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveData((prev) => {
      const updated = { ...prev, budgets: [...prev.budgets, newBudget] };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
    return newBudget;
  };

  const updateBudget = (id, updates) => {
    saveData((prev) => {
      const updated = {
        ...prev,
        budgets: prev.budgets.map(b => b.id === id ? { ...b, ...updates } : b),
      };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteBudget = (id) => {
    saveData((prev) => {
      const updated = { ...prev, budgets: prev.budgets.filter(b => b.id !== id) };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
  };

  // Transaction functions
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    saveData((prev) => {
      const updated = { ...prev, transactions: [...prev.transactions, newTransaction] };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
    return newTransaction;
  };

  const deleteTransaction = (id) => {
    saveData((prev) => {
      const updated = { ...prev, transactions: prev.transactions.filter(t => t.id !== id) };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
  };

  // Pot functions
  const addPot = (pot) => {
    const newPot = {
      ...pot,
      id: Date.now().toString(),
      saved: 0,
      createdAt: new Date().toISOString(),
    };
    saveData((prev) => {
      const updated = { ...prev, pots: [...prev.pots, newPot] };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
    return newPot;
  };

  const updatePot = (id, updates) => {
    saveData((prev) => {
      const updated = {
        ...prev,
        pots: prev.pots.map(p => p.id === id ? { ...p, ...updates } : p),
      };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
  };

  const deletePot = (id) => {
    saveData((prev) => {
      const updated = { ...prev, pots: prev.pots.filter(p => p.id !== id) };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
  };

  // Recurring bill functions
  const addRecurringBill = (bill) => {
    const newBill = {
      ...bill,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveData((prev) => {
      const updated = { ...prev, recurringBills: [...prev.recurringBills, newBill] };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
    return newBill;
  };

  const deleteRecurringBill = (id) => {
    saveData((prev) => {
      const updated = { ...prev, recurringBills: prev.recurringBills.filter(b => b.id !== id) };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
  };

  const updateRecurringBill = (id, updates) => {
    saveData((prev) => {
      const updated = {
        ...prev,
        recurringBills: prev.recurringBills.map(b => b.id === id ? { ...b, ...updates } : b),
      };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
  };

  const markRecurringBillAsPaid = (id) => {
    const bill = data.recurringBills.find(b => b.id === id);
    if (!bill) return null;
    const paymentTransaction = addTransaction({
      title: bill.title,
      category: bill.category || 'Bill',
      amount: -(Math.abs(bill.amount || 0)),
      date: new Date().toISOString(),
    });

    saveData((prev) => {
      const updated = {
        ...prev,
        recurringBills: prev.recurringBills.map(b => b.id === id ? { ...b, paid: true, lastPaidAt: new Date().toISOString() } : b),
      };
      localStorage.setItem('appData', JSON.stringify(updated));
      return updated;
    });
    return paymentTransaction;
  };

  // Statistics
  const getStatistics = () => {
    const transactions = data.transactions;
    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = Math.abs(transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0));
    const netBalance = totalIncome - totalExpenses;

    // Calculate bills paid
    const billsPaid = data.recurringBills
      .filter(b => b.paid)
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    // Calculate total saved across pots
    const totalSaved = data.pots.reduce((sum, p) => sum + (p.saved || 0), 0);

    // Calculate budget spending
    const budgetSpent = data.budgets.reduce((sum, b) => sum + (b.spent || 0), 0);

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      billsPaid,
      totalSaved,
      budgetSpent,
      transactionCount: transactions.length,
      budgetCount: data.budgets.length,
      potCount: data.pots.length,
      billCount: data.recurringBills.length,
      billsPaidCount: data.recurringBills.filter(b => b.paid).length,
    };
  };

  const value = {
    data,
    loading,
    // Budget operations
    addBudget,
    updateBudget,
    deleteBudget,
    // Transaction operations
    addTransaction,
    deleteTransaction,
    // Pot operations
    addPot,
    updatePot,
    deletePot,
    // Recurring bill operations
    addRecurringBill,
    deleteRecurringBill,
    updateRecurringBill,
    markRecurringBillAsPaid,
    // Statistics
    getStatistics,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
