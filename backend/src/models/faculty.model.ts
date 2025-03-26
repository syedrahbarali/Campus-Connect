import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  timeStamp: { type: Date },
});

const Faculty = mongoose.model("Faculty", FacultySchema);
export default Faculty;
