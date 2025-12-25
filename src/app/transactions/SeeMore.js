"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

export default function SeeMore() {
  return (
    <Wrapper>
      <button className="switch prev">
        <Image
          src={"/assets/images/icon-caret-left.svg"}
          width={15}
          height={15}
          alt="prev button"
        />{" "}
        Prev
      </button>
      <div className="select">
        <button className="range">1</button>
        <button className="range">2</button>
        <button className="range">3</button>
        <button className="range">4</button>
        <button className="range">5</button>
      </div>
      <button className="switch next">
        Next{" "}
        <Image
          src={"/assets/images/icon-caret-right.svg"}
          width={15}
          height={15}
          alt="next button"
        />
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0rem 0rem 0rem;
  .switch {
    width: 120px;
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
  .select {
  width: 25%;
    display: flex;
    justify-content: space-between;
    .range {
      width: 50px;
      align-items: center;
      padding: 0rem 1rem;
      border: 1px solid grey;
      border-radius: 10px;
      height: 50px;
      font-size: 17px;
      outline: none;
      background: none;
      color: black;
    }
  }
`;
