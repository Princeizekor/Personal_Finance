# Authentication System Documentation

## Overview
A complete authentication system has been implemented for the Personal Finance Dashboard with signup, login, and route protection features using localStorage for data persistence.

## Features Implemented

### 1. **Authentication Context** (`src/app/context/AuthContext.js`)
- Manages user state globally using React Context
- Handles signup, login, logout, and profile updates
- Stores user data in localStorage
- Provides `useAuth` hook for easy access throughout the app

**Key Functions:**
- `signup(userData)` - Registers a new user
- `login(email, password)` - Authenticates existing user
- `logout()` - Clears session and removes from localStorage
- `updateUser(updatedData)` - Updates user profile information

### 2. **Route Protection** (`src/app/context/ProtectedRoutes.js`)
- Protects private routes (dashboard, budgets, etc.)
- Redirects authenticated users away from auth pages
- Redirects unauthenticated users to login
- Shows loading state while authentication is being verified

**Protected Routes:**
- `/` - Dashboard (requires authentication)
- `/budgets` - Budgets page (requires authentication)
- `/transactions` - Transactions page (requires authentication)
- `/pots` - Pots page (requires authentication)
- `/recurring` - Recurring transactions (requires authentication)

**Public Routes:**
- `/login` - Login page
- `/signup` - Signup page

### 3. **Sign Up Page** (`src/app/signup/page.js`)
Modern, fully-featured signup form with:

**Form Fields:**
- First Name (required)
- Last Name (required)
- Email (required, with validation)
- Password (required, with strength requirements)
- Confirm Password (required, must match)

**Validation:**
- Email format validation
- Password must be minimum 8 characters
- Password must contain at least one uppercase letter
- Password must contain at least one number
- Passwords must match
- Real-time field error clearing
- Server error handling

**UI Features:**
- Beautiful gradient background
- Responsive design (mobile-friendly)
- Form state management
- Loading states during submission
- Link to login page for existing users
- Detailed password requirements hint

### 4. **Login Page** (`src/app/login/page.js`)
Clean and intuitive login interface with:

**Form Fields:**
- Email (required)
- Password (required)

**Features:**
- Email validation
- Error handling and display
- Loading state feedback
- Link to signup for new users
- Matching design with signup page

### 5. **User Menu Component** (`src/app/components/nav/UserMenu.js`)
Dropdown menu in the sidebar showing:
- User's initials as avatar
- User's full name and email
- Sign out button
- Click-outside-to-close functionality

### 6. **Updated Layout** (`src/app/layout.js`)
- Wraps entire app with AuthProvider
- Implements route protection
- Conditionally shows sidebar (hidden on auth pages)
- Manages layout based on authentication status

### 7. **Updated SideNav** (`src/app/components/nav/SideNav.js`)
- Integrated UserMenu component in footer
- Added sections for better organization
- UserMenu displays current user info

## Data Structure

### User Storage Format
```javascript
// Users array stored in localStorage['users']
{
  id: "1234567890",                    // Unique timestamp-based ID
  firstName: "John",                   // User's first name
  lastName: "Doe",                     // User's last name
  email: "john@example.com",           // User's email
  password: "Password123",             // Hashed or plain (consider encryption)
  createdAt: "2024-01-01T12:00:00Z"   // Account creation timestamp
}

// Current logged-in user (without password)
localStorage['currentUser'] = {
  id: "1234567890",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  createdAt: "2024-01-01T12:00:00Z"
}
```

## Usage Examples

### Using the useAuth Hook
```javascript
import { useAuth } from '@/app/context/AuthContext';

export default function MyComponent() {
  const { user, signup, login, logout, isAuthenticated } = useAuth();

  // user object contains current user data or null
  // isAuthenticated is a boolean
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.firstName}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Signup Example
```javascript
const { signup } = useAuth();

try {
  const newUser = signup({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'SecurePass123'
  });
  // Redirect to dashboard
  router.push('/');
} catch (error) {
  console.error(error.message); // "Email already registered"
}
```

### Login Example
```javascript
const { login } = useAuth();

