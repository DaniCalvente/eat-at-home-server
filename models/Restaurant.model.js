const { Schema, model } = require("mongoose");


const restaurantSchema = new Schema(
    {
      restName: {
        type: String,
        unique: true 
      },
      foodType: {
          type: String,
          enum: ["China", "Americana", "Española", "Griega", "Tahilandesa", "Italiana", "Vietnamita", "India", "Peruana", "Turca", "Coreana", "Japonesa"]
      },
      city: {
        type: String, 
        enum: ["Atenas", "Madrid", "Berlín", "Viena", "Ámsterdam", "Praga", "Roma", "Budapest", "Londres","París", "Barcelona", "Milan", "Munich", "Liverpool", "Helsinki", "Copenhague", "Zurich", "Granada", "Sevilla"]
      },
      address: String,
      postCode: String,
      restImg: String,
      ownerID: {
        type: Schema.Types.ObjectId,
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
  