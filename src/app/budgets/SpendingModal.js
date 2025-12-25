"use client";
import { useState } from "react";
import styled from "styled-components";

export default function SpendingModal({ isOpen, onClose, onAdd, budgetName }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const spendAmount = parseFloat(amount);

    if (!amount || isNaN(spendAmount) || spendAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    onAdd(spendAmount, description);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <h2>Add Spending to {budgetName}</h2>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="amount">Amount Spent</Label>
              <InputWrapper>
                <DollarSign>$</DollarSign>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (error) setError("");
                  }}
                  step="0.01"
                  min="0"
                  autoFocus
                />
              </InputWrapper>
              {error && <ErrorText>{error}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description (Optional)</Label>
              <TextArea
                id="description"
                placeholder="What did you spend on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />
            </FormGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={onClose}>
                Cancel
              </CancelButton>
              <AddButton type="submit">Add Spending</AddButton>
            </ButtonGroup>
          </Form>
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
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90vw;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
    font-size: 24px;
    color: #201f24;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #201f24;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #666;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #201f24;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DollarSign = styled.span`
  position: absolute;
  left: 12px;
  color: #666;
  font-weight: 600;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #201f24;
  transition: border-color 0.3s;

  &:hover,
  &:focus {
    border-color: #201f24;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #201f24;
  transition: border-color 0.3s;
  resize: vertical;

  &:hover,
  &:focus {
    border-color: #201f24;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const ErrorText = styled.span`
  color: #dc2626;
  font-size: 12px;
  margin-top: 0.25rem;
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

const AddButton = styled(Button)`
  background-color: #201f24;
  color: white;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.98);
  }
`;
