const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  state_id: {
    type: Number,
    required: true,
    unique: true,
  },
  state_name: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
});

const districtSchema = new mongoose.Schema({
  district_id: {
    type: Number,
    required: true,
    unique: true,
  },
  district_name: {
    type: String,
    required: true,
  },
  state_id: {
    type: Number,
    required: true,
  },
  cases: {
    type: Number,
    required: true,
  },
  cured: {
    type: Number,
    required: true,
  },
  active: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
});

module.exports = {
  State: mongoose.model("State", stateSchema),
  District: mongoose.model("District", districtSchema),
};
