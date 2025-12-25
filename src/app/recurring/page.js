"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useData } from "../context/DataContext";

export default function RecurringBills() {
  const { data, addRecurringBill, deleteRecurringBill, markRecurringBillAsPaid } = useData();
  const [form, setForm] = useState({ title: "", amount: "", dueDate: new Date().toISOString().slice(0,10), category: "Bills" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (isNaN(amount)) return alert('Enter a valid amount');
    addRecurringBill({ title: form.title || 'Bill', amount: Math.abs(amount), dueDate: form.dueDate, category: form.category });
    setForm({ title: "", amount: "", dueDate: new Date().toISOString().slice(0,10), category: "Bills" });
  };

  const bills = (data.recurringBills || []).slice().reverse();

  return (
    <Wrapper>
      <header>
        <h1>Recurring Bills</h1>
        <form className="bill-form" onSubmit={handleAdd}>
          <input name="title" placeholder="Bill title" value={form.title} onChange={handleChange} />
          <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
          <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
          <button type="submit">Add Bill</button>
        </form>
      </header>

      <div className="list">
        {bills.length === 0 ? (
          <p className="empty">No recurring bills yet.</p>
        ) : (
          bills.map(b => (
            <div className="bill" key={b.id}>
              <div>
                <p className="title">{b.title}</p>
                <p className="meta">Due: {new Date(b.dueDate || b.createdAt).toLocaleDateString()} • {b.category}</p>
              </div>
              <div className="actions">
                <p className="amount">{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(b.amount || 0)}</p>
                <button onClick={() => markRecurringBillAsPaid(b.id)} disabled={b.paid}>{b.paid ? 'Paid' : 'Mark Paid'}</button>
                <button className="del" onClick={() => deleteRecurringBill(b.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width:100%; min-height:100vh; padding:2.2rem;
  header { display:flex; justify-content:space-between; align-items:center; gap:1rem;
    h1{ margin:0; font-size:28px }
    .bill-form{ display:flex; gap:0.5rem; input{ padding:0.5rem 0.75rem; border-radius:8px; border:1px solid #ddd } button{ padding:0.5rem 0.75rem; border-radius:8px; border:none; background:#667eea; color:white } }
  }
  .list{ margin-top:1.5rem; background:white; padding:1.25rem; border-radius:12px }
  .empty{ color:#666 }
  .bill{ display:flex; justify-content:space-between; align-items:center; padding:0.75rem 0; border-bottom:1px solid #f0f0f0 }
  .bill:last-child{ border-bottom:none }
  .title{ margin:0; font-weight:600 }
  .meta{ margin:0; font-size:12px; color:#888 }
  .actions{ display:flex; gap:0.5rem; align-items:center }
  .amount{ font-weight:700 }
  .del{ background:transparent; border:1px solid #eee; padding:0.35rem 0.6rem; border-radius:8px; cursor:pointer }
`;
