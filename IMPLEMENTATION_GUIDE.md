# Implementation Guide

This guide covers all the improvements made to the GYM & BOX website and how to complete the setup.

## 🎯 What's Been Implemented

### ✅ Phase 1: CMS Foundation
- **New Sanity Schemas**: 5 new content types (page-content, site-settings, review, instagram-post, media-asset)
- **Extended Schemas**: Enhanced trainer, service, and pricing schemas with additional fields
- All schemas registered in `sanity/schema.ts`

### ✅ Phase 2: Content Updates
- Fixed typo: "Jetz" → "Jetzt"
- Updated space size: "1.000m²" → "500 m²" throughout site
- Updated tagline from "Athlet des Lebens" to "Gesundheit ist Alles"
- Removed all FMS Testing references
- Updated pricing: €20/€30 analysis, €57/€147 training
- Changed registration fee: €50 → €57 "Startpaket Small"
- Added equipment brands: Eleiko, Gym80, Hammer Strength, Cross Axes Tech, Precor

### ✅ Phase 3: Contact Form
- Fully functional contact form with validation
- Email sending via Resend API
- Auto-reply to customers
- Spam protection (honeypot + rate limiting)
- Success/error message handling

### ✅ Phase 4: SEO Optimization
- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration
- Comprehensive meta tags (Open Graph, Twitter Cards)
- Structured data (LocalBusiness, Organization schemas)
- Enhanced metadata in layout

### ✅ Phase 5: Accessibility
- Skip-to-content link for keyboard navigation
- ARIA labels on interactive elements
- Improved focus states
- Semantic HTML structure
- Mobile menu accessibility

### ✅ Phase 6: Social Integrations
- **Instagram Feed**: API integration with caching in Sanity
- **Google Reviews**: Weekly reveal strategy (1 review per week)
- Fallback content when APIs not configured
- Optimized loading states

### ✅ Phase 7: Performance
- Theme toggle with localStorage persistence
- Optimized image component with blur placeholders
- Optimized video component with lazy loading
- Intersection Observer for lazy loading

---

## 🚀 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Sanity CMS (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-08
SANITY_API_TOKEN=your-write-token

# Email (Required for contact form)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Instagram (Optional)
INSTAGRAM_ACCESS_TOKEN=your-instagram-access-token
INSTAGRAM_USER_ID=your-instagram-user-id

# Google Reviews (Optional)
GOOGLE_PLACES_API_KEY=your-google-api-key
GOOGLE_PLACE_ID=your-google-place-id

# Cron Secret (for webhook security)
CRON_SECRET=generate-random-string-here
```

### 2. Sanity Studio Setup

Deploy the new schemas to your Sanity Studio:

```bash
# Navigate to your project
cd /path/to/gym-and-box-new

# Deploy schemas
npx sanity deploy
```

Or if you have the Sanity CLI installed globally:

```bash
sanity deploy
```

### 3. Resend Email Setup

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your domain OR use their testing domain
4. Create an API key
5. Add the API key to `.env.local`

**Important**: Update the "from" email in `/app/api/contact/route.ts`:
```typescript
from: 'GYM & BOX Website <noreply@your-verified-domain.com>',
```

### 4. Instagram Setup (Optional)

To enable Instagram feed:

1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. Add Instagram Basic Display product
3. Configure OAuth redirect URI
4. Generate a User Access Token
5. Add to `.env.local`

**Note**: Instagram tokens expire every 60 days. Set a reminder to refresh.

### 5. Google Reviews Setup (Optional)

To enable Google Reviews:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "Places API"
4. Create credentials (API key)
5. Find your Place ID using [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
6. Add both to `.env.local`

### 6. Sync Content

After setting up APIs, sync initial content:

```bash
# Sync Instagram posts
curl -X POST http://localhost:3000/api/instagram/sync \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# Sync Google reviews
curl -X POST http://localhost:3000/api/reviews/sync \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 7. Set Up Cron Jobs (Production)

