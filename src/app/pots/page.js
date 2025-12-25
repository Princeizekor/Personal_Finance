'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../context/DataContext';

export default function PotsPage() {
  const { data, addPot, updatePot, deletePot } = useData();
  const pots = data.pots;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPot, setSelectedPot] = useState(null);
  const [formData, setFormData] = useState({ name: '', target: 0 });
  const [error, setError] = useState('');

  const POT_COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];

  const handleAddPot = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Pot name is required');
      return;
    }

    if (!formData.target || parseFloat(formData.target) <= 0) {
      setError('Target amount must be greater than 0');
      return;
    }

    addPot({
      name: formData.name,
      target: parseFloat(formData.target),
      color: POT_COLORS[pots.length % POT_COLORS.length],
    });

    setFormData({ name: '', target: 0 });
    setIsAddOpen(false);
  };

  const handleEditPot = (pot) => {
    setSelectedPot(pot);
    setFormData({ name: pot.name, target: pot.target });
    setIsEditOpen(true);
  };

  const handleUpdatePot = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Pot name is required');
      return;
    }

    updatePot(selectedPot.id, {
      name: formData.name,
      target: parseFloat(formData.target),
    });

    setFormData({ name: '', target: 0 });
    setIsEditOpen(false);
    setSelectedPot(null);
  };

  const handleAddMoney = (pot) => {
    const amount = prompt(`Add money to ${pot.name}:`, '0');
    if (amount && parseFloat(amount) > 0) {
      updatePot(pot.id, {
        saved: (pot.saved || 0) + parseFloat(amount),
      });
    }
  };

  const handleWithdraw = (pot) => {
    const amount = prompt(`Withdraw from ${pot.name}:`, '0');
    if (amount && parseFloat(amount) > 0) {
      const newSaved = Math.max(0, (pot.saved || 0) - parseFloat(amount));
      updatePot(pot.id, { saved: newSaved });
    }
  };

  const totalSaved = pots.reduce((sum, p) => sum + (p.saved || 0), 0);
  const totalTarget = pots.reduce((sum, p) => sum + (p.target || 0), 0);

  return (
    <Wrapper>
      <Header>
        <div>
          <h1>Savings Pots</h1>
          <p>Organize and track your savings goals</p>
        </div>
        <AddButton onClick={() => setIsAddOpen(true)}>
          + Add Pot
        </AddButton>
      </Header>

      {pots.length === 0 ? (
        <EmptyState>
          <Icon>🏺</Icon>
          <Title>No savings pots yet</Title>
          <Description>Create your first pot to start saving towards your goals</Description>
          <CreateButton onClick={() => setIsAddOpen(true)}>
            Create Your First Pot
          </CreateButton>
        </EmptyState>
      ) : (
        <Container>
          <SummaryCard>
            <SummaryItem>
              <SummaryLabel>Total Saved</SummaryLabel>
              <SummaryValue>${totalSaved.toFixed(2)}</SummaryValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <SummaryLabel>Total Target</SummaryLabel>
              <SummaryValue>${totalTarget.toFixed(2)}</SummaryValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <SummaryLabel>Progress</SummaryLabel>
              <SummaryValue>
                {totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(0) : 0}%
              </SummaryValue>
            </SummaryItem>
          </SummaryCard>

          <PotsGrid>
            {pots.map((pot) => {
              const progress = pot.target > 0 ? (pot.saved || 0) / pot.target * 100 : 0;
              return (
                <PotCard key={pot.id}>
                  <CardHeader>
                    <PotInfo>
                      <ColorDot color={pot.color} />
                      <PotName>{pot.name}</PotName>
                    </PotInfo>
                    <MoreButton onClick={() => handleEditPot(pot)}>⋯</MoreButton>
                  </CardHeader>

                  <ProgressSection>
                    <ProgressLabel>Total Saved</ProgressLabel>
                    <ProgressValue>${(pot.saved || 0).toFixed(2)}</ProgressValue>
                    <ProgressBar>
                      <ProgressFill width={Math.min(100, progress)} color={pot.color} />
                    </ProgressBar>
                    <ProgressStats>
                      <Percentage>{Math.round(progress)}%</Percentage>
                      <Target>of ${pot.target.toFixed(2)}</Target>
                    </ProgressStats>
                  </ProgressSection>

                  <CardFooter>
                    <ActionButton primary onClick={() => handleAddMoney(pot)}>
                      + Add Money
                    </ActionButton>
                    <ActionButton onClick={() => handleWithdraw(pot)}>
                      Withdraw
                    </ActionButton>
                  </CardFooter>
                </PotCard>
              );
            })}
          </PotsGrid>
        </Container>
      )}

      {/* Add Pot Modal */}
      {isAddOpen && (
        <Modal onClick={() => setIsAddOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h2>Add New Pot</h2>
              <CloseButton onClick={() => setIsAddOpen(false)}>✕</CloseButton>
            </ModalHeader>
            <Form onSubmit={handleAddPot}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormGroup>
                <Label>Pot Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Vacation Fund"
                />
              </FormGroup>
              <FormGroup>
                <Label>Target Amount</Label>
                <Input
                  type="number"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit">Create Pot</SaveButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {/* Edit Pot Modal */}
      {isEditOpen && selectedPot && (
        <Modal onClick={() => setIsEditOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h2>Edit Pot</h2>
              <CloseButton onClick={() => setIsEditOpen(false)}>✕</CloseButton>
            </ModalHeader>
            <Form onSubmit={handleUpdatePot}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormGroup>
                <Label>Pot Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Target Amount</Label>
                <Input
                  type="number"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  step="0.01"
                />
              </FormGroup>
              <ButtonGroup>
                <DeleteButton type="button" onClick={() => {
                  if (window.confirm('Delete this pot?')) {
                    deletePot(selectedPot.id);
                    setIsEditOpen(false);
                  }
                }}>
                  Delete
                </DeleteButton>
                <ButtonGroupRight>
                  <CancelButton type="button" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </CancelButton>
                  <SaveButton type="submit">Save Changes</SaveButton>
                </ButtonGroupRight>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
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
`;

const SummaryValue = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
`;

const Divider = styled.div`
  width: 1px;
  background: #e5e5e5;
  margin: 0 1rem;
`;

const PotsGrid = styled.div`
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

const PotCard = styled.div`
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

const PotInfo = styled.div`
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

const PotName = styled.h3`
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
  transition: width 0.3s ease;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Percentage = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
`;

const Target = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

const CardFooter = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  background: ${props => props.primary ? '#667eea' : '#f5f3ef'};
  color: ${props => props.primary ? 'white' : '#201f24'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? '#764ba2' : '#eee9e0'};
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
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #201f24;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #201f24;
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
  font-weight: 500;
  color: #201f24;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorMessage = styled.p`
  color: #c02c1d;
  font-size: 12px;
  margin: 0;
  padding: 0.75rem;
  background: #fce3e1;
  border-radius: 6px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ButtonGroupRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background: #f5f3ef;
  color: #201f24;
  border: 1px solid #e5e5e5;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #eee9e0;
  }
`;

const SaveButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #764ba2;
  }
`;

const DeleteButton = styled.button`
  background: #fce3e1;
  color: #c02c1d;
  border: 1px solid #c02c1d;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c02c1d;
    color: white;
  }
`;

