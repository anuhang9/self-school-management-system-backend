import mongoose from "mongoose";

const { Schema } = mongoose;

// address sub-schema

const addressSchema = new Schema({
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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    teacherData: {
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
    studentData: {
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
    schoolRelatedFixedAsset: {
      assetsName: {
        type: String,
        required: true,
      },
      numberOfAssets: {
        type: Number,
        required: true,
      },
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: { type: String, select: false },
    verificationTokenExpiresAt: { type: Date, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordTokenExpiresAt: { type: Date, select: false },
  },
  { timestamps: true }
);
export const SchoolAdmin = mongoose.model("schoolAdmin", userSchema)