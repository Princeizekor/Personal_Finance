import styled from "styled-components";

export const OverviewButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 0px 12px 12px 0px;
  border: none;
  outline: none;
  color: white;
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  padding: 0rem 1.5rem;
  align-items: center;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
  color: #201f24;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:active,
  &:focus {
    color: #201f24;
    background-color: #ffffff;
  }
  
  img {
    filter: brightness(0) invert(1);
  }
`;

export const MinimizeButton = styled.button`
  position: absolute;
  width: 100%;
  max-width: 230px;
  height: 40px;
  border-radius: 0px 12px 12px 0px;
  border: none;
  outline: none;
  color: white;
  display: flex;
  gap: 1rem;
  bottom: 5.5rem;
  left: 0;
  padding: 0rem 1.5rem;
  align-items: center;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:active,
  &:focus {
    color: #201f24;
    background-color: #ffffff;
  }
  
  img {
    filter: brightness(0) invert(1);
  }
`;
