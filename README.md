# Cultstore Instagram Fortnightly Tracker

A lightweight shared dashboard for recording Instagram performance once every 14 days. Periods are saved by the Node server so everyone using the deployed link sees the same data. CSV export remains available as a backup.

## Feature list

### Reporting

- Fortnightly workflow designed for one quick update every 14 days
- Add, edit, and delete reporting periods
- Required period start and end dates
- Metrics for followers, net follower gain, interactions, viewers, profile visits, bio link taps, likes, comments, shares, and saves
- Reflection notes for “What worked?” and “What could be better?”
- A Reflection button in each history row for quick review

### Dashboard and insights

- Latest-period dashboard with KPI cards
- Latest-versus-previous period comparison
- Percentage growth calculated as `(latest - previous) / previous × 100`
- Positive growth shown in green and negative growth shown in red
- Safe handling for zero or unavailable previous values
- Separate, readable trend charts for audience/discovery and engagement metrics
- Chronological reporting history for easy month-to-month review

### Data and usability

- Shared server-side data storage for everyone using the live link
- Local storage fallback when the app is offline
- CSV import and export for backup and sharing
- Sample data included for immediate preview
- Responsive desktop and mobile layout
- No login or complicated backend required

### Deployment

- Lightweight HTML, CSS, and JavaScript frontend
- Node.js start command included
- Railway-compatible server using the provided `PORT` and `0.0.0.0`

## Included

- Add, edit, and delete fortnightly periods
- Latest-period KPI cards with latest-vs-previous percentage growth
- Audience/discovery and engagement trend charts
- CSV import/export
- Sample data for an instant preview
- Responsive layout for desktop and mobile
- Railway-ready Node server using `PORT` and `0.0.0.0`
- Shared API endpoints: `GET /api/periods` and `PUT /api/periods`

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

No environment variables are required for the basic deployment. The included server stores shared data in `data/periods.json`; for production durability on Railway, attach a persistent volume or replace this file store with a managed database.

## CSV format

CSV exports contain `startDate`, `endDate`, and the metric columns: `followers`, `netFollowersGain`, `interactions`, `viewers`, `profileVisits`, `bioLinkTaps`, `likes`, `comments`, `shares`, and `saves`.
