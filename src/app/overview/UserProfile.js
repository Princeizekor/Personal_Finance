'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useAuth } from '@/app/context/AuthContext';

export default function UserMenu({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  const initials = `${user.firstName?.[0]}${user.lastName?.[0]}`.toUpperCase();

  return (
    <MenuContainer ref={menuRef} className={className}>
      <Avatar onClick={() => setIsOpen(!isOpen)}>
        {initials}
      </Avatar>

      {isOpen && (
        <Dropdown>
          <UserInfo>
            <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserInfo>
          <Divider />
          <MenuItem onClick={() => {
            router.push('/profile');
            setIsOpen(false);
          }}>
            View Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Sign Out
          </MenuItem>
        </Dropdown>
      )}
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  position: relative;
`;

const Avatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  bottom: 0;
  left: -210px;
  bottom: -190px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  margin-top: 0.5rem;
  z-index: 1000;
  overflow: hidden;
`;

const UserInfo = styled.div`
  padding: 1rem;
  background: #f9fafb;
`;

const UserName = styled.p`
  margin: 0;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
`;

const UserEmail = styled.p`
  margin: 0.25rem 0 0 0;
  color: #999;
  font-size: 0.85rem;
`;

const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #333;
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f9fafb;
    color: #667eea;
  }

  &:active {
    background: #f0f4ff;
  }
`;
