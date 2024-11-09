import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
      year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
   stray:{
    type:Boolean,
    required: true,
   },
   vaccined:{
    type:Boolean,
    required: true,
   },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
