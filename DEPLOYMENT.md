# 🚀 Zeniwise - Deployment Guide

Complete guide to deploy Zeniwise to production on Vercel or Replit.

---

## 🌐 Option 1: Deploy to Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js.

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Step-by-Step Deployment

#### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Zeniwise student budget planner"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/zeniwise.git
git branch -M main
git push -u origin main
```

#### 2. Deploy on Vercel

**Method A: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Click "Deploy"
6. Wait ~1 minute
7. Your app is live! 🎉

**Method B: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? zeniwise
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### 3. Custom Domain (Optional)

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (~24 hours max)

### Vercel Features You Get

✅ **Automatic HTTPS** - SSL certificate included  
✅ **Global CDN** - Fast worldwide  
✅ **Automatic Deployments** - Push to GitHub = auto-deploy  
✅ **Preview Deployments** - Every PR gets a preview URL  
✅ **Instant Rollbacks** - One-click rollback to previous versions  
✅ **Analytics** - Built-in performance monitoring  
✅ **Zero Configuration** - Works out of the box  

### Environment Variables (Optional)

If you add backend features later:

1. Go to Project Settings → Environment Variables
2. Add variables:
   ```
   SUPABASE_URL=your_url
   SUPABASE_ANON_KEY=your_key
   NEXTAUTH_SECRET=your_secret
   ```
3. Redeploy for changes to take effect

---

## 🔧 Option 2: Deploy to Replit

Replit is great for quick hosting and live coding.

### Step-by-Step Deployment

#### 1. Create New Repl

**Method A: Import from GitHub**

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Paste your repository URL
5. Click "Import from GitHub"

**Method B: Upload Files**

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl"
3. Select "Next.js" template
4. Name it "zeniwise"
5. Delete default files
6. Upload all your project files

#### 2. Configure Replit

Replit should auto-detect Next.js. Verify these settings:

**`.replit` file** (create if not exists):
```toml
run = "npm run dev"
entrypoint = "src/app/page.tsx"

[nix]
channel = "stable-22_11"

[deployment]
run = ["npm", "run", "start"]
build = ["npm", "run", "build"]
```

**`replit.nix` file** (create if not exists):
```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript
    pkgs.nodePackages.npm
  ];
}
```

#### 3. Run the App

1. Click the "Run" button ▶️
2. Replit will:
   - Install dependencies automatically
   - Build the project
   - Start the development server
3. Your app opens in the Replit webview
4. Get a public URL like: `https://zeniwise.username.repl.co`

#### 4. Deploy to Production (Optional)

For 24/7 hosting:

1. Click "Deploy" button
2. Choose deployment type:
   - **Autoscale**: Scales with traffic (paid)
   - **Reserved VM**: Always on (paid)
   - **Static**: For static sites (free)
3. For this app, choose "Autoscale" or "Reserved VM"
4. Click "Deploy"
5. Get a permanent production URL

### Replit Features

✅ **Instant Setup** - No configuration needed  
✅ **Live Coding** - Edit and see changes instantly  
✅ **Built-in IDE** - Code editor included  
✅ **Collaboration** - Invite others to code together  
✅ **Always On** - Keep app running 24/7 (paid)  
✅ **Public URL** - Shareable link immediately  

### Replit Tips

- **Free Tier**: App sleeps after inactivity
- **Hacker Plan** ($7/mo): Always-on, faster, more storage
- **Secrets**: Use "Secrets" tab for environment variables
- **Database**: Can add Replit Database if needed

---

## 🐳 Option 3: Deploy with Docker

For custom hosting solutions.

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  zeniwise:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t zeniwise .

# Run container
docker run -p 3000:3000 zeniwise

# Or use docker-compose
docker-compose up -d
```

---

## ☁️ Option 4: Other Platforms

### Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway

1. Connect GitHub repository
2. Railway auto-detects Next.js
3. Click "Deploy"
4. Get a `.railway.app` URL

### Render

1. Create new "Web Service"
2. Connect GitHub repository
3. Settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Deploy

### DigitalOcean App Platform

1. Create new app
2. Connect GitHub repository
3. Select Next.js
4. Deploy

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Remove console.log statements
- [ ] Set up proper environment variables
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Add rate limiting if using APIs
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure CORS if needed
- [ ] Review localStorage security
- [ ] Test on multiple devices
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test offline functionality

---

## 📊 Post-Deployment

### Monitor Your App

**Vercel Analytics**
- Go to your project → Analytics
- View page views, performance, etc.

**Google Analytics** (Optional)
Add to `src/app/layout.tsx`:
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
```

### Performance Optimization

1. **Enable Caching**
   - Vercel does this automatically
   - Configure cache headers if needed

2. **Image Optimization**
   - Use Next.js `<Image>` component
   - Already optimized on Vercel

3. **Bundle Analysis**
```bash
npm install @next/bundle-analyzer
```

### Continuous Deployment

**Automatic Deployments**
- Push to `main` branch → auto-deploy to production
- Push to other branches → preview deployments
- Pull requests → preview URLs

**Manual Deployments**
```bash
# Vercel
vercel --prod

# Or trigger from GitHub Actions
```

---

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: Out of memory**
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**localStorage not defined**
- Already handled with `typeof window` checks
- Ensure all localStorage calls are client-side only

**Hydration errors**
- Check for mismatched HTML between server and client
- Use `"use client"` directive where needed

### Deployment Issues

**Vercel deployment stuck**
- Check build logs
- Verify all dependencies are in package.json
- Ensure no syntax errors

**Replit not starting**
- Check `.replit` configuration
- Verify Node version compatibility
- Check for port conflicts

---

## 📈 Scaling

### When Your App Grows

**Database Migration**
- Move from localStorage to Supabase/Firebase
- Add user authentication with NextAuth
- Implement server-side API routes

**Performance**
- Add Redis caching
- Implement CDN for assets
- Use database indexing

**Features**
- Add email notifications
- Implement data export
- Add multi-user support
- Create mobile apps

---

## 🎉 Success!

Your Zeniwise app is now live and accessible worldwide!

**Share your deployment:**
- Tweet about it
- Share with friends
- Add to your portfolio
- Submit to product directories

**Next Steps:**
1. Test all features in production
2. Share the URL with users
3. Gather feedback
4. Iterate and improve

---

## 📞 Support

**Deployment Issues:**
- Vercel: [vercel.com/support](https://vercel.com/support)
- Replit: [replit.com/support](https://replit.com/support)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

**Community:**
- Next.js Discord
- Vercel Discord
- Stack Overflow

---

**Happy Deploying! 🚀**

Your production-ready Zeniwise app is ready to help students worldwide manage their finances!
