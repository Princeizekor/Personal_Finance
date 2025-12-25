"use client";
import Image from "next/image";
// import Image from "next/image";
import EllipsisMenu from "./EllipsisMenu";
import styled from "styled-components";

export default function Progress({ budget, onEdit, onDelete }) {
  const percentageUsed = (budget.spent / budget.maxSpend) * 100;
  const remaining = budget.maxSpend - budget.spent;

  return (
    <Wrapper>
      <div className="progress">
        <div className="title-wrap">
          <div className="title">
             <ColorDot color={budget.theme} />
            <p className="word">{budget.category}</p>
          </div>
          <EllipsisMenu onEdit={onEdit} onDelete={onDelete} />
        </div>
        <p className="max">Maximum of ${budget.maxSpend.toFixed(2)}</p>
        <div className="progress-bar">
          {/* <div className="loader"></div> */}
          <ProgressFill
            color={budget.theme}
            width={Math.min(percentageUsed, 100)}
          />
        </div>
        <div className="spending">
            <Bar color={budget.theme} />
          <div>
            <p>Spent</p>
            <p>${budget.spent.toFixed(2)}</p>
          </div>
          <Bar color="#f5f3ef" />
          <div>
            <p>Remaining</p>
            <p>${remaining.toFixed(2)}</p>
          </div>
        </div>
        <div className="trans">
          <Header>
            <h2>Latest Spending</h2>
            <SeeDetails>
              See All <span>›</span>
            </SeeDetails>
          </Header>
          <div className="display">
            <div className="user">
              <Image
                src="/assets/images/avatars/emma-richardson.jpg"
                alt="Logo"
                width={35}
                height={35}
                className="avatar"
              />
              <p className="title">Emma Richardson</p>
            </div>
            <div className="user-net">
              <p className="amount">+$75.50</p>
              <p className="date">19 Aug 2024</p>
            </div>
          </div>
          <div className="display">
            <div className="user">
              <Image
                src="/assets/images/avatars/savory-bites-bistro.jpg"
                alt="Logo"
                width={35}
                height={35}
                className="avatar"
              />
              <p className="title">Savory Bites Bistro</p>
            </div>
            <div className="user-net">
              <p className="amount">-$55.50</p>
              <p className="date">19 Aug 2024</p>
            </div>
          </div>
          <div className="display">
            <div className="user">
              <Image
                src="/assets/images/avatars/daniel-carter.jpg"
                alt="Logo"
                width={35}
                height={35}
                className="avatar"
              />
              <p className="title">Daniel Carter</p>
            </div>
            <div className="user-net">
              <p className="amount">-$42.30</p>
              <p className="date">18 Aug 2024</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .progress {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    gap: 1rem;
    .title-wrap {
      display: flex;
      justify-content: space-between;
      .title {
        display: flex;
        justify-content: space-between;
        width: 10%;
        align-items: center;
        .dot {
          width: 15px;
          height: 15px;
          border-radius: 100%;
          background-color: #14746f;
        }
        .word {
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
      .max {
      color: grey;
      margin-top: 0.7rem;
      }
    .progress-bar {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      padding: 0.3rem;
      background-color: #f5f3ef;
      .loader {
        width: 30%;
        height: 30px;
        border-radius: 5px;
        background-color: #14746f;
      }
    }
    .spending {
      display: flex;
      justify-content: space-between;
      div {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
        width: 50%;
        padding: 0rem 0rem 0rem 1rem;
      }
    }
    .trans {
      background-color: #f5f3ef;
      width: 100%;
      height: auto;
      border-radius: 12px;
      padding: 2rem;
      .display {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid silver;
        padding: 1rem 0rem;
        .user {
          display: flex;
          align-items: center;
          gap: 1rem;
          .avatar {
            border-radius: 50%;
          }
        }
        .user-net {
          display: flex;
          flex-direction: column;
          text-align: right;
        }
      }
      > :last-child {
        border-bottom: none;
      }
    }
  }
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

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}%;
  transition: width 0.3s ease;
  border-radius: 4px;
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  flex-shrink: 0;
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

const Bar = styled.span`
  width: 4px;
  height: 40px;
  background: ${(props) => props.color};
  border-radius: 10px;
`;
