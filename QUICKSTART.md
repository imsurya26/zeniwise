# 🚀 Zeniwise - Quick Start Guide

## ⚡ Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
```
http://localhost:3000
```

## 🎯 First Time Setup

### Create Student Account
1. Open http://localhost:3000
2. Click "Register" tab
3. Select "🎓 Student" role
4. Enter your details:
   - Name: Your Name
   - Email: student@example.com
   - Password: password123
5. Click "Register"

### Add Your First Transaction
1. Navigate to "Transactions" page
2. Click "+ Add Transaction"
3. Select "Expense" or "Income"
4. Choose a category
5. Enter amount and description
6. Click "Add Transaction"

### Create a Savings Goal
1. Navigate to "Goals" page
2. Click "+ New Goal"
3. Enter goal details:
   - Title: "New Laptop"
   - Target Amount: 50000
   - Target Date: Pick a future date
4. Click "Create Goal"
5. Click "Add Funds" to save towards it

### Try Currency Toggle
1. Look at the top navigation bar
2. Find the currency dropdown (shows "₹ INR" by default)
3. Click and select different currencies
4. Watch all amounts update instantly!

### Set Privacy Controls
1. Navigate to "Privacy" page
2. Toggle what parents can see:
   - Hide Transactions
   - Hide Goals
   - Hide Balance
3. Copy your account code to share with parents

### Parent Account (Optional)
1. Logout from student account
2. Register as "👨‍👩‍👧 Parent"
3. Enter the student's account code
4. View student's shared financial data

## 🎨 Features to Explore

### 💡 AI Finance Tips
- Look for the blue banner on dashboard
- Click "New Tip" button for fresh advice
- Get smart financial recommendations

### 📊 Expense Charts
- View pie chart breakdown by category
- See spending patterns
- Track where your money goes

### 🔌 Offline Mode
1. Disconnect from internet
2. Yellow banner appears at top
3. Continue using the app
4. Data saves to localStorage
5. Reconnect - everything syncs!

### 📱 Mobile Responsive
- Open on your phone
- Fully responsive design
- Touch-friendly interface
- Works on all screen sizes

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts - done in 1 minute!
```

## 📝 Demo Credentials

### Student Account
- Email: student@test.com
- Password: (any password)
- Role: Student

### Parent Account
- Email: parent@test.com
- Password: (any password)
- Role: Parent
- Student Code: (get from student's privacy page)

## 🎓 Learning Path

1. ✅ Register and login
2. ✅ Add 5 different transactions
3. ✅ Create 2 savings goals
4. ✅ Add funds to goals
5. ✅ Try all 5 currencies
6. ✅ Set privacy controls
7. ✅ Link parent account
8. ✅ Test offline mode
9. ✅ Explore charts and stats
10. ✅ Get AI finance tips

## 🐛 Common Issues

### Port 3000 in use?
```bash
npm run dev -- -p 3001
```

### Build errors?
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Can't see changes?
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Restart dev server

## 💡 Pro Tips

1. **Currency Toggle**: Changes symbol only, not values
2. **Privacy First**: Students control all visibility
3. **Offline Ready**: Works without internet
4. **Mobile Friendly**: Use on any device
5. **No Backend Needed**: All data in localStorage

## 🎉 You're Ready!

Start managing your finances like a pro with Zeniwise!

Questions? Check the main README.md for detailed documentation.

---

**Happy Budgeting! 💰**
