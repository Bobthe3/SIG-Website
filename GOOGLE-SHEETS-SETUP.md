# 🔄 Google Sheets Automation Setup Guide

This guide will walk you through setting up automatic member data syncing from Google Sheets and photo management through Google Drive.

## 🎯 What This System Does

### ✅ **Automatic Member Updates**
- 📊 Reads member data directly from Google Sheets
- 📸 Pulls photos automatically from Google Drive
- 🔄 Updates website every 30 minutes
- ⚡ Instant updates when you manually trigger sync
- 🚫 **Zero code editing required** for your marketing team!

### 🔄 **Workflow for Your Team**
1. **Marketing team updates Google Sheet** with new members
2. **Uploads photos to designated Google Drive folder**
3. **Website automatically syncs** within 30 minutes
4. **Members appear on website** with correct photos

---

## 📋 Step 1: Set Up Google Sheets

### 1.1 Create Your Member Database Sheet

Create a new Google Sheet with these exact tabs:

#### **Executive Board Tab:**
| Name | Role | Major | Year | Photo Filename | LinkedIn URL |
|------|------|-------|------|----------------|--------------|
| Sarah Chen | President | Economics & Environmental Studies | Senior | sarah-chen.jpg | https://linkedin.com/in/sarah-chen |
| Marcus Rodriguez | Vice President | Finance & Data Science | Junior | marcus-rodriguez.jpg | https://linkedin.com/in/marcus-rodriguez |

#### **General Members Tab:**
| Name | Major | Year | Interest | Photo Filename | Category |
|------|-------|------|----------|----------------|----------|
| Alexandra Kim | International Business | Senior | ESG Research | alexandra-kim.jpg | senior |
| Robert Johnson | Economics | Senior | Impact Investing | robert-johnson.jpg | senior |

#### **Alumni Tab:**
| Name | Current Role | Company | Graduation Year | Photo Filename | LinkedIn URL |
|------|--------------|---------|-----------------|----------------|--------------|
| Jessica Wang | ESG Analyst | BlackRock | Class of 2023 | jessica-wang.jpg | https://linkedin.com/in/jessica-wang |

### 1.2 Share Your Sheet
- Click "Share" in top-right corner
- Set to "Anyone with the link can view"
- Copy the share link - you'll need the ID from it

### 1.3 Get Your Spreadsheet ID
From URL like: `https://docs.google.com/spreadsheets/d/1ABC123xyz789/edit`
Your Spreadsheet ID is: `1ABC123xyz789`

---

## 📂 Step 2: Set Up Google Drive Photo Folder

### 2.1 Create Photo Folder
1. Go to Google Drive
2. Create new folder named "SIG Member Photos"
3. Upload all member photos here
4. **Important**: Photo filenames must match exactly what's in your spreadsheet

### 2.2 Share the Folder
1. Right-click folder → "Share"
2. Set to "Anyone with the link can view"
3. Copy folder ID from URL

### 2.3 Photo Naming Convention
- Format: `firstname-lastname.jpg`
- Examples: `sarah-chen.jpg`, `marcus-rodriguez.jpg`
- Keep filenames lowercase with hyphens
- Supported formats: `.jpg`, `.jpeg`, `.png`

---

## 🔑 Step 3: Get Google API Keys

### 3.1 Enable Google Sheets API

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create new project** (or select existing)
3. **Enable APIs**:
   - Search for "Google Sheets API" → Enable
   - Search for "Google Drive API" → Enable

### 3.2 Create API Key

1. **Go to Credentials** (left sidebar)
2. **Click "Create Credentials" → "API Key"**
3. **Copy your API key** - you'll need this!
4. **Restrict the key** (recommended):
   - Click "Restrict Key"
   - Under "API restrictions" → Select "Google Sheets API" and "Google Drive API"

---

## ⚙️ Step 4: Configure Your Website

### 4.1 Add API Keys to Website

Open your browser console on the members page and run:

```javascript
// Configure Google Sheets sync
googleSheetsSync.configure({
    sheetsApiKey: 'YOUR_SHEETS_API_KEY_HERE',
    spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE', 
    driveApiKey: 'YOUR_DRIVE_API_KEY_HERE',
    photoFolderId: 'YOUR_DRIVE_FOLDER_ID_HERE',
    
    // Optional: Customize sheet names if different
    executiveSheetName: 'Executive Board',
    memberSheetName: 'General Members',
    alumniSheetName: 'Alumni'
});
```

### 4.2 Test the Setup

```javascript
// Test sync manually
await googleSheetsSync.syncData();
```

If successful, you'll see: ✅ Member data synced successfully

---

## 🚀 Step 5: Add Automation Script to Website

Add the Google Sheets sync script to your members page:

