'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';

const publicRoutes = ['/login', '/signup'];

export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    const isPublicRoute = publicRoutes.includes(pathname);

    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (user && isPublicRoute) {
      router.push('/');
      return;
    }

    // If user is not authenticated and tries to access protected routes
    if (!user && !isPublicRoute) {
      router.push('/login');
      return;
    }
  }, [user, loading, pathname, router, mounted]);

  // Don't render anything while loading to prevent flashing
  if (!mounted || loading) {
    return (
    //   <LoadingContainer>
    //     <LoadingSpinner />
    //     <LoadingText>Loading...</LoadingText>
    //   </LoadingContainer>
      <></>
    );
  }

  return children;
};

const LoadingContainer = `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoadingSpinner = `
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = `
  margin-top: 1rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;
