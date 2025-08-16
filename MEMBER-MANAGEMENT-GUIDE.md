# 📝 Member Management Guide for Non-Technical Users

This guide explains how to easily update the SIG website's member information without needing any coding skills.

## 🎯 Quick Overview

Your website uses a simple **JSON file** to store all member information. Think of it like a digital spreadsheet that the website reads to display member cards automatically.

## 📊 How the Members Page Works

The members page has three sections:
1. **Executive Board** - Leadership team with roles
2. **General Members** - All other active members, organized by year
3. **Alumni** - Graduated members with their current jobs

Each member card shows:
- Photo
- Name  
- Major/Role
- Year/Company
- Interest area (for current members)
- LinkedIn profile link

## 🔄 Weekly Update Process (Recommended)

### Method 1: Direct JSON Editing (Simplest)

1. **Open the member data file**: Navigate to `data/members.json` in your website folder
2. **Edit member information** using any text editor (even Notepad works!)
3. **Save the file**
4. **Upload to your website** (if using GitHub Pages, just commit the changes)

### Method 2: Spreadsheet-to-JSON Converter (Coming Soon)

I'll create a simple tool that lets you:
1. Update a Google Sheets spreadsheet
2. Export as CSV
3. Convert to JSON automatically
4. Upload to website

## 📋 Spreadsheet Setup for Easy Management

Here's how to set up a Google Sheets document for member management:

### Executive Board Sheet
| Name | Role | Major | Year | Image_Filename | LinkedIn_URL |
|------|------|-------|------|----------------|--------------|
| Sarah Chen | President | Economics & Environmental Studies | Senior | sarah-chen.jpg | https://linkedin.com/in/... |
| Marcus Rodriguez | Vice President | Finance & Data Science | Junior | marcus-rodriguez.jpg | https://linkedin.com/in/... |

### General Members Sheet  
| Name | Major | Year | Interest | Image_Filename | Category |
|------|-------|------|----------|----------------|----------|
| Alexandra Kim | International Business | Senior | ESG Research | alexandra-kim.jpg | senior |
| Robert Johnson | Economics | Senior | Impact Investing | robert-johnson.jpg | senior |

### Alumni Sheet
| Name | Current_Role | Company | Graduation_Year | Image_Filename | LinkedIn_URL |
|------|--------------|---------|-----------------|----------------|--------------|
| Jessica Wang | ESG Analyst | BlackRock | Class of 2023 | jessica-wang.jpg | https://linkedin.com/in/... |
| Alex Thompson | Sustainability Consultant | EY | Class of 2022 | alex-thompson.jpg | https://linkedin.com/in/... |

## 🖼️ Photo Management

### Photo Requirements:
- **Format**: JPG or PNG
- **Size**: 300x300 pixels (square works best)
- **File size**: Under 500KB each
- **Naming**: Use format `firstname-lastname.jpg` (lowercase, hyphens for spaces)

### Photo Locations:
- Save all photos in: `assets/members/`
- Use `placeholder-member.jpg` if someone doesn't have a photo yet

### Weekly Photo Updates:
1. **Collect new member photos** via email or Google Drive
2. **Resize photos** to 300x300 pixels using:
   - [Canva](https://canva.com) (free, easy to use)
   - [TinyPNG](https://tinypng.com) (for compression)
   - Even your phone's photo editor
3. **Rename files** following the naming convention
4. **Upload to** `assets/members/` folder

## 🚀 Step-by-Step Weekly Update Process

### Week 1: New Member Joins
1. **Get their information**: Name, major, year, interests, LinkedIn
2. **Request a photo**: Professional headshot or nice casual photo
3. **Add to spreadsheet** or edit `members.json` directly
4. **Add photo** to `assets/members/` folder
5. **Update website** (upload files or commit to GitHub)

### Week 2: Member Updates Role
1. **Edit their entry** in the data file
2. **Update the website** (no photo change needed)

### Week 3: Member Graduates
1. **Move them** from "General Members" to "Alumni" section
2. **Update their info** with new job title and company
3. **Keep their photo** in the same location

## 🛠️ Tools You'll Need

### Free Tools for Non-Technical Users:
1. **Text Editor**: 
   - Notepad (Windows) or TextEdit (Mac)
   - [VS Code](https://code.visualstudio.com/) (recommended - has better formatting)

2. **Photo Editing**:
   - [Canva](https://canva.com) - Resize and crop photos
   - [TinyPNG](https://tinypng.com) - Compress large photos

3. **File Management**:
   - GitHub Desktop (if using GitHub Pages)
   - FileZilla (if using traditional web hosting)

### Recommended Workflow:
1. **Monday**: Collect new member info and photos
2. **Tuesday**: Update data file and add photos  
3. **Wednesday**: Upload changes to website
4. **Thursday**: Review website and fix any issues
5. **Friday**: Send updated member directory to leadership

## 🔧 JSON File Structure Explained

The `members.json` file has three sections:

```json
{
  "executiveBoard": [
    {
      "name": "Full Name",
      "role": "Position Title", 
      "major": "Academic Major",
      "year": "Senior/Junior/etc",
      "image": "assets/members/photo-filename.jpg",
      "linkedin": "https://linkedin.com/in/username"
    }
  ],
  "generalMembers": [
    {
      "name": "Full Name",
      "major": "Academic Major",
      "year": "Senior/Junior/etc", 
      "interest": "ESG Research/etc",
      "image": "assets/members/photo-filename.jpg",
      "category": "senior/junior/sophomore/freshman"
    }
  ],
  "alumni": [
    {
      "name": "Full Name",
      "role": "Job Title",
      "company": "Company Name", 
      "year": "Class of 2023",
      "image": "assets/members/photo-filename.jpg", 
      "linkedin": "https://linkedin.com/in/username"
    }
  ]
}
```

## ⚠️ Common Mistakes to Avoid

1. **Missing Commas**: Every entry needs a comma after it (except the last one)
2. **Wrong Image Paths**: Make sure photo filenames match exactly
3. **Broken JSON**: Use a [JSON validator](https://jsonlint.com/) to check your file
4. **Large Photos**: Keep photos under 500KB to ensure fast loading
5. **Missing Categories**: General members need a "category" field (senior/junior/etc)

## 🆘 Troubleshooting

### Website Shows Placeholder Images:
- Check that photo filenames match exactly (including .jpg/.png)
- Verify photos are in `assets/members/` folder
- Make sure photo files aren't corrupted

### Member Cards Not Appearing:
- Validate your JSON file at [jsonlint.com](https://jsonlint.com/)
- Check for missing commas or quotes
- Ensure all required fields are filled

### Website Not Updating:
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check that files uploaded successfully
- Wait 5-10 minutes for GitHub Pages to update

## 📞 Getting Help

1. **Technical Issues**: Contact your web developer or tech-savvy member
2. **JSON Validation**: Use [jsonlint.com](https://jsonlint.com/) to check formatting
3. **Photo Issues**: Use Canva or ask someone to help resize photos
4. **Emergency**: Keep a backup of the working `members.json` file

## 🎯 Pro Tips for Efficiency

1. **Batch Updates**: Collect all changes for the week before updating
2. **Template Photos**: Have a standard background/style for consistency  
3. **Backup First**: Always save a copy before making major changes
4. **Test Locally**: Preview changes before uploading if possible
5. **Document Changes**: Keep notes on what you updated each week

---

This system makes it possible for anyone to manage member information without touching any code! The key is keeping the JSON file format correct and organizing photos consistently.
