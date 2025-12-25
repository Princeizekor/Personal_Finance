"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";

const budgetCategories = [
  "Entertainment",
  "Bills",
  "Dining Out",
  "Personal Care",
  "Groceries",
  "Transportation",
  "Shopping",
  "Subscriptions",
];

const themeColors = [
  { name: "Teal", value: "#14746F" },
  { name: "Cyan", value: "#6ED4E9" },
  { name: "Peach", value: "#F5C79C" },
  { name: "Purple", value: "#595772" },
  { name: "Green", value: "#16A34A" },
  { name: "Blue", value: "#2563EB" },
  { name: "Orange", value: "#EA580C" },
  { name: "Pink", value: "#EC4899" },
];

export default function EditBudgetModal({ isOpen, onClose, onUpdate, budget }) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (budget && isOpen) {
      setCategory(budget.category || budget.name || "");
      setLimit((budget.limit !== undefined ? budget.limit : budget.maxSpend || 0).toString());
      setColor(budget.color || budget.theme || "");
    }
  }, [budget, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!category) newErrors.category = "Please select a category";
    if (!limit) newErrors.limit = "Please enter maximum spend";
    if (isNaN(limit) || parseFloat(limit) <= 0)
      newErrors.limit = "Please enter a valid amount";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedBudget = {
      ...budget,
      category,
      limit: parseFloat(limit),
      color,
    };

    onUpdate(updatedBudget);
    onClose();
  };

  if (!isOpen || !budget) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <h2>Edit Budget</h2>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="category">Budget Category</Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category) {
                    setErrors({ ...errors, category: "" });
                  }
                }}
              >
                <option value="">Select a category...</option>
                {budgetCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
              {errors.category && <ErrorText>{errors.category}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="limit">Maximum Spend</Label>
              <InputWrapper>
                <DollarSign>$</DollarSign>
                <Input
                  id="limit"
                  type="number"
                  placeholder="e.g. 50.00"
                  value={limit}
                  onChange={(e) => {
                    setLimit(e.target.value);
                    if (errors.limit) {
                      setErrors({ ...errors, limit: "" });
                    }
                  }}
                  step="0.01"
                  min="0"
                />
              </InputWrapper>
              {errors.limit && <ErrorText>{errors.limit}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="color">Theme Color</Label>
              <ColorGrid>
                {themeColors.map((c) => (
                  <ColorOption
                    key={c.value}
                    type="button"
                    selected={color === c.value}
                    onClick={() => setColor(c.value)}
                    title={c.name}
                  >
                    <ColorBox color={c.value} />
                    {color === c.value && <CheckMark>✓</CheckMark>}
                  </ColorOption>
                ))}
              </ColorGrid>
            </FormGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={onClose}>
                Cancel
              </CancelButton>
              <UpdateButton type="submit">Update Budget</UpdateButton>
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

const Select = styled.select`
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #201f24;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover,
  &:focus {
    border-color: #201f24;
    outline: none;
  }
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

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const ColorOption = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border: 3px solid ${(props) => (props.selected ? "#201f24" : "transparent")};
  border-radius: 12px;
  padding: 0;
  cursor: pointer;
  background: none;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #201f24;
  }
`;

const ColorBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 10px;
`;

const CheckMark = styled.span`
  position: absolute;
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

const UpdateButton = styled(Button)`
  background-color: #201f24;
  color: white;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.98);
  }
`;
