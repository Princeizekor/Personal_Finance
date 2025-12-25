"use client";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

export default function EllipsisMenu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/assets/images/icon-ellipsis.svg"
          width={15}
          height={15}
          alt="menu"
        />
      </MenuButton>

      {isOpen && (
        <MenuDropdown>
          <MenuItem
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            Edit Budget
          </MenuItem>
          <Divider />
          <MenuItem
            danger
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            Delete Budget
          </MenuItem>
        </MenuDropdown>
      )}
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 150px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.danger ? "#dc2626" : "#201f24")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.danger ? "#fee2e2" : "#f5f3ef"};
  }

  &:active {
    background-color: ${(props) =>
      props.danger ? "#fecaca" : "#e8e6e2"};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e5e5e5;
`;
