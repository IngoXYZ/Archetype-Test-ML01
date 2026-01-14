# 📧 MailerLite Custom Fields Guide

## Overview

When a user completes the archetype assessment, their results are automatically sent to MailerLite with **10 personalized custom fields**. These fields can be used in your email templates to create highly personalized content.

---

## 🔑 How It Works

### Step 1: User Completes Assessment
When a user finishes the 60-question assessment, the app:
1. Calculates their archetype scores
2. Identifies their dominant archetype and top 3 archetypes
3. Sends this data to MailerLite via API
4. **Automatically creates custom fields** in MailerLite (first time only)
5. Adds the user to your MailerLite group (ID: 176508406386918528)

### Step 2: Custom Fields Are Created
MailerLite automatically creates these fields when it receives the first submission:

| Field Name | Description | Example Value |
|------------|-------------|---------------|
| `name` | User's full name | "John Doe" |
| `archetype` | Dominant archetype | "The Sage" |
| `archetype_percent` | Percentage of dominant archetype | "32" |
| `test_date` | Date test was completed | "1/14/2026" |
| `archetype_1` | 1st place archetype | "The Sage" |
| `archetype_1_percent` | 1st place percentage | "32" |
| `archetype_2` | 2nd place archetype | "The Visionary" |
| `archetype_2_percent` | 2nd place percentage | "24" |
| `archetype_3` | 3rd place archetype | "The Builder" |
| `archetype_3_percent` | 3rd place percentage | "18" |

### Step 3: Use Fields in Email Templates
You can now use these fields in any MailerLite email template or automation.

---

## 🎨 Using Custom Fields in MailerLite

### Syntax
MailerLite uses curly braces with a dollar sign:
```
{$field_name}
```

### Examples

#### 1. **Personalized Greeting**
```html
<p>Hi {$name},</p>
```
**Output**: "Hi John Doe,"

#### 2. **Show Dominant Archetype**
```html
<h2>Your Dominant Archetype: {$archetype}</h2>
<p>With {$archetype_percent}% alignment</p>
```
**Output**: 
- "Your Dominant Archetype: The Sage"
- "With 32% alignment"

#### 3. **Display All Top 3 Archetypes**
```html
<h3>Your Top 3 Archetypes:</h3>
<ul>
  <li>1st: {$archetype_1} ({$archetype_1_percent}%)</li>
  <li>2nd: {$archetype_2} ({$archetype_2_percent}%)</li>
  <li>3rd: {$archetype_3} ({$archetype_3_percent}%)</li>
</ul>
```
**Output**:
- 1st: The Sage (32%)
- 2nd: The Visionary (24%)
- 3rd: The Builder (18%)

#### 4. **Test Completion Date**
```html
<p>You completed this assessment on {$test_date}</p>
```
**Output**: "You completed this assessment on 1/14/2026"

---

## 🔧 Advanced Usage: Conditional Content

MailerLite allows you to show different content based on custom field values.

### Example: Archetype-Specific Content

You can create different content blocks for each archetype:

```html
<!-- For The Sage -->
{$if archetype is "The Sage"}
  <h3>For The Sage</h3>
  <p>Your analytical mind is your greatest asset. Focus on:</p>
  <ul>
    <li>Sharing your knowledge through teaching</li>
    <li>Seeking truth in all business decisions</li>
    <li>Building systems for continuous learning</li>
  </ul>
{$endif}

<!-- For The Visionary -->
{$if archetype is "The Visionary"}
  <h3>For The Visionary</h3>
  <p>Your ability to see the future sets you apart. Focus on:</p>
  <ul>
    <li>Communicating your vision clearly</li>
    <li>Building teams to execute your ideas</li>
    <li>Balancing innovation with practicality</li>
  </ul>
{$endif}

<!-- Add blocks for all 12 archetypes -->
```

### Example: Percentage-Based Content

```html
{$if archetype_percent >= 40}
  <p>You have a <strong>very strong</strong> alignment with {$archetype}!</p>
{$else}
  <p>You have a <strong>moderate</strong> alignment with {$archetype}.</p>
  <p>This suggests you may blend multiple archetypes in your approach.</p>
{$endif}
```

---

## 📋 Step-by-Step: Creating a Personalized Email

### Option 1: Using the Web Editor

1. **Go to MailerLite Dashboard**
   - Navigate to **Campaigns** → **Email**
   - Click **Create Campaign**

2. **Choose Template**
   - Select a template or start from scratch
   - Click **Edit**

3. **Add Personalization**
   - Click where you want to add a custom field
   - Type `{$` and you'll see a dropdown of available fields
   - Select the field you want (e.g., `{$name}`, `{$archetype}`)

4. **Preview**
   - Click **Preview** to see how it looks with sample data
   - MailerLite will show you what real subscribers will see

5. **Save & Use**
   - Save your template
   - Use it in your automation or send as a campaign

### Option 2: Using HTML Templates

If you're comfortable with HTML:

