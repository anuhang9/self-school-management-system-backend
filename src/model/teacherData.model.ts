import mongoose from "mongoose";

const { Schema } = mongoose;

// address sub-schema

export const addressSchema = new Schema({
  temporaryAddress: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  ruralMunicipality: { type: String },
  municipality: { type: String },
  subMetropolitan: { type: String },
  metropolitan: { type: String },
  wardNo: { type: String },
});

const userSchema = new Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    teacherGender: {
      type: Boolean,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    address: addressSchema,
    email: { type: String },
    phoneNumber: { type: String },
    idCardIssue: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const TeacherModel = mongoose.model("teacherModel", userSchema);
