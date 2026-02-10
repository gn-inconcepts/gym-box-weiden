# 🚀 Vercel Deployment & Custom Domain Setup

## ✅ Step 1: Initial Deployment (DONE!)

Your site is deployed at:
- **Preview**: https://gym-and-box-elu06hib8-gns-projects-59a4e1a8.vercel.app
- **Project Dashboard**: https://vercel.com/gns-projects-59a4e1a8/gym-and-box-new

---

## 📋 Step 2: Add Environment Variables

Go to your Vercel project dashboard and add these environment variables:

### **Required Variables**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-08
SANITY_API_TOKEN=your-sanity-write-token
RESEND_API_KEY=your-resend-api-key
```

### **Optional Variables** (for Instagram/Reviews)
```
INSTAGRAM_ACCESS_TOKEN=your-instagram-token
INSTAGRAM_USER_ID=your-instagram-user-id
GOOGLE_PLACES_API_KEY=your-google-api-key
GOOGLE_PLACE_ID=your-google-place-id
CRON_SECRET=any-random-string
```

### How to Add Variables in Vercel:

1. Go to: https://vercel.com/gns-projects-59a4e1a8/gym-and-box-new/settings/environment-variables

2. For each variable:
   - Click "Add New"
   - Enter **Key** (e.g., `RESEND_API_KEY`)
   - Enter **Value** (e.g., `re_123abc...`)
   - Select **All Environments** (Production, Preview, Development)
   - Click "Save"

3. After adding all variables, **redeploy**:
   - Go to Deployments tab
   - Click "..." on the latest deployment
   - Click "Redeploy"
   - Check "Use existing Build Cache" (optional)
   - Click "Redeploy"

---

## 🌐 Step 3: Custom Domain Setup

### Option A: Using Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/gns-projects-59a4e1a8/gym-and-box-new/settings/domains

2. Click **"Add Domain"**

3. Enter your domain: `gymandbox.at`

4. Click **"Add"**

5. Vercel will show you DNS records to add:

   **For Root Domain (gymandbox.at):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For WWW Subdomain (www.gymandbox.at):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

6. Add these DNS records at your domain registrar

7. Wait for DNS propagation (can take 1-48 hours, usually < 1 hour)

8. Vercel will automatically issue SSL certificate

---

### Option B: Using Vercel CLI

```bash
# Add domain
vercel domains add gymandbox.at

# Check domain status
vercel domains ls

# Verify domain is working
curl -I https://gymandbox.at
```

---

## 🔧 Step 4: Deploy Sanity Schemas

After environment variables are set, deploy Sanity schemas:

```bash
# Make sure you're in project directory
cd /Users/incon7/Projects/bernhard/gym-and-box-new

# Deploy schemas to Sanity Studio
npx sanity deploy
```

Or if you have Sanity CLI globally:
```bash
sanity deploy
```

---

## ✅ Step 5: Verify Deployment

### Check Your Site Works:
1. Visit: https://gymandbox.at (or Vercel preview URL)
2. Test navigation
3. Check mobile menu
4. Try theme toggle

### Test Contact Form:
1. Go to `/kontakt`
2. Fill out the form
3. Submit
4. Check email at `bernhard@personal-fitnesstrainer.at`

### Check SEO:
1. Visit: https://gymandbox.at/sitemap.xml
2. Visit: https://gymandbox.at/robots.txt
3. View page source - check for meta tags
4. Test: https://search.google.com/test/rich-results

---

## 🎯 Step 6: Optional Integrations

### Instagram Feed (Optional)
If you want to enable Instagram:

1. Get Instagram Access Token (see IMPLEMENTATION_GUIDE.md)
2. Add to Vercel environment variables
3. Sync posts:
   ```bash
   curl -X POST https://gymandbox.at/api/instagram/sync \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```

### Google Reviews (Optional)
If you want to enable Google Reviews:

1. Get Google Places API key (see IMPLEMENTATION_GUIDE.md)
2. Add to Vercel environment variables
3. Sync reviews:
   ```bash
   curl -X POST https://gymandbox.at/api/reviews/sync \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```

---

## 📊 Step 7: Set Up Cron Jobs (Optional)

For automated syncing, create `vercel.json` in project root:

```json
{
  "crons": [
    {
      "path": "/api/instagram/sync",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/reviews/sync",
      "schedule": "0 3 * * 0"
    }
  ]
}
```

Then commit and push:
```bash
git add vercel.json
git commit -m "Add cron jobs for Instagram and Google Reviews sync"
git push origin main
```

Vercel will automatically detect and set up the cron jobs.

---

## 🔍 Troubleshooting

### Domain Not Working?
- Check DNS records are correct
- Wait up to 48 hours for propagation
- Use https://www.whatsmydns.net to check DNS propagation
- Ensure @ record points to `76.76.21.21`
- Ensure www CNAME points to `cname.vercel-dns.com`

### Contact Form Not Working?
- Check `RESEND_API_KEY` is set in Vercel
- Verify domain is verified in Resend dashboard
- Check Vercel function logs for errors
- Test with: https://gymandbox.at/api/contact (should return 405)

### Build Failing?
- Check environment variables are set
- Look at build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Try clearing build cache and redeploying

### SSL Certificate Issues?
- Vercel automatically issues SSL
- Wait a few minutes after adding domain
- Check domain settings in Vercel dashboard
- Ensure DNS is properly configured

---

## 📱 Mobile Testing

Test your site on:
- Real iPhone/Android device
- Chrome DevTools mobile simulator
- Different screen sizes (375px, 768px, 1024px+)

---

## 🎉 Launch Checklist

Before going live:
- [ ] All environment variables added to Vercel
- [ ] Site redeployed after adding variables
- [ ] Custom domain added and DNS configured
- [ ] SSL certificate active (https:// works)
- [ ] Contact form tested and working
- [ ] Sanity schemas deployed
- [ ] Mobile responsiveness checked
- [ ] SEO verified (sitemap, meta tags)
- [ ] Instagram/Google integrations tested (if configured)
- [ ] Lighthouse audit run (score > 90)

---

## 🚀 Quick Commands

```bash
# Redeploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Open Vercel dashboard
vercel open

# Check domain status
vercel domains ls
```

---

## 📞 Need Help?

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Check build logs in Vercel dashboard
- Read IMPLEMENTATION_GUIDE.md for detailed setup

---

**Your site is deployed! 🎉**

Next step: Add environment variables and configure your custom domain!
