/**
 * AI Readiness Survey — Google Apps Script
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Save (floppy disk icon)
 * 5. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → copy the Web App URL
 * 7. Add the URL as VITE_SHEETS_WEBHOOK_URL in Vercel:
 *    Vercel → your project → Settings → Environment Variables
 * 8. Redeploy in Vercel (or push a new commit) for the env var to take effect
 */

const HEADERS = [
  'Timestamp',
  'שם מלא',
  'חברה',
  'תפקיד',
  'מייל',
  'גודל ארגון',
  'Q1 - יעילות צוות (1-5)',
  'Q2 - Copy-paste בין מערכות',
  'Q3 - תהליך חוזר',
  'Q4 - מידע שלא בשימוש',
  'Q5 - נגישות נתונים',
  'Q6 - זמן תשובה פנימית',
  'Q7 - מה מאט את הצוות',
  'Q8 - עובד לשכפול (שאלת הזהב)',
  'Q9 - שימוש AI מועדף',
  'Q10 - כלי AI קיימים',
  'Q11 - חסמים להטמעה',
  'Q12 - דאגה לגבי AI',
  'Q13 - בעיה עסקית',
  'Q14 - תוצאה ב-90 יום',
  'Q15 - אופק הטמעה',
  'Q16 - תקציב חודשי',
]

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const data = JSON.parse(e.postData.contents)

    // Create header row on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS)
      sheet.setFrozenRows(1)
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#11061d')
        .setFontColor('#ffffff')
    }

    const identity = data.identity || {}
    const answers = data.answers || {}

    const row = [
      data.timestamp || new Date().toISOString(),
      identity.fullName  || '',
      identity.company   || '',
      identity.role      || '',
      identity.email     || '',
      identity.orgSize   || '',
      answers['1']  || '',
      answers['2']  || '',
      answers['3']  || '',
      answers['4']  || '',
      answers['5']  || '',
      answers['6']  || '',
      answers['7']  || '',
      answers['8']  || '',
      answers['9']  || '',
      answers['10'] || '',
      answers['11'] || '',
      answers['12'] || '',
      answers['13'] || '',
      answers['14'] || '',
      answers['15'] || '',
      answers['16'] || '',
    ]

    sheet.appendRow(row)

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
