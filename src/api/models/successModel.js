const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const successSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  media: { type: String, default: true, required: true },
  description: { type: String, default: true, required: true },
  articleLink: { type: String, default: true, required: true },
  imageLink: { type: String, default: true, required: true },
});
exports.successSchema = successSchema;