1. **Create HTML File**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="UTF-8">
     <title>Your Archetype Results</title>
   </head>
   <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
     
     <h1>Hi {$name}! 👋</h1>
     
     <div style="background: #6366f1; color: white; padding: 20px; border-radius: 8px;">
       <h2>Your Dominant Archetype</h2>
       <h1>{$archetype}</h1>
       <p style="font-size: 24px;">{$archetype_percent}%</p>
     </div>
     
     <h3>Your Complete Top 3:</h3>
     <ol>
       <li><strong>{$archetype_1}</strong> - {$archetype_1_percent}%</li>
       <li><strong>{$archetype_2}</strong> - {$archetype_2_percent}%</li>
       <li><strong>{$archetype_3}</strong> - {$archetype_3_percent}%</li>
     </ol>
     
     <p><small>Test completed on {$test_date}</small></p>
     
   </body>
   </html>
   ```

2. **Import to MailerLite**
   - Go to **Campaigns** → **Email**
   - Click **Create Campaign**
   - Choose **Custom HTML**
   - Paste your HTML code
   - Save

---

## 🤖 Setting Up Automation

### Create an Automated Welcome Sequence

1. **Create Automation Workflow**
   - Go to **Automations** in MailerLite
   - Click **Create Workflow**
   - Name it: "Business Archetypes Welcome Sequence"

2. **Set Trigger**
   - **Trigger**: "Subscriber joins a group"
   - **Select Group**: "archetypen-test" (ID: 176508406386918528)
   - This means: automation starts immediately when someone completes the assessment

3. **Add Email 1: Immediate Results** (Delay: 0 minutes)
   - Subject: `Hi {$name}, Your Archetype is {$archetype}! 🎯`
   - Use the email template from `mailerlite_templates/email1_archetype_result.html`
   - This email shows their complete results

4. **Add Email 2: Archetype Guidance** (Delay: 3 days)
   - Subject: `{$name}, Understanding Your {$archetype} Type`
   - Use the email template from `mailerlite_templates/email2_archetype_guidance.html`
   - Provides deeper insights and introduces Shadow Work

5. **Add Email 3: Business Sovereignty** (Delay: 6 days total)
   - Subject: `How {$archetype} Can Build Business Sovereignty`
   - Use the email template from `mailerlite_templates/email3_business_sovereignty.html`
   - Connects their archetypes to business strategy

6. **Activate Workflow**
   - Review all emails
   - Click **Activate**
   - Done! 🎉

---

## 🧪 Testing

### Test the Integration

1. **Complete the Assessment**
   - Go to your deployed app
   - Complete the 60 questions
   - Use a test email address

2. **Check MailerLite**
   - Go to **Subscribers**
   - Find your test email
   - Click on it to view profile
   - You should see all 10 custom fields populated

3. **Test Automation**
   - If automation is active, you should receive:
     - Email 1: Immediately
     - Email 2: After 3 days
     - Email 3: After 6 days total

4. **Preview Variables**
   - In email editor, click **Preview**
   - MailerLite will show how the email looks with your data

---

## 📊 Viewing Custom Fields in MailerLite

### Where to Find Them

1. **Individual Subscriber View**
   - Go to **Subscribers**
   - Click on any subscriber who completed the test
   - Scroll to **Custom Fields** section
   - You'll see all 10 fields with their values

2. **Segment Builder**
   - Go to **Subscribers** → **Segments**
   - Click **Create Segment**
   - You can now filter by any custom field
   - Example: "Show all subscribers where `archetype` is `The Sage`"

3. **Email Template Editor**
   - When editing any email
   - Type `{$` and all custom fields appear in dropdown
   - Select any field to insert it

---

## 🎯 Best Practices

### 1. **Always Use Fallback Values**
In case a field is empty:
```html
<p>Hi {$name|default:"there"},</p>
```
If `name` is empty, it will show "Hi there,"

### 2. **Test Before Sending**
- Always preview emails with real subscriber data
- Send test emails to yourself first
- Check that all variables are displaying correctly

### 3. **Segment Your Audience**
Create segments for each archetype:
- "Sages" - where `archetype` is "The Sage"
- "Visionaries" - where `archetype` is "The Visionary"
- Send archetype-specific content to each segment

### 4. **Use Conditional Content**
- Show different CTAs based on archetype
- Adjust messaging based on percentage scores
- Create more relevant content for each subscriber

### 5. **Track Engagement**
- Monitor which archetypes have highest open rates
- See which segments convert best
- Use this data to refine your messaging

---

## 🔍 Troubleshooting

### Custom Fields Not Showing?

**Solution**: Fields are created when the first user completes the test.
- Complete the test once with any email
- Check MailerLite → Subscribers → View that subscriber
- Fields should now be visible

### Variables Showing as `{$name}` in Email?

**Solution**: Preview mode issue.
- In email editor, click **Preview**
- Select a real subscriber from dropdown
- Variables should now show actual values
- In sent emails, variables are always replaced

### Automation Not Triggering?

**Solution**: Check automation settings.
- Go to **Automations**
- Verify workflow is **Active** (not Draft)
- Check trigger is "Subscriber joins group"
- Verify correct Group ID: 176508406386918528

---

## 📚 Resources

### Your Email Templates
Pre-built templates ready to use:
- `mailerlite_templates/email1_archetype_result.html`
- `mailerlite_templates/email2_archetype_guidance.html`
- `mailerlite_templates/email3_business_sovereignty.html`

### MailerLite Documentation
- [Personalization Tags](https://www.mailerlite.com/help/how-to-use-personalization-tags)
- [Conditional Content](https://www.mailerlite.com/help/conditional-content)
- [Automation Workflows](https://www.mailerlite.com/help/automation-workflows)

### API Integration
The integration code is in:
- `/api/mailerlite.js` - Serverless function that sends data
- `js/app.js` - Frontend code that calls the API

---

## ✅ Quick Checklist

- [ ] Complete test assessment once to create custom fields
- [ ] Import the 3 email templates to MailerLite
- [ ] Create automation workflow with group trigger
- [ ] Add all 3 emails to workflow with appropriate delays
- [ ] Test with your own email address
- [ ] Verify custom fields appear in subscriber profile
- [ ] Verify emails use correct variables
- [ ] Activate automation
- [ ] Monitor first real submissions

---

**Your custom fields are automatically available after the first user completes the assessment. No manual setup required in MailerLite - the API creates them automatically!** ✨
