'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNav from "./components/nav/SideNav";
import styled from "styled-components";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { ProtectedRoutes } from "./context/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata = {
  title: "Personal Finance App",
  description: "Track your finances and budgets",
};

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isAuthPage ? (
          // Auth pages don't have sidebar
          <>{children}</>
        ) : (
          // Dashboard pages have sidebar
          <MainContainer>
            <SideNav />
            <ContentWrapper>
              {children}
            </ContentWrapper>
          </MainContainer>
        )}
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <DataProvider>
        <ProtectedRoutes>
          <LayoutContent>{children}</LayoutContent>
        </ProtectedRoutes>
      </DataProvider>
    </AuthProvider>
  );
}

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const ContentWrapper = styled.main`
  flex: 1;
  margin-left: var(--sidebar-width);
  overflow-y: auto;
  background-color: #f5f3ef;
  transition: margin-left 200ms ease, padding-bottom 200ms ease;
  padding-bottom: 0;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-bottom: var(--bottom-nav-height);
  }
`;
