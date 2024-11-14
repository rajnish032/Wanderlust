const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { types, required, number } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image:{
    url: String,
     filename:String,
    },
  price: {
    type: Number,
    min: 0, // Ensures the price is non-negative
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // references the 'User' collection
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
  
  coordinates: {
    type: [Number],
    require:true
  },
},

//  category: {
//   type: String,
//    enum: ["trending" ,"rooms","iconic-cities", "castles", "beach", "camping", "farms", "arctic","mountain","towers","creative" ],
//  },
});


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    // Deletes all reviews whose _id is in the listing's reviews array
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
