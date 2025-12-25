"use client";
import styled from "styled-components";
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Link from 'next/link';
import UserMenu from "./UserProfile";

export default function Overview() {
  const { user } = useAuth();
  const { data, getStatistics } = useData();
  const stats = getStatistics();

  // Sample transactions for display
  const recentTransactions = data.transactions.slice(-5).reverse();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Wrapper>
      <Header>
        <div>
          <h1>Welcome back, {user?.firstName}!</h1>
          <p>Here's your financial overview</p>
        </div>
        <UserMenu />
      </Header>

      <GridContainer>
        {/* Summary Cards */}
        <StatsGrid>
          <StatCard>
            <CardIcon>💰</CardIcon>
            <CardLabel>Total Balance</CardLabel>
            <CardValue>{formatCurrency(stats.netBalance)}</CardValue>
            <CardSubtext>Current account balance</CardSubtext>
          </StatCard>

          <StatCard>
            <CardIcon>📈</CardIcon>
            <CardLabel>Total Income</CardLabel>
            <CardValue>{formatCurrency(stats.totalIncome)}</CardValue>
            <CardSubtext>This period</CardSubtext>
          </StatCard>

          <StatCard>
            <CardIcon>📉</CardIcon>
            <CardLabel>Total Expenses</CardLabel>
            <CardValue>{formatCurrency(stats.totalExpenses)}</CardValue>
            <CardSubtext>Spending this period</CardSubtext>
          </StatCard>

          <StatCard>
            <CardIcon>💸</CardIcon>
            <CardLabel>Bills Paid</CardLabel>
            <CardValue>{formatCurrency(stats.billsPaid)}</CardValue>
            <CardSubtext>{stats.billsPaidCount} bills paid</CardSubtext>
          </StatCard>

          <StatCard>
            <CardIcon>🏦</CardIcon>
            <CardLabel>Total Saved</CardLabel>
            <CardValue>{formatCurrency(stats.totalSaved)}</CardValue>
            <CardSubtext>Across {stats.potCount} pots</CardSubtext>
          </StatCard>

          <StatCard>
            <CardIcon>📊</CardIcon>
            <CardLabel>Budget Spent</CardLabel>
            <CardValue>{formatCurrency(stats.budgetSpent)}</CardValue>
            <CardSubtext>Across {stats.budgetCount} budgets</CardSubtext>
          </StatCard>
        </StatsGrid>

        {/* Quick Stats */}
        <QuickStatsSection>
          <QuickStatItem>
            <Label>Active Budgets</Label>
            <Value>{stats.budgetCount}</Value>
          </QuickStatItem>
          <QuickStatItem>
            <Label>Total Transactions</Label>
            <Value>{stats.transactionCount}</Value>
          </QuickStatItem>
          <QuickStatItem>
            <Label>Savings Pots</Label>
            <Value>{stats.potCount}</Value>
          </QuickStatItem>
          <QuickStatItem>
            <Label>Recurring Bills</Label>
            <Value>{stats.billCount}</Value>
          </QuickStatItem>
        </QuickStatsSection>

        {/* Recent Transactions */}
        <TransactionsSection>
          <SectionHeader>
            <h2>Recent Transactions</h2>
            <Link href="/transactions">
              <SeeAllLink>See All →</SeeAllLink>
            </Link>
          </SectionHeader>

          {recentTransactions.length === 0 ? (
            <EmptyState>
              <p>No transactions yet. Start by adding your first transaction!</p>
            </EmptyState>
          ) : (
            <TransactionsList>
              {recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id}>
                  <TransactionIcon>💸</TransactionIcon>
                  <TransactionDetails>
                    <TransactionTitle>{transaction.title || 'Transaction'}</TransactionTitle>
                    <TransactionCategory>{transaction.category || 'Uncategorized'}</TransactionCategory>
                  </TransactionDetails>
                  <TransactionAmount isPositive={transaction.amount > 0}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </TransactionAmount>
                </TransactionItem>
              ))}
            </TransactionsList>
          )}
        </TransactionsSection>

        {/* Quick Actions */}
        <ActionsSection>
          <h2>Quick Actions</h2>
          <ActionGrid>
            <ActionCard href="/budgets">
              <ActionIcon>📊</ActionIcon>
              <ActionTitle>Manage Budgets</ActionTitle>
              <ActionDesc>Set and track spending limits</ActionDesc>
            </ActionCard>

            <ActionCard href="/pots">
              <ActionIcon>🏺</ActionIcon>
              <ActionTitle>View Pots</ActionTitle>
              <ActionDesc>Check your savings goals</ActionDesc>
            </ActionCard>

            <ActionCard href="/transactions">
              <ActionIcon>📋</ActionIcon>
              <ActionTitle>All Transactions</ActionTitle>
              <ActionDesc>View complete transaction history</ActionDesc>
            </ActionCard>

            <ActionCard href="/recurring">
              <ActionIcon>🔄</ActionIcon>
              <ActionTitle>Recurring Bills</ActionTitle>
              <ActionDesc>Manage your recurring payments</ActionDesc>
            </ActionCard>
          </ActionGrid>
        </ActionsSection>
      </GridContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f3ef;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #201f24;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  p {
    margin: 0.5rem 0 0 0;
    color: #666;
    font-size: 14px;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 32px;
  margin-bottom: 0.5rem;
`;

const CardLabel = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardValue = styled.p`
  margin: 0.5rem 0;
  font-size: 24px;
  font-weight: 700;
  color: #201f24;
`;

const CardSubtext = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

const QuickStatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.5rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const QuickStatItem = styled.div`
  text-align: center;

  @media (max-width: 480px) {
    text-align: left;
  }
`;

const Label = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 28px;
  font-weight: 700;
  color: #201f24;
`;

const TransactionsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #201f24;
  }
`;

const SeeAllLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f5f3ef;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #eee9e0;
  }
`;

const TransactionIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

const TransactionDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const TransactionTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #201f24;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TransactionCategory = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 12px;
  color: #999;
`;

const TransactionAmount = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.isPositive ? '#0d6e54' : '#c02c1d'};
  flex-shrink: 0;
`;

const ActionsSection = styled.div`
  h2 {
    margin: 0 0 1.5rem 0;
    font-size: 18px;
    font-weight: 600;
    color: #201f24;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
`;

const ActionIcon = styled.div`
  font-size: 28px;
`;

const ActionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #201f24;
`;

const ActionDesc = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;
