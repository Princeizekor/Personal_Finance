"use client";
import Image from "next/image";
import styled from "styled-components";

export default function () {
  return (
    <Wrapper>
      <Header>
        <h2>Transaction</h2>
        <SeeDetails>
          View All <span>›</span>
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
          <p className="title">Ugiagbe Wellington</p>
        </div>
        <div className="user-net">
          <p className="amount">-$42.30</p>
          <p className="date">18 Aug 2024</p>
        </div>
      </div>
      <div className="display">
        <div className="user">
          <Image
            src="/assets/images/avatars/sun-park.jpg"
            alt="Logo"
            width={35}
            height={35}
            className="avatar"
          />
          <p className="title">Sun Park</p>
        </div>
        <div className="user-net">
          <p className="amount">+$120.00</p>
          <p className="date">17 Aug 2024</p>
        </div>
      </div>
      <div className="display">
        <div className="user">
          <Image
            src="/assets/images/avatars/urban-services-hub.jpg"
            alt="Logo"
            width={35}
            height={35}
            className="avatar"
          />
          <p className="title">Urban Services Hub</p>
        </div>
        <div className="user-net">
          <p className="amount">-$65.00</p>
          <p className="date">17 Aug 2024</p>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 12px;
  padding: 2rem;
  .display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // gap: 2rem;
    // margin: 2rem 0rem;
    border-bottom: 1px solid silver;
    padding: 1.3rem 0rem;
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
      gap: 1rem;
      text-align: right;
    }
  }
  > :last-child {
    border-bottom: none;
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
