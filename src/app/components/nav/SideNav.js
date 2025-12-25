"use client";
import Image from "next/image";
import styled from "styled-components";
import { MinimizeButton, OverviewButton } from "./Buttons";
import { NavData } from "@/app/datas/NavData";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function SideNav() {
  const [minimized, setMinimized] = useState(false);
  const [activePath, setActivePath] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("navMinimized");
      setMinimized(stored === "true");
    } catch (e) {
      setMinimized(false);
    }
  }, []);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const toggleMinimize = () => {
    setMinimized((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("navMinimized", String(next));
      } catch (e) {}
      return next;
    });
  };

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <Wrapper minimized={minimized} role="navigation" aria-label="Main navigation">
      <HeaderSection minimized={minimized}>
        <Link href={'/'}>
          <LogoButton minimized={minimized}>
            <Image
              src="/assets/images/logo-large.svg"
              alt="Logo"
              width={minimized ? 40 : 100}
              height={minimized ? 40 : 100}
              className="logo"
            />
          </LogoButton>
        </Link>
      </HeaderSection>

      <NavSection>
        {NavData.map((data) => (
          <Link href={data.link} key={data.id}>
            <OverviewButton 
              active={activePath === data.link || activePath === data.link + "/"}
              aria-label={data.text}
            >
              <Image src={data.img} alt={data.alt} width={20} height={20} />
              <Label className="label">{data.text}</Label>
            </OverviewButton>
          </Link>
        ))}
      </NavSection>

      <FooterSection minimized={minimized}>
        <Controls>
          <MinimizeButton 
            as="button" 
            onClick={toggleMinimize} 
            active={false}
            aria-pressed={minimized}
          >
            <Image
              src="/assets/images/icon-minimize-menu.svg"
              alt="Minimize Icon"
              width={16}
              height={16}
            />
            <Label className="label">{minimized ? "Expand" : "Minimize"}</Label>
          </MinimizeButton>

          {/* {user && (
            <SignOutButton onClick={handleSignOut} aria-label="Sign out">
              <Image src="/assets/images/icon-logout.svg" alt="Logout" width={16} height={16} />
              <Label className="label">Sign Out</Label>
            </SignOutButton>
          )} */}
          <UserMenu className="user-menu" />
        </Controls>

        
      </FooterSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #201f24;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${props => (props.minimized ? '80px' : 'var(--sidebar-width)')};
  overflow-y: auto;
  border-radius: 0 20px 20px 0;
  z-index: 100;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  transition: width 200ms ease;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  ${OverviewButton} {
    justify-content: ${props => (props.minimized ? 'center' : 'flex-start')};
    padding: ${props => (props.minimized ? '0.5rem' : '0rem 1.5rem')};
    gap: ${props => (props.minimized ? '0' : '1rem')};
    text-align: left;
  }

  .label {
    display: ${props => (props.minimized ? 'none' : 'inline')};
  }

  /* Mobile: convert sidebar to bottom nav */
  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--bottom-nav-height);
    width: 100%;
    border-radius: 12px 12px 0 0;
    padding: 0.25rem 0.5rem;
    flex-direction: row;
    align-items: center;

    ${OverviewButton} {
      padding: 0.5rem;
      min-width: 48px;
      justify-content: center;
    }

    .label { display: none; }
    .user-menu { display: none; }
  }
`;

const HeaderSection = styled.div`
  padding: 0 1rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: left;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  width: 100%;
  justify-content: ${props => (props.minimized ? 'center' : 'flex-start')};
`;

const Brand = styled.span`
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
`;

const Label = styled.span`
  color: white;
  font-size: 0.95rem;
`;

const NavSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 0.25rem;
    gap: 0;
  }
`;

const FooterSection = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
    border-top: 0;
    width: auto;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: background 0.15s ease;
  
  &:hover {
    background: rgba(255,255,255,0.06);
  }
`;
