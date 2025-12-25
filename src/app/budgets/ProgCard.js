"use client";
import Image from "next/image";
import styled from "styled-components";

export default function Progress() {
  return (
    <Wrapper>
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
      <div className="progress"></div>
      <div className="progress"></div>
      <div className="progress"></div>
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
    height: 550px;
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
    width: 25%;
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
