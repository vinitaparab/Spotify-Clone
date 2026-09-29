# Spotify Clone

A Spotify-style music player web app. It has a vanilla HTML/CSS/JavaScript frontend and a Node.js + Express backend. Users sign up and log in with JWT-based authentication, backed by MongoDB. Once logged in, they can browse and play 28 songs, with play/pause, next/previous, shuffle, repeat and a seekable progress bar.

- **Production backend:** https://spotify-clone-backend-8py5.onrender.com
- **Repository:** https://github.com/vinitaparab/Spotify-Clone

---

## Features

- **User authentication**: sign up and log in, with passwords hashed using `bcryptjs` and a JWT session token that expires after 7 days.
- **Protected player page**: `index.html` redirects to `login.html` if there is no token in `localStorage`.
- **Logout**: clears the token and user data from `localStorage`.
- **Song catalogue API**: the backend serves song metadata and streams MP3 files.
- **Music player controls**:
  - Play/pause from the bottom bar or from any song card
  - Next and previous track
  - Shuffle (Fisher–Yates) and repeat modes
  - A seekable progress bar
  - A "Now playing" bar showing the cover art, title and artists
  - Automatic playback of the next song when the current one ends

## Tech Stack

| Layer    | Technology                                                    |
| -------- | ------------------------------------------------------------- |
| Frontend | HTML5, CSS3, vanilla JavaScript, Font Awesome, Google Fonts   |
| Backend  | Node.js, Express 5, CORS                                      |
| Database | MongoDB (via Mongoose 9)                                      |
| Auth     | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`                  |
| Config   | `dotenv`                                                      |
| Hosting  | Render (backend)                                              |

## Project Structure

```
Spotify_Clone/
├── package.json              # bcryptjs, dotenv, jsonwebtoken, mongoose
├── backend/
│   ├── package.json          # express, cors  (start script: node server.js)
│   ├── server.js             # Express app entry point
│   ├── song.js               # Song catalogue (name, artists, image, audio path)
│   ├── .env                  # Environment variables (NOT to be committed)
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── models/
│   │   └── User.js           # User schema (name, email, password, timestamps)
│   ├── routes/
│   │   └── authRoutes.js     # POST /api/auth/signup, POST /api/auth/login
│   ├── middleware/
│   │   └── authMiddleware.js # JWT "Bearer" token verification
│   ├── Audio/                # 1.mp3 … 28.mp3 (served at /Audio)
│   └── Images/               # img1.jpg … img28.jpg
└── frontend/
    ├── index.html            # Main player page (protected)
    ├── login.html / auth.js  # Login page + logic
    ├── signup.html / signup.js # Signup page + logic
    ├── script.js             # Player logic + song loading
    ├── style.css             # Main styles
    ├── auth.css              # Login/Signup styles
    └── Images/               # Cover art (+ Audio/ copies)
```

> **Note:** the dependencies are split across two `package.json` files. The **root** holds `mongoose`, `bcryptjs`, `jsonwebtoken` and `dotenv`, and **`backend/`** holds `express` and `cors`. Node resolves modules up the directory tree, so the backend works as long as you install **both**.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer (developed on v24)
- npm (bundled with Node.js)
- A MongoDB database, either a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB install
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vinitaparab/Spotify-Clone.git
cd Spotify-Clone
```

### 2. Install dependencies

Install in **both** the root folder and `backend/`:

```bash
npm install
cd backend
npm install
```

### 3. Configure environment variables

Create a file called `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=<a-long-random-secret-string>
```

| Variable     | Required | Description                                                  |
| ------------ | -------- | ------------------------------------------------------------ |
| `PORT`       | No       | Port the server listens on. Defaults to `5000`.              |
| `MONGO_URI`  | Yes      | MongoDB connection string. If it is missing or wrong, the server exits on startup. |
| `JWT_SECRET` | Yes      | Secret used to sign and verify login tokens.                 |

To generate a strong `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

If you use MongoDB Atlas, add your IP address (or `0.0.0.0/0` for Render) under **Network Access**.

### 4. Start the backend

```bash
cd backend
npm start
```

If it started correctly, you will see:

```
Server running on port 5000
✅ MongoDB Connected Successfully
```

### 5. Open the app

The backend also serves the `frontend/` folder as static files, so open:

```
http://localhost:5000/signup.html
```

Create an account, log in, and you will be redirected to the player.

---

## Running Locally Against Your Own Backend

The frontend currently has the **production Render URL hard-coded**. To use your local backend instead, change these lines:

| File                  | Current value                                                          | Local value                                        |
| --------------------- | ---------------------------------------------------------------------- | -------------------------------------------------- |
| `frontend/auth.js`    | `https://spotify-clone-backend-8py5.onrender.com/api/auth/login`       | `http://localhost:5000/api/auth/login`             |
| `frontend/signup.js`  | `https://spotify-clone-backend-8py5.onrender.com`                      | `http://localhost:5000/api/auth/signup`            |
| `frontend/script.js`  | `https://spotify-clone-backend-8py5.onrender.com/api/songs`            | `http://localhost:5000/api/songs`                  |

