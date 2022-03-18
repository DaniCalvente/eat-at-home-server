const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    dishType: {
      Type: String,
      enum: ["China", "Americana", "Española", "Griega", "Tahilandesa", "Italiana", "Vietnamita", "India", "Peruana", "Turca", "Coreana", "Japonesa" ]
    },
    Allergens: {
        type: String,
        enum: ["Trigo", "Espelta", "Centeno", "Cebada", "Avena", "Gluten", "Almendras", "Avellanas", "Nueces", "Aceites", "Crustáceos", "Sopas", "Mahonesa", "Mousses", "Pastas", "Salsas", "Mejillones", "Queso", "Nata", "Yogures"]
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurantID: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const MenuItemModel = model("MenuItem", menuItemSchema);

module.exports = MenuItemModel;
