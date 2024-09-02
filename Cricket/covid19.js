const express = require("express");
const { State, District } = require("../Team/covid");

const router = express.Router();


router.post("/districts", async (req, res) => {
  try {
    const { district_id, district_name, state_id, cases, cured, active, deaths } = req.body;

   
    if (!district_id) {
      return res.status(400).json({ message: "district_id is required" });
    }


    const findDistrictId = await District.findOne({ district_id });
    if (findDistrictId) {
      return res.status(400).json({ message: "District ID already exists" });
    }

    const findStateId = await State.findOne({ state_id });
    if (!findStateId) {
      return res.status(400).json({ message: "State ID not found" });
    }

 
    const newDistrict = await District.create({
      district_id,
      district_name,
      state_id,
      cases,
      cured,
      active,
      deaths,
    });

    return res.status(200).json({ message: "District created successfully" });
  } catch (err) {
    console.error("Error creating district:", err);
    return res.status(500).json({ message: err.message });
  }
});


router.get("/states/:stateId", async (req, res) => {
  try {
    const stateId = req.params.stateId;
    const state = await State.findOne({ state_id: stateId });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const formattedState = {
      state_id: state.state_id,
      state_name: state.state_name,
      population: state.population,
    };

    return res.status(200).json(formattedState);
  } catch (err) {
    console.error("Error retrieving state:", err);
    return res.status(500).json({ message: err.message });
  }
});

router.get("/districts/:districtId", async (req, res) => {
  try {
    const districtId = req.params.districtId;
    const district = await District.findOne({ district_id: districtId });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    const formattedDistrict = {
      district_id: district.district_id,
      district_name: district.district_name,
      state_id: district.state_id,
      cases: district.cases,
      cured: district.cured,
      active: district.active,
      deaths: district.deaths,
    };

    return res.status(200).json(formattedDistrict);
  } catch (err) {
    console.error("Error retrieving district:", err);
    return res.status(500).json({ message: err.message });
  }
});


router.delete("/districts/:districtId", async (req, res) => {
  try {
    const districtId = req.params.districtId;
    const deletedDistrict = await District.findOneAndDelete({ district_id: districtId });

    if (!deletedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }

    return res.status(200).json({ message: "District removed successfully" });
  } catch (err) {
    console.error("Error deleting district:", err);
    return res.status(500).json({ message: err.message });
  }
});

router.put("/districts/:districtId", async (req, res) => {
  try {
    const districtId = req.params.districtId;
    const { district_name, state_id, cases, cured, active, deaths } = req.body;

    const updatedDistrict = await District.findOneAndUpdate(
      { district_id: districtId },
      {
        district_name,
        state_id,
        cases,
        cured,
        active,
        deaths,
      },
      { new: true }
    );

    if (!updatedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }

    return res.status(200).json({ message: "District details updated successfully" });
  } catch (err) {
    console.error("Error updating district:", err);
    return res.status(500).json({ message: err.message });
  }
});

router.get("/states/:stateId/stats", async (req, res) => {
  try {
    const stateId = req.params.stateId;
    const districts = await District.find({ state_id: stateId });

    const stats = districts.reduce(
      (acc, district) => {
        acc.totalCases += district.cases;
        acc.totalCured += district.cured;
        acc.totalActive += district.active;
        acc.totalDeaths += district.deaths;
        return acc;
      },
      { totalCases: 0, totalCured: 0, totalActive: 0, totalDeaths: 0 }
    );

    return res.status(200).json(stats);
  } catch (err) {
    console.error("Error retrieving state stats:", err);
    return res.status(500).json({ message: err.message });
  }
});


router.get("/districts/:districtId/details", async (req, res) => {
  try {
    const districtId = req.params.districtId;
    const district = await District.findOne({ district_id: districtId });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    const state = await State.findOne({ state_id: district.state_id });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    return res.status(200).json({ state_name: state.state_name });
  } catch (err) {
    console.error("Error retrieving district details:", err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
