'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Validate First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...signupData } = formData;
      signup(signupData);
      
      // Redirect to dashboard after successful signup
      router.push('/');
    } catch (error) {
      setServerError(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <ImageContainer>
        <Image
          src="/assets/images/illustration-authentication.svg"
          width={420}
          height={730}
          alt="authentication illustration"
          priority
        />
      </ImageContainer>

      <FormContainer>
        <FormHeader>
          <Title>Create Account</Title>
          <Subtitle>Join us to manage your personal finances</Subtitle>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

          <FormGroup>
            <InputRow>
              <InputWrapper>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  error={!!errors.firstName}
                />
                {errors.firstName && (
                  <FieldError>{errors.firstName}</FieldError>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  error={!!errors.lastName}
                />
                {errors.lastName && (
                  <FieldError>{errors.lastName}</FieldError>
                )}
              </InputWrapper>
            </InputRow>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              error={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password *</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters with uppercase and number"
              error={!!errors.password}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
            <PasswordHint>
              Password must contain at least 8 characters, one uppercase letter and one number
            </PasswordHint>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <FieldError>{errors.confirmPassword}</FieldError>
            )}
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </SubmitButton>
        </Form>

        <LoginLink>
          Already have an account?{' '}
          <Link href="/login">Sign In</Link>
        </LoginLink>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 0;
    max-width: 200px;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;

  @media (max-width: 768px) {
    padding: 2rem;
    max-width: 100%;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
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

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => (props.error ? '#ef4444' : '#e5e7eb')};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => (props.error ? '#ef4444' : '#667eea')};
    box-shadow: ${props =>
      props.error
        ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
        : '0 0 0 3px rgba(102, 126, 234, 0.1)'};
  }

  &::placeholder {
    color: #999;
  }
`;

const FieldError = styled.span`
  font-size: 0.85rem;
  color: #ef4444;
  font-weight: 500;
`;

const PasswordHint = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0;
  padding: 0.5rem 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
  font-size: 0.95rem;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  margin-top: 1.5rem;
`;

const Link = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;