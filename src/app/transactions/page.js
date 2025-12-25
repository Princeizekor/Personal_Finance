"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useData } from "../context/DataContext";

export default function Transactions() {
  const { data, addTransaction, deleteTransaction } = useData();
  const [form, setForm] = useState({ title: "", category: "", amount: "", date: new Date().toISOString().slice(0, 10) });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (isNaN(amount)) return alert("Please enter a valid amount");
    addTransaction({
      title: form.title || "Transaction",
      category: form.category || "Uncategorized",
      amount: amount,
      date: new Date(form.date).toISOString(),
    });
    setForm({ title: "", category: "", amount: "", date: new Date().toISOString().slice(0, 10) });
  };

  const transactions = (data.transactions || []).slice().reverse();

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <Wrapper>
      <header>
        <h1>Transactions</h1>
        <form className="tx-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          <button type="submit">Add</button>
        </form>
      </header>

      <div className="list">
        {transactions.length === 0 ? (
          <p className="empty">No transactions yet.</p>
        ) : (
          transactions.map((t) => (
            <div className="tx" key={t.id}>
              <div className="left">
                <p className="title">{t.title}</p>
                <p className="meta">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
              </div>
              <div className="right">
                <p className={`amount ${t.amount > 0 ? 'pos' : 'neg'}`}>{t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}</p>
                <button className="del" onClick={() => deleteTransaction(t.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2.2rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    h1 { margin: 0; font-size: 28px; }

    .tx-form {
      display: flex;
      gap: 0.5rem;

      input { padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid #ddd; }
      button { padding: 0.5rem 0.85rem; border-radius: 8px; border: none; background: #667eea; color: white; cursor: pointer; }
    }
  }

  .list { margin-top: 1.5rem; background: white; padding: 1.25rem; border-radius: 12px; }

  .empty { color: #666; }

  .tx { display:flex; justify-content:space-between; align-items:center; padding:0.75rem 0; border-bottom:1px solid #f0f0f0; }
  .tx:last-child { border-bottom: none; }
  .left { min-width:0; }
  .title { margin:0; font-weight:600; }
  .meta { margin:0; font-size:12px; color:#888; }
  .right { display:flex; align-items:center; gap:0.75rem; }
  .amount.pos { color: #0d6e54; font-weight:700; }
  .amount.neg { color: #c02c1d; font-weight:700; }
  .del { background:transparent; border:1px solid #eee; padding:0.35rem 0.6rem; border-radius:8px; cursor:pointer; }
`;
