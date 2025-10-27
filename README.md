# 💰 Zeniwise - Student Budget Planner

A complete production-ready web application for students to manage their finances, track expenses, set savings goals, and maintain privacy from parents.

## ✨ Features

### 🌍 Multi-Currency Display
- Toggle between 5 currencies: ₹ INR, $ USD, € EUR, £ GBP, ¥ JPY
- Symbol-only change (no conversion) - numbers stay the same
- Persistent selection across sessions

### 💳 Transaction Management
- Add, edit, and delete income/expense transactions
- Categorized tracking (Food, Transport, Education, etc.)
- Real-time balance calculation
- Visual transaction history

### 🎯 Savings Goals
- Create and track multiple savings goals
- Progress visualization with animated bars
- Add funds to goals incrementally
- Completion celebration

### 🔒 Privacy Controls
- Students control what parents can see
- Toggle visibility for: Transactions, Goals, Balance
- Secure parent-student account linking
- Privacy-first design

### 👨‍👩‍👧 Parent Dashboard
- Read-only view of student finances
- Respects student privacy settings
- Link via unique student code
- Encourages financial responsibility

### 💡 AI Finance Tips
- Random financial advice generator
- Educational tips for better money habits
- Refreshable on-demand

### 📊 Data Visualization
- Expense breakdown pie charts
- Category-wise spending analysis
- Real-time statistics dashboard

### 🔌 Offline Support
- Works without internet connection
- localStorage-based data persistence
- Offline mode indicator banner
- Automatic sync when online

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Storage**: localStorage (offline-first)
- **Deployment**: Vercel / Replit ready

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Setup Steps

1. **Clone or download the project**
```bash
cd zeniwise
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"
   - Live in ~1 minute! 🎉

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration steps

### Deploy to Replit

1. **Create New Repl**
   - Go to [replit.com](https://replit.com)
   - Click "Create Repl"
   - Select "Next.js" template

2. **Upload Files**
   - Upload all project files
   - Or import from GitHub

3. **Run**
   - Click the "Run" button ▶️
   - Replit automatically installs dependencies
   - App is live with a public URL

4. **Always On (Optional)**
   - Upgrade to Replit Hacker plan
   - Enable "Always On" for 24/7 hosting

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Deploy**: Connect GitHub repo and deploy

## 📱 Usage Guide

### For Students

1. **Register/Login**
   - Choose "Student" role
   - Create account with email/password
   - Or use demo account

2. **Add Transactions**
   - Go to Transactions page
   - Click "+ Add Transaction"
   - Select Income or Expense
   - Fill in details and save

3. **Set Goals**
   - Go to Goals page
   - Click "+ New Goal"
   - Set target amount and deadline
   - Add funds as you save

4. **Privacy Settings**
   - Go to Privacy page
   - Toggle what parents can see
   - Share your account code with parents

5. **Currency Toggle**
   - Use dropdown in navigation
   - Switch between 5 currencies
   - All amounts update instantly

### For Parents

1. **Register/Login**
   - Choose "Parent" role
   - Create account

2. **Link to Student**
   - Get student's account code
   - Enter code on parent dashboard
   - View student's shared data

3. **Monitor Finances**
   - View transactions (if not hidden)
   - Track savings goals (if not hidden)
   - See balance (if not hidden)
   - Read-only access

## 🎨 Color Scheme

- **Primary**: `#6366F1` (Indigo)
- **Secondary**: `#10B981` (Green)
- **Accent**: `#F59E0B` (Amber)
- **Background**: `#F9FAFB` (Gray)

## 📂 Project Structure

```
zeniwise/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Auth page (login/register)
│   │   ├── dashboard/         # Student dashboard
│   │   ├── transactions/      # Transaction management
│   │   ├── goals/             # Savings goals
│   │   ├── privacy/           # Privacy controls
│   │   └── parent/            # Parent dashboard
│   ├── components/            # Reusable components
│   │   ├── CurrencySwitcher.tsx
│   │   ├── OfflineBanner.tsx
│   │   ├── Navigation.tsx
│   │   ├── StatCard.tsx
│   │   ├── TransactionCard.tsx
│   │   ├── GoalCard.tsx
│   │   ├── Charts.tsx
│   │   └── PrivacyToggle.tsx
│   ├── context/               # React Context providers
│   │   ├── CurrencyContext.tsx
│   │   └── AuthContext.tsx
│   ├── lib/                   # Utility functions
│   │   ├── utils.ts
│   │   ├── aiTips.ts
│   │   └── mockData.ts
│   └── types/                 # TypeScript types
│       └── index.ts
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local` for optional features:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
NEXTAUTH_SECRET=your_secret_key
```

Currently uses localStorage for demo purposes. Can be extended with Supabase for production.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register new student account
- [ ] Register new parent account
- [ ] Add income transaction
- [ ] Add expense transaction
- [ ] Edit transaction
- [ ] Delete transaction
- [ ] Create savings goal
- [ ] Add funds to goal
- [ ] Complete a goal
- [ ] Toggle currency (all 5 currencies)
- [ ] Toggle privacy settings
- [ ] Link parent to student account
- [ ] View as parent (with privacy on/off)
- [ ] Test offline mode (disconnect internet)
- [ ] Refresh AI tips
- [ ] Test responsive design (mobile/tablet/desktop)

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js, React, and Tailwind CSS
- Icons: Unicode Emoji
- Charts: Recharts library
- Animations: Framer Motion

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check documentation above
- Review code comments

---

**Made with ❤️ for students learning financial responsibility**

🌟 Star this repo if you find it helpful!