`backend/server.js` also builds song URLs with a hard-coded `https://` prefix. Local servers usually run on plain `http`, so change this line for local development:

```js
const baseUrl = `https://${req.get("host")}`;
// to
const baseUrl = `${req.protocol}://${req.get("host")}`;
```

(If you deploy behind a proxy such as Render with `req.protocol`, add `app.set("trust proxy", 1);` so that it reports `https` correctly.)

---

## API Reference

Base URL: `http://localhost:5000` (local) or `https://spotify-clone-backend-8py5.onrender.com` (production)

### `POST /api/auth/signup`

Registers a new user.

```json
// Request body
{ "name": "Jane", "email": "jane@example.com", "password": "secret123" }
```

| Status | Response                                          |
| ------ | ------------------------------------------------- |
| 201    | `{ "message": "User registered successfully" }`   |
| 400    | `{ "message": "User already exists" }`            |
| 500    | `{ "message": "<error>" }`                        |

### `POST /api/auth/login`

Logs a user in and returns a JWT that is valid for 7 days.

```json
// Request body
{ "email": "jane@example.com", "password": "secret123" }
```

```json
// 200 response
{
  "message": "Login Successful",
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane", "email": "jane@example.com" }
}
```

Wrong credentials return `400 { "message": "Invalid Email or Password" }`.

### `GET /api/songs`

Returns the song catalogue. Each `songPath` is an absolute URL to the MP3.

```json
[
  {
    "songName": "Assa Kooda",
    "songDes": "Sai Abhyankkar,Sai Smriti",
    "songImage": "Images/img1.jpg",
    "songPath": "https://<host>/Audio/1.mp3"
  }
]
```

### Static routes

| Path        | Serves                  |
| ----------- | ----------------------- |
| `/Audio/*`  | `backend/Audio/*.mp3`   |
| `/*`        | `frontend/*`            |

### Protecting routes

`backend/middleware/authMiddleware.js` checks for an `Authorization: Bearer <token>` header and puts the decoded payload (`{ id }`) on `req.user`. No route uses it yet. To protect a route:

```js
const authMiddleware = require("./middleware/authMiddleware");
app.get("/api/private", authMiddleware, (req, res) => res.json({ userId: req.user.id }));
```

---

## Adding a New Song

1. Put the audio file in `backend/Audio/` as `29.mp3`.
2. Put the cover image in `frontend/Images/` as `img29.jpg`. Also put a copy in `backend/Images/` to keep the two folders in sync.
3. Add an entry to `backend/song.js`:
   ```js
   {
     songName: "Song Title",
     songDes: "Artist 1, Artist 2",
     songImage: "Images/img29.jpg",
     songPath: "Audio/29.mp3",
   },
   ```
4. Add a matching `music-card` block to `frontend/index.html` with a play icon whose `id` is the song's number (e.g. `<i id="29" class="playMusic fa-solid fa-circle-play"></i>`). The cards are filled in the same order as the array in `song.js`.

---

## Deployment (Render)

1. Create a new **Web Service** on [Render](https://render.com) from this repository.
2. Suggested settings:
   - **Root directory:** leave blank (the repo root)
   - **Build command:** `npm install && cd backend && npm install`
   - **Start command:** `cd backend && npm start`
3. Under **Environment**, add `MONGO_URI` and `JWT_SECRET`. Render sets `PORT` automatically.
4. Update the backend URLs in the frontend JS files to your new Render URL.

> Render free-tier services go to sleep when idle, so the first request after a while can take 30–60 seconds.

---

## Known Issues / TODO

- **Signup URL is incomplete**: `frontend/signup.js` posts to the bare backend URL instead of `/api/auth/signup`, so signups from the UI fail until you fix it.
- **Secrets and `node_modules` are committed**: add a `.gitignore` (see below), run `git rm -r --cached node_modules backend/node_modules backend/.env`, and **rotate** the MongoDB password and `JWT_SECRET`, because the old values are still in the Git history.
- **Hard-coded API URLs**: consider a single `API_BASE_URL` constant in the frontend.
- **Hard-coded `https://`** in `/api/songs`: see [Running Locally](#running-locally-against-your-own-backend).
- **Duplicate media**: images and audio exist in both `backend/` and `frontend/Images/`.
- **`playNextSong`** in `script.js` wraps to song `30`, but there are only 28 songs.
- **No input validation**: the backend does not check for empty fields, email format or password strength.
- No tests yet (`npm test` is a placeholder).

### Recommended `.gitignore`

```gitignore
node_modules/
.env
*.log
.DS_Store
```

---

## Scripts

| Location   | Command     | Description                     |
| ---------- | ----------- | ------------------------------- |
| `backend/` | `npm start` | Start the server (`node server.js`) |

## Contributing

1. Fork the repository and create a branch from `develop`.
2. Commit your changes with clear messages.
3. Open a pull request into `develop`. `main` is used for production releases.

## Disclaimer

This is an educational project and is not affiliated with Spotify. All songs and cover art belong to their respective owners and are included for demonstration purposes only.

## License

ISC (as declared in `backend/package.json`).
