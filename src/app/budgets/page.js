"use client";
import { useState } from "react";
import styled from "styled-components";
import { useData } from "../context/DataContext";
import AddBudgetModal from "./AddBudgetModal";
import EditBudgetModal from "./EditBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";

const BUDGET_COLORS = [
  "#667eea", "#764ba2", "#f093fb", "#4facfe",
  "#43e97b", "#fa709a", "#feca57", "#ff9ff3"
];

export default function BudgetsPage() {
  const { data, addBudget, updateBudget, deleteBudget } = useData();
  const budgets = data.budgets;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleAddBudget = (budgetData) => {
    const newBudget = {
      ...budgetData,
      color: BUDGET_COLORS[budgets.length % BUDGET_COLORS.length],
    };
    addBudget(newBudget);
    setIsAddOpen(false);
  };

  const handleEditBudget = (updatedBudget) => {
    updateBudget(selectedBudget.id, updatedBudget);
    setIsEditOpen(false);
  };

  const handleDeleteBudget = () => {
    deleteBudget(selectedBudget.id);
    setIsDeleteOpen(false);
  };

  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalBudget = budgets.reduce((sum, b) => sum + (b.limit || 0), 0);

  const handleOpenEdit = (budget) => {
    setSelectedBudget(budget);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (budget) => {
    setSelectedBudget(budget);
    setIsDeleteOpen(true);
  };

  return (
    <Wrapper>
      <Header>
        <div>
          <h1>Budgets</h1>
          <p>Manage and track your spending limits</p>
        </div>
        <AddButton onClick={() => setIsAddOpen(true)}>
          + Add Budget
        </AddButton>
      </Header>

      {budgets.length === 0 ? (
        <EmptyState>
          <Icon>📊</Icon>
          <Title>No budgets yet</Title>
          <Description>Create your first budget to start tracking your spending</Description>
          <CreateButton onClick={() => setIsAddOpen(true)}>
            Create Your First Budget
          </CreateButton>
        </EmptyState>
      ) : (
        <Container>
          <SummaryCard>
            <SummaryItem>
              <SummaryLabel>Total Budget</SummaryLabel>
              <SummaryValue>${totalBudget.toFixed(2)}</SummaryValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <SummaryLabel>Total Spent</SummaryLabel>
              <SummaryValue spent={totalSpent}>${totalSpent.toFixed(2)}</SummaryValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <SummaryLabel>Remaining</SummaryLabel>
              <SummaryValue> ${(totalBudget - totalSpent).toFixed(2)}</SummaryValue>
            </SummaryItem>
          </SummaryCard>

          <BudgetsGrid>
            {budgets.map((budget) => (
              <BudgetCard key={budget.id}>
                <CardHeader>
                  <CategoryInfo>
                    <ColorDot color={budget.color || "#667eea"} />
                    <CategoryName>{budget.name || budget.category}</CategoryName>
                  </CategoryInfo>
                  <MoreButton onClick={() => handleOpenEdit(budget)}>
                    ⋯
                  </MoreButton>
                </CardHeader>

                <ProgressSection>
                  <ProgressLabel>Maximum Spend</ProgressLabel>
                  <ProgressValue>${(budget.limit || 0).toFixed(2)}</ProgressValue>
                  <ProgressBar>
                    <ProgressFill 
                      width={Math.min(100, (((budget.spent || 0) / (budget.limit || 1)) * 100))}
                      color={budget.color || "#667eea"}
                    />
                  </ProgressBar>
                  <ProgressStats>
                    <Spent>${(budget.spent || 0).toFixed(2)} Spent</Spent>
                    <Remaining>${Math.max(0, (budget.limit || 0) - (budget.spent || 0)).toFixed(2)} Left</Remaining>
                  </ProgressStats>
                </ProgressSection>

                <CardFooter>
                  <EditCardButton onClick={() => handleOpenEdit(budget)}>
                    Edit
                  </EditCardButton>
                  <DeleteCardButton onClick={() => handleOpenDelete(budget)}>
                    Delete
                  </DeleteCardButton>
                </CardFooter>
              </BudgetCard>
            ))}
          </BudgetsGrid>
        </Container>
      )}

      <AddBudgetModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddBudget}
      />

      <EditBudgetModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdate={handleEditBudget}
        budget={selectedBudget}
      />

      <DeleteBudgetModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteBudget}
        budgetName={selectedBudget?.name || selectedBudget?.category}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f3ef;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;

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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AddButton = styled.button`
  background: #201f24;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #3d3c42;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SummaryItem = styled.div`
  text-align: center;
  flex: 1;
`;

const SummaryLabel = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const SummaryValue = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.spent ? '#c02c1d' : '#0d6e54'};
`;

const Divider = styled.div`
  width: 1px;
  background: #e5e5e5;
  margin: 0 1rem;
`;

const BudgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BudgetCard = styled.div`
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

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const CategoryName = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #201f24;
`;

const MoreButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s ease;

  &:hover {
    color: #201f24;
  }
`;

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressLabel = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProgressValue = styled.p`
  margin: 0 0 1rem 0;
  font-size: 28px;
  font-weight: 700;
  color: #201f24;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background: ${props => props.color};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Spent = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

const Remaining = styled.p`
  margin: 0;
  font-size: 12px;
  color: #0d6e54;
  font-weight: 500;
`;

const CardFooter = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CardButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const EditCardButton = styled(CardButton)`
  background: #f5f3ef;
  color: #201f24;

  &:hover {
    background: #e5ddd2;
  }
`;

const DeleteCardButton = styled(CardButton)`
  background: #fce3e1;
  color: #c02c1d;

  &:hover {
    background: #f5c3bc;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 24px;
  font-weight: 700;
  color: #201f24;
`;

const Description = styled.p`
  margin: 0 0 2rem 0;
  color: #666;
  font-size: 14px;
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

