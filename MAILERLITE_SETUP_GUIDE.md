# 🚀 MailerLite Setup Guide - Business Archetypes

## ✅ Configuration Complete

### API Settings:
- **API Token:** Configured ✓
- **Group ID:** 176508406386918528 ✓
- **Language:** English ✓

## 📧 Email Templates Created

Three email templates have been created in the Shadow Work design style:

### Email 1: Archetype Assessment Results
**File:** `mailerlite_templates/email1_archetype_result.html`
**Purpose:** Welcome email with complete archetype results
**Timing:** Send immediately after test completion
**Content:**
- Personalized greeting with dominant archetype
- Complete Top 3 archetypes with percentages
- Introduction to shadow work concept
- Test completion date

### Email 2: Archetype Guidance & Shadow Work Intro
**File:** `mailerlite_templates/email2_archetype_guidance.html`
**Purpose:** Deep dive into their archetype + Shadow Work CTA
**Timing:** Send 2-3 days after Email 1
**Content:**
- Personalized archetype analysis
- Next steps for working with their archetype
- Shadow Work Starter Kit introduction
- Strong CTA to Shadow Work app

### Email 3: Business Sovereignty
**File:** `mailerlite_templates/email3_business_sovereignty.html`
**Purpose:** Business application + Shadow Work integration
**Timing:** Send 2-3 days after Email 2
**Content:**
- Personalized strategies for their archetype combination
- Business development, leadership, and strategic clarity
- Detailed Shadow Work journey overview
- Final CTA to begin Shadow Work

## 👨‍💻 Custom Fields Used in Templates

| Variable | MailerLite Syntax | Description |
|----------|-------------------|-------------|
| Name | `{$name}` | User's first name |
| Archetype | `{$archetype}` | Dominant archetype name |
| Archetype % | `{$archetype_percent}` | Dominant archetype percentage |
| Archetype 1 | `{$archetype_1}` | 1st archetype (same as dominant) |
| Archetype 1 % | `{$archetype_1_percent}` | 1st archetype percentage |
| Archetype 2 | `{$archetype_2}` | 2nd archetype |
| Archetype 2 % | `{$archetype_2_percent}` | 2nd archetype percentage |
| Archetype 3 | `{$archetype_3}` | 3rd archetype |
| Archetype 3 % | `{$archetype_3_percent}` | 3rd archetype percentage |
| Test Date | `{$test_date}` | Date of test completion |

## 🛠️ MailerLite Setup Steps

### Step 1: Import Email Templates

1. **Go to MailerLite** → **Campaigns** → **Email**
2. **Click "Create campaign"** → **"Email"**
3. For each template:
   - Click **"Rich text"** or **"Custom HTML"**
   - **Paste the HTML** from the template files
   - **Save as template**
   - Name it: "Archetype Email 1", "Archetype Email 2", "Archetype Email 3"

### Step 2: Create Automation Workflow

1. **Go to MailerLite** → **Automations** → **Create workflow**
2. **Choose trigger:** "Subscriber joins a group"
3. **Select group:** Your group (ID: 176508406386918528)
4. **Click "Continue"**

### Step 3: Build Email Sequence

#### Email 1: Archetype Results (Immediate)
1. **Add action:** "Send email"
2. **Delay:** 0 minutes (immediate)
3. **Subject:** "🎯 Your {$archetype} Archetype Results Are Here"
4. **Select template:** "Archetype Email 1"
5. **Save**

#### Email 2: Shadow Work Introduction (Day 3)
1. **Add delay:** 3 days after previous email
2. **Add action:** "Send email"
3. **Subject:** "Understanding Your {$archetype} Archetype + Next Steps"
4. **Select template:** "Archetype Email 2"
5. **Save**

#### Email 3: Business Sovereignty (Day 6)
1. **Add delay:** 3 days after previous email
2. **Add action:** "Send email"
3. **Subject:** "{$archetype} → Business Sovereignty: Your Path Forward"
4. **Select template:** "Archetype Email 3"
5. **Save**

### Step 4: Activate Automation

1. **Review your workflow:**
   - Trigger: Joins group 176508406386918528
   - Email 1: Immediate
   - Email 2: Day 3
   - Email 3: Day 6
2. **Click "Activate"**
3. **Done!** 🎉

## 📋 Alternative Subject Lines (A/B Testing)

### Email 1 Alternatives:
- "🎯 Your Business Archetype: {$archetype} ({$archetype_percent}%)"
- "Hey {$name}, Your Archetype Assessment Results"
- "Discover Your {$archetype} Leadership Style"

### Email 2 Alternatives:
- "Day 2: What Your {$archetype} Archetype Means for Your Business"
- "{$name}, Here's How to Work with Your {$archetype} Energy"
- "Your {$archetype} Shadow: The Key to Your Next Level"

### Email 3 Alternatives:
- "From {$archetype} to Sovereignty: Your Integration Path"
- "Unlock Your {$archetype} Power Through Shadow Work"
- "{$name}, Transform Your {$archetype} Patterns into Strengths"

## 🎯 Testing Checklist

- [ ] API Token configured in code
- [ ] Group ID configured in code
- [ ] Code deployed to Vercel
- [ ] All 3 email templates imported to MailerLite
- [ ] Custom fields verified in MailerLite
- [ ] Automation workflow created
- [ ] Emails added to workflow with correct delays
- [ ] Automation activated
- [ ] Test with your own email address
- [ ] Verify all personalization variables populate correctly
- [ ] Check all CTAs link to https://shadow-work.abacusai.app

## 🔧 Customization Options

### Logo:
Replace the h1 heading in each template with your logo:
```html
<img src="YOUR_LOGO_URL" alt="Business Archetypes" style="max-width: 280px; height: auto;" />
```

### Shadow Work Link:
Current CTA links to: `https://shadow-work.abacusai.app`
Update if you have a different URL.

### Brand Colors:
- Primary: `#1A9A9A` (Teal)
- Background: `#363940` (Dark Gray)
- Text: `#e0e0e0` (Light Gray)
- Accent boxes: `#2a2d33` (Darker Gray)

You can search and replace these hex codes to match your brand.

## 📊 Performance Tracking

### Key Metrics to Watch:
1. **Open Rates:**
   - Email 1: Target >30% (high - they just completed test)
   - Email 2: Target >25%
   - Email 3: Target >20%

2. **Click Rates:**
   - Shadow Work CTA in Email 2: Target >5%
   - Shadow Work CTA in Email 3: Target >8%

3. **Conversion:**
   - Track visits to shadow-work.abacusai.app
   - Track signups/purchases from this sequence

### MailerLite Analytics:
- **Dashboard** → **Automations** → Select your workflow
- View opens, clicks, and conversions per email
- Identify drop-off points
- A/B test different subject lines and CTAs

## ✨ Pro Tips

1. **Personalization:** The templates use extensive personalization. Make sure all custom fields are populated from your test.

2. **Timing:** The 3-day delays work well for engagement. Adjust if you see drop-off.

3. **Segmentation:** Later, you can create archetype-specific sequences by adding conditional logic based on the `{$archetype}` field.

4. **Mobile Optimization:** All templates are mobile-responsive. Preview on mobile before sending.

5. **Shadow Work Context:** The templates assume familiarity with shadow work concepts. Adjust language if your audience is new to Jung.

## 🚀 Ready to Launch!

Your MailerLite integration is complete and ready to automatically nurture your archetype test takers toward the Shadow Work Starter Kit.

Every test completion will now trigger a personalized 3-email sequence designed to educate, engage, and convert. 🎉