```html
<!-- Add this line to members.html before closing </body> tag -->
<script src="scripts/google-sheets-sync.js"></script>
```

---

## 📱 Step 6: Train Your Marketing Team

### 🎯 **Weekly Workflow for Marketing Team:**

#### **Adding New Members:**
1. ✅ **Get member info**: Name, major, year, interests, LinkedIn
2. ✅ **Request professional photo** from member
3. ✅ **Add row to Google Sheet** with their information
4. ✅ **Upload photo to Google Drive folder** with correct filename
5. ✅ **Wait 30 minutes** for automatic sync (or manually trigger)

#### **Updating Existing Members:**
1. ✅ **Edit the Google Sheet** row
2. ✅ **Replace photo in Drive** if needed (keep same filename)
3. ✅ **Automatic sync** handles the rest

#### **Moving Members to Alumni:**
1. ✅ **Cut row from "General Members" tab**
2. ✅ **Paste to "Alumni" tab**
3. ✅ **Update their current role and company**
4. ✅ **Keep same photo filename**

### 🛠️ **Tools They Need:**
- ✅ Access to the Google Sheet (edit permissions)
- ✅ Access to Google Drive folder (upload permissions)  
- ✅ Basic photo editing skills (resize to 300x300px)
- ✅ **No coding skills required!**

---

## 🔧 Advanced Configuration

### Auto-Sync Settings

```javascript
// Customize sync frequency (default: 30 minutes)
googleSheetsSync.syncInterval = 15 * 60 * 1000; // 15 minutes

// Manual sync anytime
googleSheetsSync.syncData();

// Check last sync time
console.log('Last sync:', new Date(localStorage.getItem('lastSheetsSync')));
```

### Photo Quality Settings

For best results, photos should be:
- **Size**: 300x300 pixels (square)
- **Format**: JPG or PNG
- **File size**: Under 500KB
- **Quality**: Professional headshot or nice casual photo

---

## 🐛 Troubleshooting

### ❌ **"Sync failed" Error**

**Check these common issues:**

1. **API Key Issues:**
   ```javascript
   // Test API access
   fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Executive%20Board?key=${apiKey}`)
   ```

2. **Spreadsheet Permissions:**
   - Ensure sheet is "Anyone with link can view"
   - Check spreadsheet ID is correct

3. **Sheet Names:**
   - Verify tab names match configuration exactly
   - Check for extra spaces or special characters

4. **Photo Issues:**
   - Confirm Drive folder is publicly viewable
   - Check photo filenames match spreadsheet exactly
   - Ensure photos are in correct folder

### ⚠️ **Photos Not Loading**

1. **Check Google Drive folder permissions**
2. **Verify photo filenames match spreadsheet**
3. **Confirm photos are under 5MB each**
4. **Test Drive API access**

### 🔄 **Manual Sync Commands**

```javascript
// Force full resync
localStorage.removeItem('lastSheetsSync');
googleSheetsSync.syncData();

// Clear cached data
localStorage.removeItem('syncedMemberData');

// Reset configuration
localStorage.removeItem('googleSheetsConfig');
```

---

## 🎯 Benefits for Your Team

### **For Marketing Team:**
- ✅ **5-minute updates** instead of asking developers
- ✅ **Familiar tools** (Google Sheets/Drive)
- ✅ **No technical training** required
- ✅ **Immediate feedback** when sync completes
- ✅ **Bulk updates** possible with copy/paste

### **For Leadership:**
- ✅ **Real-time member directory** always up-to-date
- ✅ **Professional appearance** with automatic formatting
- ✅ **Scalable system** handles hundreds of members
- ✅ **Error prevention** with templates and validation

### **For Website Performance:**
- ✅ **Fast loading** with optimized photo delivery
- ✅ **Reliable uptime** with fallback systems
- ✅ **Mobile responsive** member cards
- ✅ **SEO friendly** with proper image alt tags

---

## 📞 Support & Maintenance

### **Getting Help:**
1. **Check browser console** for error messages
2. **Test API keys** with manual commands above
3. **Verify Google Sheet formatting** matches templates
4. **Contact your web developer** for API issues

### **Monthly Maintenance:**
- ✅ Review photo folder organization
- ✅ Clean up outdated member photos
- ✅ Verify API keys are still working
- ✅ Update spreadsheet with graduated members

---

## 🚀 Future Enhancements

This system can be extended with:
- 📧 **Email notifications** when sync completes
- 📊 **Analytics tracking** for member growth
- 🔐 **Member login portal** for self-updates
- 📱 **Mobile app integration** for photo uploads
- 🤖 **Slack notifications** for team updates

---

**🎉 Congratulations!** Your marketing team can now update the website member directory without any coding knowledge. The system will automatically keep everything in sync and professional-looking!
