# Cultstore Instagram Fortnightly Tracker

A lightweight, local-first dashboard for recording Instagram performance once every 14 days. It has no login or backend database: entries are saved automatically in the browser's local storage and can be backed up with CSV export.

## Included

- Add, edit, and delete fortnightly periods
- Latest-period KPI cards with latest-vs-previous percentage growth
- Audience/discovery and engagement trend charts
- CSV import/export
- Sample data for an instant preview
- Responsive layout for desktop and mobile
- Railway-ready Node server using `PORT` and `0.0.0.0`

## Run locally

Requires Node.js 18 or newer.

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000). To use another port:

```bash
PORT=8080 npm start
```

## Deploy to Railway

1. Create a new Railway project and choose **Deploy from GitHub repo**.
2. Select this repository.
3. Railway detects the Node project and runs `npm start`.
4. The server listens on Railway's supplied `PORT` and binds to `0.0.0.0`.
5. Generate a public domain from the Railway service settings.

No environment variables are required.

## CSV format

CSV exports contain `startDate`, `endDate`, and the metric columns: `followers`, `netFollowersGain`, `interactions`, `viewers`, `profileVisits`, `bioLinkTaps`, `likes`, `comments`, `shares`, and `saves`.
