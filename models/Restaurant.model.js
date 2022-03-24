const { Schema, model } = require("mongoose");


const restaurantSchema = new Schema(
    {
      restName: {
        type: String,
        unique: true,
        require: true
      },
      foodType: {
          type: String,
          require: true,
          enum: ["Chinese", "American", "Spanish", "Greek", "Thai", "Italian", "Vietnamese", "Indian", "Peruvian", "Turkish", "Korean", "Japanese"]
      },
      city: {
        type: String,
        require: true, 
        enum: ["Athens", "Madrid", "Berlin", "Vienna", "Amsterdam", "Prague", "Rome", "Budapest", "London","Paris", "Barcelona", "Milan", "Munich ", "Liverpool", "Helsinki", "Copenhagen", "Zurich", "Granada", "Seville"]
      },
      address: String,
      postCode: String,
      restImg: String,
      ownerID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const RestaurantModel = model("Restaurant", restaurantSchema);
  
  module.exports = RestaurantModel;
  