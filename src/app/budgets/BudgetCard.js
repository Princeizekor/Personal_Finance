"use client";
import styled from "styled-components";
import EllipsisMenu from "./EllipsisMenu";

export default function BudgetCard({ budget, onEdit, onDelete }) {
  const percentageUsed = (budget.spent / budget.maxSpend) * 100;
  const remaining = budget.maxSpend - budget.spent;

  return (
    <Card>
      <CardHeader>
        <CategoryInfo>
          <ColorDot color={budget.theme} />
          <CategoryName>{budget.category}</CategoryName>
        </CategoryInfo>
        <EllipsisMenu onEdit={onEdit} onDelete={onDelete} />
      </CardHeader>

      <MaxSpend>Maximum of ${budget.maxSpend.toFixed(2)}</MaxSpend>

      <ProgressBarContainer>
        <ProgressBar>
          <ProgressFill
            color={budget.theme}
            width={Math.min(percentageUsed, 100)}
          />
        </ProgressBar>
      </ProgressBarContainer>

      <SpendingInfo>
        <SpendingItem>
          <SpendingBar color={budget.theme} />
          <SpendingDetails>
            <Label>Spent</Label>
            <Amount>${budget.spent.toFixed(2)}</Amount>
          </SpendingDetails>
        </SpendingItem>

        <SpendingItem>
          <SpendingBar color="#f5f3ef" />
          <SpendingDetails>
            <Label>Remaining</Label>
            <Amount>${remaining.toFixed(2)}</Amount>
          </SpendingDetails>
        </SpendingItem>
      </SpendingInfo>
    </Card>
  );
}

const Card = styled.div`
width: 60%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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
  background-color: ${(props) => props.color};
  flex-shrink: 0;
`;

const CategoryName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #201f24;
`;

const MaxSpend = styled.p`
  margin: 0 0 1rem 0;
  font-size: 13px;
  color: #999;
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f5f3ef;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}%;
  transition: width 0.3s ease;
  border-radius: 4px;
`;

const SpendingInfo = styled.div`
  display: flex;
  gap: 2rem;
`;

const SpendingItem = styled.div`
  display: flex;
  gap: 0.75rem;
  flex: 1;
`;

const SpendingBar = styled.div`
  width: 4px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
  flex-shrink: 0;
`;

const SpendingDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Amount = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 16px;
  font-weight: 700;
  color: #201f24;
`;
