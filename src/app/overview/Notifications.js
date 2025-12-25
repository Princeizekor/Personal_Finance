"use client";
import BudgetCard from "@/app/components/overview/Budgets";
import Pots from "@/app/components/overview/Pots";
import RecurringBills from "@/app/components/overview/Recurring";
import Transaction from "@/app/components/overview/Transaction";
import styled from "styled-components";

export default function Notifications() {
  return (
    <Wrapper>
      <div className="wrap1">
        <Pots />
        <Transaction />
      </div>
      <div className="wrap2">
        <BudgetCard />
        <RecurringBills />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  .wrap1 {
    display: flex;
    gap: 2rem;
    width: 55%;
    flex-direction: column;
  }
  .wrap2 {
    display: flex;
    gap: 2rem;
    width: 45%;
    flex-direction: column;
  }
`;
