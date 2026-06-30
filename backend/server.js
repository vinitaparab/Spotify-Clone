const express = require("express");
const cors = require("cors");
const path = require("path");
const songs = require("./song");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/Audio", express.static(path.join(__dirname, "Audio")));
app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use("/api/auth", authRoutes);

app.get("/api/songs", (req, res) => {
  console.log("Songs API called");
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const playableSongs = songs.map((song) => ({
    ...song,
    songPath: `${baseUrl}/${song.songPath}`,
  }));

  res.json(playableSongs);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