For automated daily syncing, set up cron jobs on Vercel:

1. Create `vercel.json` in project root:

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

2. Add `CRON_SECRET` to Vercel environment variables
3. Deploy to Vercel

---

## 📱 Mobile Responsiveness Checklist

Test on these breakpoints:
- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1024px+)

Key areas to verify:
- [ ] Navigation menu opens/closes correctly
- [ ] Hero section displays properly
- [ ] Contact form is usable
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal scroll
- [ ] Images load correctly
- [ ] Videos don't cause layout shift

---

## 🎨 Using New Components

### Instagram Feed

Add to homepage:

```tsx
import { InstagramFeed } from "@/components/home/instagram-feed";

<InstagramFeed />
```

### Google Reviews

Add to homepage:

```tsx
import { GoogleReviews } from "@/components/home/google-reviews";

<GoogleReviews />
```

### Optimized Images

```tsx
import { OptimizedImage } from "@/components/ui/optimized-image";

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  fill
  priority={false}
/>
```

### Optimized Videos

```tsx
import { OptimizedVideo } from "@/components/ui/optimized-video";

<OptimizedVideo
  src="/path/to/video.mp4"
  poster="/path/to/poster.jpg"
  autoPlay={true}
  loop={true}
  lazy={true}
/>
```

---

## 🧪 Testing

### Test Contact Form

1. Fill out the contact form at `/kontakt`
2. Check email inbox for confirmation
3. Verify email to `bernhard@personal-fitnesstrainer.at` was received

### Test Instagram Feed

1. Configure Instagram credentials
2. Run sync endpoint
3. Visit homepage
4. Verify posts display correctly

### Test Google Reviews

1. Configure Google Places API
2. Run sync endpoint
3. Visit homepage
4. Verify reviews display with star ratings

### Test Accessibility

1. Use keyboard Tab to navigate
2. Press "/" to skip to content
3. Test with screen reader
4. Check color contrast with DevTools

### Test SEO

1. Visit `/sitemap.xml`
2. Visit `/robots.txt`
3. Check meta tags in page source
4. Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 🐛 Troubleshooting

### Contact Form Not Sending

- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for sending domain verification
- Update "from" email in `/app/api/contact/route.ts`

### Instagram Feed Empty

- Verify `INSTAGRAM_ACCESS_TOKEN` is valid
- Check token hasn't expired (60-day limit)
- Run `/api/instagram/sync` manually
- Check browser console for errors

### Google Reviews Not Showing

- Verify `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`
- Ensure Places API is enabled in Google Cloud Console
- Check API quotas haven't been exceeded
- Verify reviews have `publishedAt` date in the past

### Sanity Schemas Not Showing

- Run `npx sanity deploy` to push schema changes
- Clear Sanity Studio cache
- Refresh Studio browser window

---

## 📊 Performance Checklist

Run Lighthouse audit and aim for:
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 90
- [ ] SEO: > 95

Optimize if needed:
- [ ] Images are WebP format
- [ ] Videos have poster images
- [ ] Lazy loading is enabled
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast TTI (< 3s on 3G)

---

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Protect API routes with `CRON_SECRET`
- Rate limit contact form (already implemented)
- Use honeypot for spam protection (already implemented)
- Keep dependencies updated

---

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Resend Documentation](https://resend.com/docs)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

---

## 🎉 Launch Checklist

Before going live:
- [ ] All environment variables set in Vercel
- [ ] Sanity schemas deployed
- [ ] Contact form tested
- [ ] SEO meta tags verified
- [ ] Mobile responsiveness checked
- [ ] Lighthouse audit passed
- [ ] Instagram/Google integrations tested (or disabled)
- [ ] Analytics configured
- [ ] Domain connected
- [ ] SSL certificate active

---

Need help? Check the implementation files or contact the development team.