try {
  const user = login('john@example.com', 'SecurePass123');
  router.push('/');
} catch (error) {
  console.error(error.message); // "Invalid email or password"
}
```

## Security Considerations

⚠️ **Important:** This implementation uses localStorage for demonstration purposes. For production:

1. **Password Encryption:**
   - Implement bcrypt or similar for password hashing
   - Never store plain passwords

2. **HTTPS Only:**
   - Always use HTTPS in production
   - Enable secure cookie flags

3. **Backend Authentication:**
   - Move authentication to backend API
   - Implement JWT tokens
   - Use httpOnly cookies

4. **Data Protection:**
   - Implement proper data validation on backend
   - Use environment variables for sensitive data
   - Consider encryption for sensitive user data

5. **Input Sanitization:**
   - Sanitize user inputs before storing
   - Implement CSRF protection
   - Add rate limiting

## Flow Diagrams

### User Authentication Flow
```
1. User visits app
   ↓
2. AuthProvider loads currentUser from localStorage
   ↓
3. ProtectedRoutes checks if route is public/private
   ↓
4. If private route + no user → redirect to /login
5. If public route + user exists → redirect to /
6. If authenticated & on private route → show dashboard with sidebar
7. If not authenticated & on public route → show login/signup page
```

### Signup Flow
```
User fills signup form
   ↓
Frontend validates input
   ↓
Check email not already registered
   ↓
Store user in localStorage['users']
   ↓
Set as currentUser in localStorage
   ↓
useAuth updates user state
   ↓
Redirect to dashboard
```

### Login Flow
```
User enters credentials
   ↓
Find user in localStorage['users'] matching email & password
   ↓
Set as currentUser in localStorage
   ↓
useAuth updates user state
   ↓
Redirect to dashboard
```

## File Structure
```
src/app/
├── context/
│   ├── AuthContext.js          # Authentication state management
│   └── ProtectedRoutes.js      # Route protection logic
├── components/
│   └── nav/
│       ├── UserMenu.js         # User dropdown menu (NEW)
│       └── SideNav.js          # Updated with UserMenu
├── login/
│   └── page.js                 # Login page (UPDATED)
├── signup/
│   └── page.js                 # Signup page (UPDATED)
└── layout.js                   # Root layout (UPDATED)
```

## Testing Checklist

- [ ] Create a new account with valid details
- [ ] Try signing up with existing email (should show error)
- [ ] Try signing up with weak password (should show specific error)
- [ ] Sign up successfully and verify redirect to dashboard
- [ ] Check localStorage has user data
- [ ] Log out and verify redirect to login
- [ ] Log in with saved credentials
- [ ] Try login with wrong password
- [ ] Verify logout removes user from localStorage
- [ ] Try accessing protected route without auth
- [ ] Try accessing /login when already authenticated
- [ ] Verify user info in dropdown menu

## Browser Storage Details

**localStorage Keys:**
- `users` - Array of all registered users
- `currentUser` - Currently logged-in user (without password)

**Clear Storage (for testing):**
```javascript
// In browser console
localStorage.removeItem('users');
localStorage.removeItem('currentUser');
```

## Future Improvements

1. Add email verification
2. Implement password reset functionality
3. Add two-factor authentication
4. Implement session timeout
5. Add user profile editing
6. Add account deletion
7. Implement password strength meter
8. Add remember me functionality
9. Implement OAuth/social login
10. Add activity logging

## Troubleshooting

**Issue: Getting redirected to login even after signup**
- Clear localStorage and try again
- Check browser console for errors

**Issue: Password validation too strict**
- Update password requirements in signup validation
- Adjust regex patterns in validateForm()

**Issue: User data not persisting**
- Check if localStorage is enabled in browser
- Verify no storage quota exceeded
- Clear cache and cookies

---

**Authentication System Version:** 1.0.0  
**Last Updated:** December 2024
