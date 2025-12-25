# Testing Guide - Personal Finance Dashboard

## Quick Start Testing

### 1. **Sign Up Test**
```
1. Go to http://localhost:3000/signup
2. Fill in form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Password123
   - Confirm: Password123
3. Click "Sign Up"
4. Should redirect to dashboard
```

### 2. **Login Test**
```
1. Go to http://localhost:3000/login
2. Use credentials from signup above
3. Click "Login"
4. Should redirect to dashboard
```

### 3. **Dashboard Overview**
```
1. After login, view dashboard
2. Check for:
   - Total Balance (shows 0 initially)
   - Income/Expenses (shows 0 initially)
   - Quick action cards
   - Recent transactions (empty initially)
```

### 4. **Profile Management**
```
1. Click user avatar (top right of sidebar)
2. Click "View Profile"
3. View profile information
4. Click "Edit Profile"
5. Change first name to "Jane"
6. Click "Save Changes"
7. Verify changes saved
```

### 5. **Budget Management**
```
1. Click "Budgets" in sidebar
2. Click "+ Add Budget"
3. Fill in:
   - Budget Name: Groceries
   - Spending Limit: 500
4. Click "Create"
5. See budget card appear
6. Click "Edit" to modify
7. Click "Delete" to remove
```

### 6. **Savings Pots**
```
1. Click "Pots" in sidebar
2. Click "+ Add Pot"
3. Fill in:
   - Pot Name: Vacation
   - Target Amount: 3000
4. Click "Create Pot"
5. Click "+ Add Money" and enter 100
6. See progress update
7. Click "Withdraw" to test withdrawal
```

### 7. **Sidebar Navigation**
```
1. Test all navigation links:
   - Overview
   - Transactions
   - Budgets
   - Pots
   - Bills
2. Verify minimize button:
   - Click minimize icon
   - Sidebar should shrink to icons
   - Click again to expand
3. Check persistence:
   - Refresh page
   - Minimize state should persist
```

### 8. **Mobile Responsiveness**
```
1. Open DevTools (F12)
2. Click device toolbar (mobile view)
3. Test breakpoints:
   - iPhone SE (375px)
   - iPhone XR (414px)
   - iPad (768px)
   - Tablet (1024px)
4. Verify:
   - Bottom navigation appears on mobile
   - Buttons are touch-friendly
   - Layout adjusts properly
```

### 9. **Logout Test**
```
1. Click user avatar
2. Click "Log Out of All Devices"
3. Confirm logout
4. Should redirect to login page
5. Cannot access dashboard without login
```

### 10. **Data Persistence**
```
1. Add a budget and pot
2. Go to profile and edit name
3. Refresh page (F5)
4. All data should still be there
5. Check localStorage in DevTools:
   - Open DevTools
   - Go to Application > Local Storage
   - Find "appData" and "currentUser"
```

## Advanced Testing

### Form Validation
```
Sign Up Page:
- Email validation (try invalid email)
- Password strength (too short, no uppercase, etc.)
- Matching passwords
- Required fields

Login Page:
- Invalid email format
- Non-existent user
- Wrong password

Budget Page:
- Negative amounts
- Empty names
```

### Error Handling
```
1. Try breaking input with special characters
2. Test very large numbers
3. Test decimal precision
4. Verify error messages display
```

### Performance
```
1. Add 10 budgets
2. Add 20 transactions
3. Add 5 pots
4. Verify no lag or slowness
5. Check browser console for warnings
```

## Browser Console Checks

Should show:
- No red error messages
- No warnings about missing props
- No deprecated API warnings
- Clean console output

To check:
```
1. Press F12 to open DevTools
2. Go to Console tab
3. Should be clear or show only informational logs
4. No red X icons indicating errors
```

## Data Validation Tests

### Valid Inputs
```
Email: user@example.com
Password: StrongPass1
Numbers: 1000.50
Names: John O'Brien
```

### Invalid Inputs (should show errors)
```
Email: notanemail
Password: weak
Numbers: -1000
Money: 1000.999 (too many decimals)
```

## Feature Completeness Checklist

### Authentication (✅ Complete)
- [ ] Signup with validation
- [ ] Login functionality
- [ ] Logout functionality
- [ ] Profile view/edit
- [ ] Session persistence

### Dashboard (✅ Complete)
- [ ] Overview page loads
- [ ] Statistics calculate
- [ ] Recent transactions show
- [ ] Quick action cards work

### Budgets (✅ Complete)
- [ ] Create budget
- [ ] Edit budget
- [ ] Delete budget
- [ ] Progress bars display
- [ ] Data persists

### Pots (✅ Complete)
- [ ] Create pot
- [ ] Add money
- [ ] Withdraw money
- [ ] Progress updates
- [ ] Data persists

### Navigation (✅ Complete)
- [ ] All links work
- [ ] Sidebar minimize/expand
- [ ] Mobile bottom nav shows
- [ ] User menu dropdown works

### Responsive (✅ Complete)
- [ ] Desktop layout correct
- [ ] Tablet layout responsive
- [ ] Mobile layout correct
- [ ] Touch targets adequate

## Test Scenarios

### Scenario 1: New User Journey
```
1. Load app → redirects to login ✓
2. Sign up new account ✓
3. View empty dashboard ✓
4. Create first budget ✓
5. Create first pot ✓
6. View profile ✓
7. Edit profile ✓
8. Logout ✓
```

### Scenario 2: Data Persistence
```
1. Create multiple budgets/pots ✓
2. Refresh page ✓
3. Data still there ✓
4. Edit data ✓
5. Refresh again ✓
6. Updates persisted ✓
```

### Scenario 3: Error Recovery
```
1. Try invalid password ✓
2. See error message ✓
3. Try again with correct password ✓
4. Successfully login ✓
```

### Scenario 4: Responsive Mobile
```
1. Open on iPhone width ✓
2. Bottom nav visible ✓
3. Navigation works ✓
4. Add budget (mobile) ✓
5. Edit profile (mobile) ✓
```

## Known Limitations (Demo Features)

1. **Transactions**: Currently shows static data, ready for integration
2. **Recurring Bills**: Page structure ready for integration
3. **Charts**: Overview uses emoji indicators, can add charting library
4. **Storage**: Uses localStorage (not suitable for production)

## Performance Benchmarks

Expected Performance:
- Page load: < 2 seconds
- Navigation switch: < 500ms
- Form submission: < 1 second
- Data updates: instant

## Accessibility Testing

- [ ] Tab through form fields
- [ ] Form labels associated with inputs
- [ ] Error messages clear
- [ ] Buttons have proper focus states
- [ ] Color contrast adequate
- [ ] Mobile touch targets > 44px

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Sign Out and Security Tests

```
1. Login as user A
2. Create budget
3. Logout
4. Login as user B
5. Verify user B doesn't see user A's data
6. Create different budget
7. Logout and login as user A
8. Verify only user A's budgets show
```

## Success Criteria

All tests pass when:
- ✅ No console errors
- ✅ All features work as expected
- ✅ Responsive on all devices
- ✅ Data persists between sessions
- ✅ Forms validate properly
- ✅ Logout/login switches user data
- ✅ UI looks professional
- ✅ Performance is smooth

---

**Testing Status**: Ready for QA  
**Last Updated**: December 2024
