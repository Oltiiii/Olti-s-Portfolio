# Olti Kryeziu — Portfolio

Personal portfolio built with the **MERN stack**: a React front end and an Express + MongoDB API that serves my CV and counts visits and CV downloads.

## Project structure

```
olti-portfolio/
├── client/                     React app (Vite)
│   ├── public/                 favicon + CV fallback copy
│   └── src/
│       ├── data/profile.js     ALL site text lives here
│       ├── components/
│       │   ├── layout/         Navbar, Footer
│       │   └── ui/             Monogram, Section, TagList, ButtonLink
│       ├── sections/           Hero, About, Experience, Work, Skills, Education, Contact
│       ├── hooks/              usePageViews (analytics)
│       ├── services/api.js     all calls to the backend
│       └── styles/global.css   design tokens and base styles
├── server/                     Express API
│   ├── assets/                 the CV PDF that gets downloaded
│   └── src/
│       ├── config/             env variables, MongoDB connection
│       ├── models/             DailyStat (Mongoose)
│       ├── services/           statsService (database logic)
│       ├── controllers/        cv, analytics
│       ├── routes/             /api routes
│       ├── middleware/         admin key check, error handling
│       ├── utils/              asyncHandler, HttpError
│       ├── app.js              Express app setup
│       └── index.js            starts the server
└── render.yaml                 one-click API deploy on Render
```

## API endpoints

| Method | Endpoint                 | What it does                                           |
| ------ | ------------------------ | ------------------------------------------------------ |
| GET    | `/api/health`            | Server and database status                             |
| GET    | `/api/cv`                | Downloads the CV and counts the download               |
| POST   | `/api/analytics/visit`   | Counts a page view (once per browser session)          |
| GET    | `/api/analytics/total`   | Total page views (shown in the footer)                 |
| GET    | `/api/analytics/summary` | Private stats; needs header `x-admin-key: <ADMIN_KEY>` |

To check your stats after deploying:

```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://YOUR-API.onrender.com/api/analytics/summary
```

## Run it on your computer

You need **Node.js 20+** and a free **MongoDB Atlas** database (see step 1 below).

```bash
# 1. Install everything
npm run install:all

# 2. Create the environment files and fill them in
cp server/.env.example server/.env
cp client/.env.example client/.env

# 3. Start the API (port 5000) and the site (port 5173) together
npm run dev
```

Open http://localhost:5173.

## Edit the content

Everything you read on the site is in `client/src/data/profile.js`. Change the text there and the page updates. To replace the CV, overwrite both:

- `server/assets/Olti-Kryeziu-CV.pdf`
- `client/public/Olti-Kryeziu-CV.pdf`

## Deploy for free

### 1. Database — MongoDB Atlas

1. Sign up at https://www.mongodb.com/cloud/atlas and create a free **M0** cluster.
2. **Database Access**: add a user with a password.
3. **Network Access**: allow `0.0.0.0/0` (Render's IPs change).
4. **Connect > Drivers**: copy the connection string, put your password in it and add `/portfolio` before the `?`. That is your `MONGODB_URI`.

### 2. Code — GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

### 3. API — Render

1. Sign up at https://render.com with GitHub.
2. **New > Blueprint**, pick your repo. Render reads `render.yaml`.
3. Fill in `MONGODB_URI`, and set `CLIENT_ORIGIN` to your Netlify URL (you can update it after step 4).
4. When it's live, open `https://<your-api>.onrender.com/api/health`. You should see `"status": "ok"`.

The free plan sleeps after 15 minutes without traffic, so the first request after a while takes ~30 seconds. The site still loads instantly because the front end is on Netlify; only the visit counter appears a bit later.

### 4. Front end — Netlify

1. Sign up at https://netlify.com with GitHub, then **Add new site > Import an existing project** and pick your repo.
2. The build settings fill in automatically from `netlify.toml` (base `client`, command `npm run build`, publish `dist`).
3. Add environment variable `VITE_API_URL` = your Render URL, e.g. `https://olti-portfolio-api.onrender.com`. Skip this if you don't use the API.
4. Deploy. Rename the site under **Site configuration > Change site name**, e.g. `oltikryeziu.netlify.app`.
5. Go back to Render and make sure `CLIENT_ORIGIN` matches your Netlify URL exactly.

### 5. Free domain — is-a.dev

is-a.dev gives developers a free subdomain such as `olti.is-a.dev`. Requests go through a pull request from your own GitHub account, and the maintainers ask that you write it yourself rather than with AI.

1. In Netlify: **Domain management > Add a domain**, enter `olti.is-a.dev` (Netlify also adds `www.olti.is-a.dev`).
2. Follow the official guides and open your pull request:
   - Registering: https://docs.is-a.dev/quickstart/
   - Netlify records: https://docs.is-a.dev/guides/netlify/
3. Include your Netlify link and a screenshot in the pull request, and watch it for review comments.
4. After it's merged, check the domain in Netlify. HTTPS turns on automatically once DNS updates.
5. Update `CLIENT_ORIGIN` on Render to include the new domain, comma-separated:
   `https://olti.is-a.dev,https://www.olti.is-a.dev,https://oltikryeziu.netlify.app`

## Scripts

| Where  | Command               | What it does                     |
| ------ | --------------------- | -------------------------------- |
| root   | `npm run install:all` | Installs root, server and client |
| root   | `npm run dev`         | Runs API and site together       |
| root   | `npm run format`      | Formats all code with Prettier   |
| client | `npm run build`       | Production build into `dist/`    |
| client | `npm run lint`        | Lints the React code             |
| server | `npm start`           | Starts the API in production     |
