"use client";

import Image from "next/image";
import styled from "styled-components";

export default function Search() {
  return (
    <Wrapper>
      <div className="filter">
        <div className="search">
          <input type="text" placeholder="Search Transaction" className="bar" />
          <Image
            src="/assets/images/icon-search.svg"
            width={15}
            height={15}
            alt="search-icon"
          />
        </div>
        <div className="flex">
            <div className="sort">
          <p>Sort by</p>
          <button className="sort-filter">
            Latest{" "}
            <Image
              src="\assets\images\icon-caret-down.svg"
              width={15}
              height={15}
              alt="down"
            />
          </button>
        </div>
        <div className="cart">
          <p>Category</p>
          <button className="cart-filter">
            All Transactions{""}
            <Image
              src="\assets\images\icon-caret-down.svg"
              width={15}
              height={15}
              alt="down"
            />
          </button>
        </div>
        </div>
      </div>
      <div className="user-data">
        <div className="user">
          <p className="title">Recipiant / Sender</p>
        </div>
        <div className="users">
          <p className="category">Category</p>
          <p className="date">Transaction Date</p>
        </div>
        <p className="amounts">Amount</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  .filter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .search {
      display: flex;
      justify-content: space-between;
      border: 1.5px solid grey;
      height: 45px;
      width: 30%;
      border-radius: 10px;
      padding: 0px 15px;
      align-items: center;
      .bar {
        background: none;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        color: black;
        font-size: 17px;
      }
    }
      .flex {
      display: flex;
      gap: 2rem;
      }
    .sort,
    .cart {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      p {
      font-size: 20px;
      }
      .sort-filter,
      .cart-filter {
      display: flex;
      align-items: center;
      padding: 0rem 1rem;
      border: 1px solid grey;
      border-radius: 10px;
      height: 50px;
      font-size: 17px;
      outline: none;
      background: none;
      color: black;
      justify-content: space-between;
      }
    }
      .sort-filter {
      width: 120px;
      }
      .cart-filter {
      width: 220px;
      }
  }
  .user-data {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid silver;
    padding: 1.3rem 0rem;
    .user {
      width: 40%;
      display: flex;
      align-items: center;
    }
    .users {
      width: 33%;
      display: flex;
      justify-content: space-between;
    }
    .amounts {
      width: 27%;
      text-align: right;
    }
  }
`;
