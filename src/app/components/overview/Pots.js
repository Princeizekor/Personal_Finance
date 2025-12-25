'use client';
import Image from "next/image";
import styled from "styled-components";

export default function () {
  return (
    <Wrapper>
      <Header>
        <h2>Pots</h2>
        <SeeDetails>
          See Details<span>›</span>
        </SeeDetails>
      </Header>
      <div className="display">
        <div className="saved">
          <Image
            src="./assets/images/icon-pot.svg"
            alt="Logo"
            width={35}
            height={35}
            className="logo"
          />
          <div>
            <p className="bal">Total Saved</p>
            <p className="cash">$850</p>
          </div>
        </div>
        <div className="balance">
          <div className="savings">
            <span className="bar teal"></span>
            <div className="text">
              <p className="title">Savings</p>
              <p className="amount">$159</p>
            </div>
          </div>
          <div className="savings">
            <span className="bar blue"></span>
            <div className="text">
              <p className="title">Gift</p>
              <p className="amount">$40</p>
            </div>
          </div>
          <div className="savings">
            <span className="bar purple"></span>
            <div className="text">
              <p className="title">Concert Ticket</p>
              <p className="amount">$110</p>
            </div>
          </div>
          <div className="savings">
            <span className="bar orange"></span>
            <div className="text">
              <p className="title">New Laptop</p>
              <p className="amount">$10</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 40%;
  border-radius: 12px;
  padding: 2rem;
  .display {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    .saved {
      display: flex;
      width: 300px;
      height: 125px;
      border-radius: 12px;
      padding: 1.2rem;
      background-color: beige;
      margin-top: 1.5rem;
      align-items: center;
      gap: 1.5rem;
      div {
      .bal {
      font-size: 15px;
            color: #777;
      }
      .cash {
      margin-top: 10px;
      font-size: 35px;
            font-weight: 700;
            color: #111;
      }
      }
    }
    .balance {
      width: 60%;
      // height: 100px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px 40px;
      padding: 20px 0;
      .savings {
        display: flex;
        align-items: center;
        gap: 14px;
        // background-color: silver;
        .bar {
          width: 6px;
          height: 46px;
          border-radius: 10px;
          display: block;
        }
        .teal {
          background: #14746f;
        }
        .blue {
          background: #6ed4e9;
        }
        .purple {
          background: #595772;
        }
        .orange {
          background: #f5c79c;
        }
        .text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          .title {
            font-size: 15px;
            color: #777;
          }

          .amount {
            font-size: 20px;
            font-weight: 700;
            color: #111;
          }
        }
      }
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    font-size: 24px;
    font-weight: 700;
  }
`;

const SeeDetails = styled.p`
  font-size: 16px;
  color: #707070;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 20px;
    margin-left: 2px;
  }

  &:hover {
    opacity: 0.7;
  }
`;
