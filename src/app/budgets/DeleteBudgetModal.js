"use client";
import styled from "styled-components";

export default function DeleteBudgetModal({ isOpen, onClose, onConfirm, budgetName }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ModalContent>
          <IconContainer>
            <WarningIcon>!</WarningIcon>
          </IconContainer>

          <ModalHeader>
            <h2>Delete Budget</h2>
          </ModalHeader>

          <MessageText>
            Are you sure you want to delete the <strong>{budgetName}</strong> budget? This action cannot be undone.
          </MessageText>

          <ButtonGroup>
            <CancelButton onClick={onClose}>
              No, Go Back
            </CancelButton>
            <ConfirmButton onClick={handleConfirm}>
              Yes, Confirm Deletion
            </ConfirmButton>
          </ButtonGroup>
        </ModalContent>
      </ModalContainer>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90vw;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const IconContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const WarningIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fee2e2;
  color: #dc2626;
  font-size: 32px;
  font-weight: bold;
`;

const ModalHeader = styled.div`
  margin-bottom: 1rem;

  h2 {
    margin: 0;
    font-size: 22px;
    color: #201f24;
  }
`;

const MessageText = styled.p`
  color: #666;
  font-size: 15px;
  margin: 1rem 0 2rem 0;
  line-height: 1.5;

  strong {
    color: #201f24;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
`;

const CancelButton = styled(Button)`
  background-color: #f5f3ef;
  color: #201f24;

  &:hover {
    background-color: #e8e6e2;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #dc2626;
  color: white;

  &:hover {
    background-color: #b91c1c;
  }

  &:active {
    transform: scale(0.98);
  }
`;
