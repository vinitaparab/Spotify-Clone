const express = require("express");
const cors = require("cors");
const path = require("path");
const songs = require("./song");

const app = express();

app.use(cors());
app.use("/Audio", express.static(path.join(__dirname, "Audio")));
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/api/songs", (req, res) => {
  console.log("Songs API called");
  const baseUrl = `https://${req.get("host")}`;
  const playableSongs = songs.map((song) => ({
    ...song,
    songPath: `${baseUrl}/${song.songPath}`,
  }));

  res.json(playableSongs);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
