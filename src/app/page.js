"use client";
import styled from "styled-components";
import Overview from "./overview/Overview";

export default function Home() {
  return (
    <Wrapper>
      <Overview />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
