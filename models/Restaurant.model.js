const { Schema, model } = require("mongoose");


const restaurantSchema = new Schema(
    {
      restName: {
        type: String,
        unique: true 
      },
      foodType: {
          type: String,
          enum: [ ]
      },
      city: {
        type: String, 
        enum: ["Atenas", "Madrid", "Berlín", "Viena", "Ámsterdam", "Praga", "Roma", "Budapest", "Londres","París", "Barcelona", "Milan", "Munich", "Liverpool", "Helsinki", "Copenhague", "Zurich", "Granada", "Sevilla"]
      },
      address: {
        street: String,
        postCode: String
      },
      restImg: String,
      ownerID: {
        type:    mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const RestaurantModel = model("Restaurant", restaurantSchema);
  
  module.exports = RestaurantModel;
  