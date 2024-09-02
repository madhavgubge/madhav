const express = require("express");
const users = require("../Team/User");

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const player_id = req.body.player_id;
    const jersey_number = req.body.jersey_number;
    const findplayer_id = await users.findOne({ player_id: player_id });
    const findjersey_number = await users.findOne({ jersey_number: jersey_number });

    if (findplayer_id) {
      return res.status(402).json({ message: "Player ID already registered ..." });
    }

    if (findjersey_number) {
      return res.status(402).json({ message: "Jersey Number already registered ..." });
    }

    const newUser = await users.create({
      player_id: Number(req.body.player_id), 
      player_name: req.body.player_name,
      jersey_number: Number(req.body.jersey_number), 
      role: req.body.role,
  });
  
    return res.status(200).json({ message: "Player created successfully..." });
  } catch (err) {
    console.error("Error creating user:", err); 
    return res.status(500).json({ message: err.message });
  }
});


router.get("/users", async (req, res) => {
  try {
    const players = await users.find(); 
    const formattedPlayers = players.map(player => ({
      playerId: player.player_id,
      playerName: player.player_name,
      jerseyNumber: player.jersey_number,
      role: player.role
    }));
    return res.status(200).json(formattedPlayers);
  } catch (err) {
    console.error("Error retrieving players:", err);
    return res.status(500).json({ message: err.message });
  }
});


router.get("/users/:_id", async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const player = await users.findOne({ player_id: playerId });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const formattedPlayer = {
      playerId: player.player_id,
      playerName: player.player_name,
      jerseyNumber: player.jersey_number,
      role: player.role
    };

    return res.status(200).json(formattedPlayer);
  } catch (err) {
    console.error("Error retrieving player:", err);
    return res.status(500).json({ message: err.message });
  }
});


router.put("/users/:playerId", async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const { player_name, jersey_number, role } = req.body;

    const updatedPlayer = await users.findOneAndUpdate(
      { player_id: playerId },
      {
        player_name: player_name,
        jersey_number: jersey_number,
        role: role,
      },
      { new: true } 
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(200).json({ message: "Player details updated" });
  } catch (err) {
    console.error("Error updating player:", err);
    return res.status(500).json({ message: err.message });
  }
});


router.delete("/user/:playerId", async (req, res) => {
  try {
    const playerId = req.params.playerId;

    const deletedPlayer = await users.findOneAndDelete({ player_id: playerId });

    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(200).json({ message: "Player removed" });
  } catch (err) {
    console.error("Error deleting player:", err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
