import mongoose from "mongoose";

export const HELPING_VERB_CATEGORIES = [
  "am", "is", "are", "was", "were", "be", "being", "been",
  "have", "has", "had",
  "do", "does", "did",
  "shall", "should", "will", "would",
  "can", "could", "may", "might", "must",
];

const HelpingVerbSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: HELPING_VERB_CATEGORIES,
    },
    hindi: {
      type: String,
      required: true,
      trim: true,
    },
    english: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const HelpingVerb = mongoose.model("HelpingVerb", HelpingVerbSchema);
