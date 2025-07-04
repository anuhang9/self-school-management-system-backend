import mongoose from "mongoose";
import { addressSchema } from "./teacherData.model";

const { Schema } = mongoose;

// address sub-schema

const userSchema = new Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentGender: {
      type: Boolean,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    address: addressSchema,
    parentPhoneNumber: String,
    idCardIssue: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const StudentModel = mongoose.model("studentModel", userSchema);
