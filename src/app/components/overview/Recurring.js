"use client";
import styled from "styled-components";

export default function RecurringBills() {
  return (
    <Wrapper>
      <Header>
        <h2>Recurring Bills</h2>
        <SeeDetails>
          See Details <span>›</span>
        </SeeDetails>
      </Header>

      <List>
        <BillCard>
          {/* <Bar color="#14746F" /> */}
          <Label>Paid Bills</Label>
          <Amount>$190.00</Amount>
        </BillCard>

        <BillCard>
          {/* <Bar color="#F5C79C" /> */}
          <Label>Total Upcoming</Label>
          <Amount>$194.98</Amount>
        </BillCard>

        <BillCard>
          {/* <Bar color="#6ED4E9" /> */}
          <Label>Due Soon</Label>
          <Amount>$59.98</Amount>
        </BillCard>
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  h2 {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
  }
`;

const SeeDetails = styled.div`
  font-size: 16px;
  color: #777;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-size: 20px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  & > :nth-child(2) {
    border-left: 5px solid #F5C79C;
  }
    & > :nth-child(3) {
    border-left: 5px solid #6ED4E9;
    }
`;

const BillCard = styled.div`
  background: #f7f3ef;
  padding: 1.5rem;
  border-radius: 12px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  gap: 16px;
  border-left: 5px solid #14746f;
`;

const Label = styled.p`
  margin: 0;
  font-size: 17px;
  color: #6b6b6b;
`;

const Amount = styled.p`
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  color: #111;
`;
