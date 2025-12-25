'use client';
import { useEffect } from 'react';
import styled from 'styled-components';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorCard>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorTitle>Something went wrong!</ErrorTitle>
        <ErrorMessage>
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </ErrorMessage>
        <ErrorDetails>
          {error?.message && <Details>{error.message}</Details>}
        </ErrorDetails>
        <ResetButton onClick={() => reset()}>
          Try Again
        </ResetButton>
      </ErrorCard>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
`;

const ErrorCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h1`
  margin: 0 0 1rem 0;
  font-size: 24px;
  font-weight: 700;
  color: #201f24;
`;

const ErrorMessage = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

const ErrorDetails = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f5f3ef;
  border-radius: 8px;
  text-align: left;
`;

const Details = styled.p`
  margin: 0;
  font-size: 12px;
  color: #c02c1d;
  font-family: monospace;
  word-break: break-word;
`;

const ResetButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
