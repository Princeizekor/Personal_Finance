'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

export default function LogIn() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    setServerError('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      login(formData.email, formData.password);
      router.push('/');
    } catch (error) {
      setServerError(error.message || 'Invalid email or password');
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
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your account</Subtitle>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

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
              placeholder="Enter your password"
              error={!!errors.password}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </Form>

        <SignupLink>
          Don't have an account?{' '}
          <Link href="/signup">Create one here</Link>
        </SignupLink>
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

const SignupLink = styled.p`
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