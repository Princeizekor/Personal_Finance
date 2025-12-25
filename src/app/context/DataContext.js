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
    const updated = { ...data, budgets: [...data.budgets, newBudget] };
    saveData(updated);
    return newBudget;
  };

  const updateBudget = (id, updates) => {
    const updated = {
      ...data,
      budgets: data.budgets.map(b => b.id === id ? { ...b, ...updates } : b),
    };
    saveData(updated);
  };

  const deleteBudget = (id) => {
    const updated = { ...data, budgets: data.budgets.filter(b => b.id !== id) };
    saveData(updated);
  };

  // Transaction functions
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    const updated = { ...data, transactions: [...data.transactions, newTransaction] };
    saveData(updated);
    return newTransaction;
  };

  const deleteTransaction = (id) => {
    const updated = { ...data, transactions: data.transactions.filter(t => t.id !== id) };
    saveData(updated);
  };

  // Pot functions
  const addPot = (pot) => {
    const newPot = {
      ...pot,
      id: Date.now().toString(),
      saved: 0,
      createdAt: new Date().toISOString(),
    };
    const updated = { ...data, pots: [...data.pots, newPot] };
    saveData(updated);
    return newPot;
  };

  const updatePot = (id, updates) => {
    const updated = {
      ...data,
      pots: data.pots.map(p => p.id === id ? { ...p, ...updates } : p),
    };
    saveData(updated);
  };

  const deletePot = (id) => {
    const updated = { ...data, pots: data.pots.filter(p => p.id !== id) };
    saveData(updated);
  };

  // Recurring bill functions
  const addRecurringBill = (bill) => {
    const newBill = {
      ...bill,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = { ...data, recurringBills: [...data.recurringBills, newBill] };
    saveData(updated);
    return newBill;
  };

  const deleteRecurringBill = (id) => {
    const updated = { ...data, recurringBills: data.recurringBills.filter(b => b.id !== id) };
    saveData(updated);
  };

  const updateRecurringBill = (id, updates) => {
    const updated = {
      ...data,
      recurringBills: data.recurringBills.map(b => b.id === id ? { ...b, ...updates } : b),
    };
    saveData(updated);
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

    updateRecurringBill(id, { paid: true, lastPaidAt: new Date().toISOString() });
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
