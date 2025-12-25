"use client";
import styled from "styled-components";

export default function BudgetCard() {
  return (
    <Wrapper>
      <Header>
        <h2>Budgets</h2>
        <SeeDetails>
          See Details <span>›</span>
        </SeeDetails>
      </Header>

      <Grid>
        <ChartWrapper>
          <Donut>
            <Inner>
              <h3>$338</h3>
              <p>of $975 limit</p>
            </Inner>
          </Donut>
        </ChartWrapper>
        <Lister>
          <ListItem>
            <Bar color="#14746F" />
            <div>
              <Title>Entertainment</Title>
              <Amount>$50.00</Amount>
            </div>
          </ListItem>

          <ListItem>
            <Bar color="#6ED4E9" />
            <div>
              <Title>Bills</Title>
              <Amount>$750.00</Amount>
            </div>
          </ListItem>

          <ListItem>
            <Bar color="#F5C79C" />
            <div>
              <Title>Dining Out</Title>
              <Amount>$75.00</Amount>
            </div>
          </ListItem>

          <ListItem>
            <Bar color="#595772" />
            <div>
              <Title>Personal Care</Title>
              <Amount>$100.00</Amount>
            </div>
          </ListItem>
        </Lister>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  height: 70%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    font-size: 24px;
    font-weight: 700;
  }
`;

const SeeDetails = styled.p`
  font-size: 16px;
  color: #707070;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 20px;
    margin-left: 2px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
    height: 315px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Donut = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: conic-gradient(
      #14746f 0deg 50deg,
      #6ed4e9 50deg 160deg,
      #f5c79c 160deg 230deg,
      #595772 230deg 360deg
    ),
    #f9fafa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 150px;
  height: 150px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 30px;
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: #777;
    margin: 0;
  }
`;
const Lister = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  justify-content: center;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Bar = styled.span`
  width: 6px;
  height: 46px;
  background: ${(props) => props.color};
  border-radius: 10px;
`;

const Title = styled.p`
  font-size: 16px;
  color: #6a6a6a;
  margin: 0;
`;

const Amount = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;
