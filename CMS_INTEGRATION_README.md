# Google Sheets CMS Integration - Complete Guide

## Overview

Your GMG cleaning services website now has a fully functional Google Sheets-based Content Management System (CMS). This allows you to manage all website content (services, settings, text, images, social links) directly from a Google Sheet without touching any code.

## 🎯 What's Been Implemented

### 1. **Dynamic Services Management**
- Add, edit, remove, and reorder services from Google Sheets
- Each service includes: title, description, pricing, image, and visibility toggle
- Automatic loading states and error handling
- Fallback to default services if CMS is unavailable

### 2. **Configurable Settings**
The following elements are now configurable via Google Sheets:
- **Logo**: Navbar logo URL
- **Hero Section**:
  - Main title text
  - Subtitle text
  - Description/tagline
  - Call-to-action button text
  - Background image
- **Social Media Links**: Facebook, Instagram, Twitter URLs

### 3. **Technical Implementation**
- ✅ TypeScript types for type-safe CMS data
- ✅ React Query for efficient data caching (5-minute freshness)
- ✅ Google Apps Script serving JSON endpoint
- ✅ Fallback data for offline/error scenarios
- ✅ Real-time updates (changes reflect within seconds)

## 📁 Files Created

```
src/
├── types/
│   └── cms.ts                          # TypeScript types for CMS data
├── services/
│   └── cms.ts                          # API client for fetching CMS data
├── hooks/
│   └── useCMSData.ts                   # React Query hook for CMS data
└── components/
    ├── Services.tsx                    # Updated with dynamic services
    ├── Hero.tsx                        # Updated with configurable content
    └── Navbar.tsx                      # Updated with configurable logo & links

Configuration Files:
├── .env.local.example                  # Environment variable template
└── GOOGLE_SHEETS_CMS_SETUP.md         # Detailed setup instructions
```

## 🚀 Quick Start Guide

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "GMG CMS"
3. Create two tabs: `services` and `settings`

### Step 2: Set Up Services Tab

Create a tab named `services` with these columns:

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| id | Number | Unique identifier | 1, 2, 3... |
| title | Text | Service name | "Limpieza Residencial" |
| slug | Text | URL-friendly ID | "limpieza-residencial" |
| description | Text | Brief description | "Mantén tu hogar impecable..." |
| price | Text | Price text | "Desde $80.000 COP" |
| imageUrl | URL | Service image | https://images.unsplash.com/... |
| visible | Boolean | Show on site? | TRUE or FALSE |
| order | Number | Display order | 1, 2, 3... |

**Example Row:**
```
1 | Limpieza Residencial | limpieza-residencial | Mantén tu hogar impecable con nuestro servicio de limpieza profunda y regular. | Desde $80.000 COP | https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80 | TRUE | 1
```

### Step 3: Set Up Settings Tab

Create a tab named `settings` with two columns:

| key | value |
|-----|-------|
| logoUrl | https://res.cloudinary.com/dqnsskjfg/image/upload/v1762154754/LOGO_MAURICIO_bnjzqt.svg |
| heroTitle | Limpieza que se siente |
| heroSubtitle | desde la primera impresión |
| heroDescription | Servicios profesionales de aseo para tu hogar u oficina. |
| heroButtonText | Solicita tu cotización |
| heroImage | https://res.cloudinary.com/dqnsskjfg/image/upload/v1762156029/HERO_TIO_SII_1_mhunqe.png |
| facebookUrl | https://facebook.com/yourpage |
| instagramUrl | https://instagram.com/yourprofile |
| twitterUrl | https://twitter.com/yourhandle |

### Step 4: Deploy Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Paste the following script:

```javascript
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Get Services Data
  const servicesSheet = ss.getSheetByName('services');
  const servicesData = servicesSheet.getDataRange().getValues();
  const servicesHeaders = servicesData[0];
  const servicesRows = servicesData.slice(1);

  const services = servicesRows
    .map(row => {
      const service = {};
      servicesHeaders.forEach((header, index) => {
        service[header] = row[index];
      });
      return service;
    })
    .filter(service => service.visible === true || service.visible === 'TRUE')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Get Settings Data
  const settingsSheet = ss.getSheetByName('settings');
  const settingsData = settingsSheet.getDataRange().getValues();
  const settingsRows = settingsData.slice(1);

  const settings = {};
  settingsRows.forEach(row => {
    settings[row[0]] = row[1];
  });

  // Return JSON response
  const output = {
    services: services,
    settings: settings,
    lastUpdated: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy > New deployment**
5. Choose type: **Web app**
6. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**
8. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### Step 5: Configure Your Website

1. Create a `.env.local` file in your project root:

```env
VITE_CMS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual script URL from Step 4.

