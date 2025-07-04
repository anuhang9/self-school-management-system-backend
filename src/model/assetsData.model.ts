import mongoose from "mongoose";

const { Schema } = mongoose;

// address sub-schema

const userSchema = new Schema(
  {
    assetsName: {
      type: String,
      required: true,
    },
    numberOfAssets: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const AssetsModel = mongoose.model("assetsModel", userSchema);
