# Google Sheets CMS Setup Guide

This guide explains how to set up Google Sheets as a CMS for your cleaning service website.

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "GMG CMS" or similar

## Step 2: Set Up the Services Tab

Create a sheet named `services` with the following columns (row 1):

| id | title | slug | description | price | imageUrl | visible | order |
|----|-------|------|-------------|-------|----------|---------|-------|

### Example Data:
```
1 | Limpieza Residencial | limpieza-residencial | Mantén tu hogar impecable con nuestro servicio de limpieza profunda y regular. | Desde $80.000 COP | https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80 | TRUE | 1

2 | Limpieza Comercial | limpieza-comercial | Espacios de trabajo limpios y profesionales para tu empresa u oficina. | Cotización personalizada | https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80 | TRUE | 2

3 | Limpieza Profunda | limpieza-profunda | Servicio especializado que llega a cada rincón y detalle de tu espacio. | Desde $150.000 COP | https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80 | TRUE | 3
```

**Column Descriptions:**
- `id`: Unique identifier (1, 2, 3...)
- `title`: Service name
- `slug`: URL-friendly identifier
- `description`: Short description (1-2 sentences)
- `price`: Price text (e.g., "Desde $80.000 COP")
- `imageUrl`: Full URL to service image
- `visible`: TRUE or FALSE (only TRUE services appear on site)
- `order`: Display order (1 = first, 2 = second, etc.)

## Step 3: Set Up the Settings Tab

Create a sheet named `settings` with the following columns (row 1):

| key | value |
|-----|-------|

### Example Data:
```
logoUrl | https://res.cloudinary.com/dqnsskjfg/image/upload/v1762154754/LOGO_MAURICIO_bnjzqt.svg
headerText | Servicios Profesionales de Limpieza
headerSubtext | Ofrecemos una amplia gama de servicios de limpieza adaptados a tus necesidades
primaryColor | 240 100% 27%
secondaryColor | 209 36% 70%
heroImage | https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1920&q=80
contactEmail | contacto@gmg.com
contactPhone | +57 300 123 4567
facebookUrl | https://facebook.com/gmg
instagramUrl | https://instagram.com/gmg
twitterUrl | https://twitter.com/gmg
```

## Step 4: Deploy the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy and paste the following script:

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
5. Choose **Web app** as deployment type
6. Settings:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
7. Click **Deploy**
8. **Copy the Web App URL** - you'll need this!

The URL will look like:
```
https://script.google.com/macros/s/AKfycby.../exec
```

## Step 5: Update Your Website

In your project, create a `.env.local` file (or `.env`) with:

```env
VITE_CMS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual script URL.

## Step 6: Test Your Endpoint

Open your Web App URL in a browser. You should see JSON like:

```json
{
  "services": [
    {
      "id": 1,
      "title": "Limpieza Residencial",
      "slug": "limpieza-residencial",
      "description": "Mantén tu hogar impecable...",
      "price": "Desde $80.000 COP",
      "imageUrl": "https://...",
      "visible": true,
      "order": 1
    }
  ],
  "settings": {
    "logoUrl": "https://...",
    "headerText": "Servicios Profesionales de Limpieza",
    "primaryColor": "240 100% 27%"
  },
  "lastUpdated": "2025-11-03T..."
}
```

## Caching

The Google Apps Script runs on-demand, so changes to your sheet are reflected within seconds. For production, consider:

1. Adding cache headers to the script response (5-10 minutes)
2. Using React Query with `staleTime` configuration
3. Manual refresh button in admin interface

## Adding/Editing Services

Simply edit your Google Sheet:
- To add a service: Add a new row with all columns filled
- To edit: Change values in any cell
- To hide: Set `visible` to FALSE
- To reorder: Change the `order` number

Changes appear on your site within seconds to minutes (depending on cache).

## Troubleshooting

**"Loading failed"**: Check that your Web App URL is correct in `.env.local`

**"No services showing"**: Verify `visible` column is set to TRUE (not "true" or "Yes")

**"Wrong order"**: Check `order` column has numbers (1, 2, 3...) not text

**"Changes not appearing"**: Wait 1-2 minutes or clear browser cache