2. Restart your development server:

```bash
npm run dev
```

### Step 6: Test Your Setup

1. Open your Web App URL in a browser
2. You should see JSON output with your services and settings
3. Visit your website at http://localhost:8081
4. Changes to your Google Sheet should appear within seconds!

## 📝 How to Use

### Adding a New Service

1. Open your Google Sheet
2. Go to the `services` tab
3. Add a new row with all columns filled:
   - **id**: Next available number (e.g., 7, 8, 9...)
   - **title**: Service name
   - **slug**: lowercase-with-hyphens
   - **description**: 1-2 sentences
   - **price**: Text like "Desde $XX.XXX COP"
   - **imageUrl**: Full URL to an image
   - **visible**: TRUE (to show) or FALSE (to hide)
   - **order**: Number determining display order
4. Save the sheet
5. Refresh your website (may take a few seconds)

### Editing a Service

1. Find the service row in your `services` tab
2. Edit any value you want to change
3. Save the sheet
4. Changes appear automatically!

### Hiding a Service

1. Find the service in your `services` tab
2. Change the `visible` column to **FALSE**
3. The service will no longer appear on the website

### Reordering Services

1. Change the `order` values in the `services` tab
2. Lower numbers appear first (1, 2, 3...)
3. Services automatically reorder on the website

### Changing Website Text

1. Go to the `settings` tab
2. Find the setting you want to change (e.g., `heroTitle`)
3. Edit the `value` column
4. Save and refresh

### Changing Images

1. **Hero Background**: Update `heroImage` in settings
2. **Logo**: Update `logoUrl` in settings
3. **Service Images**: Update `imageUrl` in the services tab

### Updating Social Links

1. Go to the `settings` tab
2. Update `facebookUrl`, `instagramUrl`, or `twitterUrl`
3. Save and the navbar links update automatically

## 🔄 Caching Behavior

- **Fresh Data**: Considered fresh for 5 minutes
- **Cache Duration**: Data cached for 30 minutes
- **Updates**: Changes typically appear within seconds to 1 minute
- **Manual Refresh**: Use browser refresh if changes don't appear immediately

## 🛠️ Troubleshooting

### "Loading failed" Error

**Cause**: CMS API URL not configured or incorrect

**Fix**:
1. Check that `.env.local` exists
2. Verify the `VITE_CMS_API_URL` is correct
3. Restart your dev server: `npm run dev`

### Services Not Showing

**Cause**: `visible` column not set correctly

**Fix**: Make sure the `visible` column is exactly `TRUE` (not "true", "yes", or "1")

### Changes Not Appearing

**Cause**: Browser cache or React Query cache

**Fix**:
1. Wait 1-2 minutes
2. Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Clear browser cache

### Wrong Service Order

**Cause**: `order` column has non-numeric values

**Fix**: Make sure `order` contains only numbers (1, 2, 3...) not text

### Google Apps Script Errors

**Cause**: Tab names don't match or structure is wrong

**Fix**:
1. Verify tabs are named exactly `services` and `settings` (lowercase)
2. Verify column headers match exactly
3. Check that row 1 contains headers, data starts at row 2

## 🎨 Customization

### Adding New Settings

1. Add a new row in the `settings` tab with your key/value
2. In your code, use `getSetting()` to retrieve it:

```typescript
const myNewSetting = getSetting(
  data?.settings || {},
  'mySettingKey',
  'default value'
);
```

### Service Details

Services can include detail bullet points. Add them as a JSON array in the description, or they'll be auto-generated from the description text.

### Styling

All components maintain the Swiss Design aesthetic. Colors, spacing, and typography are defined in `src/index.css`.

## 📚 Additional Resources

- **Full Setup Guide**: See `GOOGLE_SHEETS_CMS_SETUP.md`
- **Type Definitions**: See `src/types/cms.ts`
- **API Client**: See `src/services/cms.ts`
- **React Hook**: See `src/hooks/useCMSData.ts`

## 🔐 Security Notes

- The Google Apps Script is deployed with "Anyone" access for public read-only access
- No authentication is required to read data
- Only you (the Google Sheet owner) can edit the data
- Consider adding rate limiting or API keys for production environments

## 🚀 Production Deployment

When deploying to production:

1. Set the environment variable on your hosting platform:
   ```
   VITE_CMS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

2. Build your project:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to your hosting service

## 🎉 Success!

Your website now has a fully functional CMS! You can manage all content from Google Sheets without touching any code. Edit your sheet, and watch your website update automatically.

**Happy content managing! 🧹✨**
