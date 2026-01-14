# 🎯 Business Archetypes Assessment - Static Version

> A fully static web application for assessing business leadership archetypes with automated email follow-up via MailerLite.

## 📋 Overview

This is a pure static HTML/CSS/JavaScript application that:
- ✅ Runs a comprehensive archetype assessment (185 questions)
- ✅ Calculates and displays personalized results
- ✅ Sends results via EmailJS
- ✅ Integrates with MailerLite for automated email sequences
- ✅ Works as a Progressive Web App (PWA)
- ✅ Deploys to Vercel with serverless functions

## 🚀 Quick Start

### Prerequisites
- Vercel account
- EmailJS account (for sending results)
- MailerLite account (for email automation)

### Deployment

```bash
# Clone the repository
git clone <your-repo-url>
cd archetypen_static

# Deploy to Vercel
vercel --prod
```

### Environment Variables (Vercel)

No environment variables needed! The MailerLite API token is embedded in the serverless function for simplicity.

## 📁 Project Structure

```
archetypen_static/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── vercel.json            # Vercel configuration
├── api/
│   ├── mailchimp.js       # Mailchimp serverless function (legacy)
│   └── mailerlite.js      # MailerLite serverless function ✅
├── js/
│   ├── app.js             # Main application logic
│   ├── archetypen.js      # Archetype definitions
│   └── questions.js       # 185 assessment questions
├── mailerlite_templates/   # Email templates for MailerLite
│   ├── email1_archetype_result.html
│   ├── email2_archetype_guidance.html
│   └── email3_business_sovereignty.html
└── [Documentation files].md
```

## 🎨 Features

### Assessment
- **185 Questions**: Comprehensive archetype profiling
- **12 Archetypes**: The Sage, The Visionary, The Builder, etc.
- **Progress Tracking**: Visual progress bar
- **Backward Navigation**: Users can review previous answers

### Email Integration

#### EmailJS (Immediate Results)
- Sends detailed results immediately after test completion
- Includes top 3 archetypes with full descriptions
- Emails both user and owner

#### MailerLite (Automated Sequence)
- **Email 1** (Immediate): Complete archetype results
- **Email 2** (+3 days): Archetype guidance + Shadow Work intro
- **Email 3** (+6 days): Business sovereignty strategies + CTA

### Data Sent to MailerLite

| Field | Description |
|-------|-------------|
| `name` | User's first name |
| `archetype` | Dominant archetype name |
| `archetype_percent` | Dominant archetype percentage |
| `test_date` | Test completion date (en-US format) |
| `archetype_1` | 1st archetype (same as dominant) |
| `archetype_1_percent` | 1st percentage |
| `archetype_2` | 2nd archetype |
| `archetype_2_percent` | 2nd percentage |
| `archetype_3` | 3rd archetype |
| `archetype_3_percent` | 3rd percentage |

## 📧 Setting Up MailerLite Automation

See **[MAILERLITE_SETUP_GUIDE.md](./MAILERLITE_SETUP_GUIDE.md)** for complete instructions.

**Quick Steps:**
1. Import the 3 email templates from `mailerlite_templates/`
2. Create automation triggered by Group ID: `176508406386918528`
3. Add 3 emails with delays: 0 days, +3 days, +6 days
4. Activate automation

## 🔧 Configuration

### EmailJS Setup

Edit `js/app.js` and update:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    ownerTemplateId: 'YOUR_OWNER_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
    ownerEmail: 'your@email.com'
};
```

### MailerLite API Token

The API token is already configured in `api/mailerlite.js`:

```javascript
const MAILERLITE_API_KEY = 'your_token_here';
const MAILERLITE_GROUP_ID = '176508406386918528';
```

## 🌍 Deployment Platforms

### Vercel (Recommended)
```bash
vercel --prod
```

### Netlify
1. Connect your Git repository
2. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
3. Deploy

### GitHub Pages
```bash
git push origin main
# Enable GitHub Pages in repository settings
```

## 📖 Documentation

- **[MAILERLITE_SETUP_GUIDE.md](./MAILERLITE_SETUP_GUIDE.md)**: Complete MailerLite setup instructions
- **[MAILERLITE_INTEGRATION.md](./MAILERLITE_INTEGRATION.md)**: Technical integration details
- **[MIGRATION_MAILCHIMP_TO_MAILERLITE.md](./MIGRATION_MAILCHIMP_TO_MAILERLITE.md)**: Migration guide
- **[COMPLETE_CONFIG_GUIDE.md](./COMPLETE_CONFIG_GUIDE.md)**: Full configuration guide

## 🎯 12 Business Archetypes

1. **The Sage** (Der Weise) - Wisdom & Knowledge
2. **The Visionary** (Der Visionär) - Innovation & Future
3. **The Builder** (Der Erbauer) - Structure & Systems
4. **The Guardian** (Der Hüter) - Stability & Security
5. **The Sovereign** (Der Herrscher) - Authority & Leadership
6. **The Diplomat** (Der Diplomat) - Relationships & Harmony
7. **The Catalyst** (Der Katalysator) - Change & Transformation
8. **The Explorer** (Der Entdecker) - Discovery & Adventure
9. **The Alchemist** (Der Alchemist) - Transformation & Magic
10. **The Healer** (Der Heiler) - Care & Support
11. **The Warrior** (Der Krieger) - Action & Achievement
12. **The Artisan** (Der Handwerker) - Craft & Excellence

## 🛠️ Technology Stack

- **Frontend**: Pure HTML, CSS (Tailwind CDN), JavaScript
- **Email**: EmailJS for immediate results
- **Marketing Automation**: MailerLite API v2
- **Serverless Functions**: Vercel Serverless Functions
- **PWA**: Service Worker + Manifest
- **Deployment**: Vercel (or Netlify/GitHub Pages)

## 🔒 CORS & Security

Direct frontend calls to MailerLite API cause CORS errors. This is why we use a Vercel Serverless Function (`api/mailerlite.js`) as a secure proxy.

**Benefits:**
- ✅ No CORS issues
- ✅ API key hidden from frontend
- ✅ Secure server-side requests
- ✅ Error handling on server

## 📊 Testing

1. **Local Testing**: Open `index.html` in browser (EmailJS will work, MailerLite won't due to CORS)
2. **Production Testing**: Deploy to Vercel and test with real email
3. **MailerLite Verification**: Check MailerLite dashboard for new subscriber with custom fields

## 🐛 Troubleshooting

### MailerLite not receiving data
1. Check Vercel function logs
2. Verify API token in `api/mailerlite.js`
3. Confirm Group ID is correct
4. Test API endpoint directly: `POST /api/mailerlite`

### EmailJS not sending
1. Verify `EMAILJS_CONFIG` in `js/app.js`
2. Check EmailJS dashboard for quota limits
3. Ensure template IDs match

### Emails not triggering automation
1. Verify automation is "Active" in MailerLite
2. Check trigger is set to Group ID: `176508406386918528`
3. Confirm subscriber was added to group (check MailerLite dashboard)

## 📝 License

Proprietary - All rights reserved.

## 👤 Author

**Ingo - The Small Reset**
- Website: [https://shadow-work.abacusai.app](https://shadow-work.abacusai.app)

## 🙏 Credits

Built with guidance from Carl Jung's archetype theory and shadow work principles.

---

**Ready to deploy?** Push to Git and deploy to Vercel! 🚀
