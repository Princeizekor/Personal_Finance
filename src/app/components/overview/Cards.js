"use client";

import { Balance } from "@/app/datas/BalanceData";
import styled from "styled-components";

export default function Cards() {
  return (
    <Wrapper>
      {
        Balance.map((data, i) => (
          <div className="balance" key={i}>
        <h6>{data.title}</h6>
        <h1>{data.amount}</h1>
      </div>
        ))
      }
    </ Wrapper>
  );
}


const Wrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
gap: 2rem;
.balance {
display: flex;
flex-direction: column;
width: 380px;
height: 130px;
background-color: white;
color: #201f24;
border-radius: 12px;
padding: 1.5rem;
gap: 2rem;
}
> :first-child {
background-color: #201f24;
color: white;
}
`