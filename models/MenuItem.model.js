const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    dishType: {
      Type: String,
      enum: ["Entrantes", "Sopas", "Ensaladas", "Carnes", "Pescados", "Especialidades", "Vegetarianos", "Veganos", "Para Compartir", "Postres", "Bebidas"]
    },
    allergens: {
        type: String,
        enum: ["Trigo", "Ninguno", "Espelta", "Centeno", "Cebada", "Avena", "Gluten", "Almendras", "Avellanas", "Nueces", "Aceites", "Crustáceos", "Sopas", "Mahonesa", "Mousses", "Pastas", "Salsas", "Mejillones", "Queso", "Nata", "Yogures"]
    },
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    restaurantID: {
      type: Schema.Types.ObjectId,
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
