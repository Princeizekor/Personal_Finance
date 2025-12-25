'use client';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      router.push('/login');
    }
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return 'U';
  };

  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <Wrapper>
      <Header>
        <h1>My Profile</h1>
        <p>Manage your account settings and preferences</p>
      </Header>

      <Container>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            {!isEditing && (
              <EditButton onClick={() => setIsEditing(true)}>
                Edit Profile
              </EditButton>
            )}
          </CardHeader>

          <ProfileSection>
            <AvatarWrapper>
              <Avatar>
                {getInitials()}
              </Avatar>
              <UserInfo>
                <UserName>{user?.firstName} {user?.lastName}</UserName>
                <UserEmail>{user?.email}</UserEmail>
                <JoinDate>Joined {joinDate}</JoinDate>
              </UserInfo>
            </AvatarWrapper>
          </ProfileSection>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  hasError={!!errors.firstName}
                />
                {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  hasError={!!errors.lastName}
                />
                {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  hasError={!!errors.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </FormGroup>

              <ButtonGroup>
                <CancelButton type="button" onClick={handleCancel} disabled={loading}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </SaveButton>
              </ButtonGroup>
            </Form>
          ) : (
            <InfoGrid>
              <InfoItem>
                <Label>Email Address</Label>
                <Value>{user?.email}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Full Name</Label>
                <Value>{user?.firstName} {user?.lastName}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Account Status</Label>
                <StatusBadge>Active</StatusBadge>
              </InfoItem>
              <InfoItem>
                <Label>Member Since</Label>
                <Value>{joinDate}</Value>
              </InfoItem>
            </InfoGrid>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <SecuritySection>
            <SecurityItem>
              <SecurityInfo>
                <SecurityTitle>Password</SecurityTitle>
                <SecurityDesc>Last changed never</SecurityDesc>
              </SecurityInfo>
            </SecurityItem>
          </SecuritySection>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <ActionSection>
            <DangerButton onClick={handleLogout}>
              Log Out of All Devices
            </DangerButton>
          </ActionSection>
        </Card>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-height: 100vh;
  color: #201f24;
  padding: 2.2rem;
  background-color: #f5f3ef;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: #201f24;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 600px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #201f24;
`;

const EditButton = styled.button`
  background: #201f24;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #3d3c42;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 12px;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #201f24, #3d3c42);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 22px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #201f24;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const UserEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const JoinDate = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
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
  border: 2px solid ${props => props.hasError ? '#c02c1d' : '#e5e5e5'};
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #201f24;
  }

  &:disabled {
    background-color: #f5f3ef;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #c02c1d;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: #f5f3ef;
  color: #201f24;
  border: 1px solid #e5e5e5;

  &:hover:not(:disabled) {
    background: #e5e5e5;
  }
`;

const SaveButton = styled(Button)`
  background: #201f24;
  color: white;

  &:hover:not(:disabled) {
    background: #3d3c42;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Value = styled.p`
  margin: 0;
  font-size: 14px;
  color: #201f24;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  display: inline-block;
  background: #e6f9f3;
  color: #0d6e54;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background-color: #e6f9f3;
  color: #0d6e54;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: #fce3e1;
  color: #c02c1d;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 14px;
`;

const SecuritySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SecurityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f5f3ef;
  border-radius: 8px;
`;

const SecurityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SecurityTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #201f24;
`;

const SecurityDesc = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DangerButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #fce3e1;
  color: #c02c1d;
  border: 1px solid #c02c1d;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c02c1d;
    color: white;
  }
`;
