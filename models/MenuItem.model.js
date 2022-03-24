const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    dishType: {
      Type: String,
      enum: ["Starters", "Soups", "Salads", "Meat", "Fish", "Specialties", "Vegetarian", "Vegan", "To Share", "Desserts", "Drinks"]
    },
    allergens: {
        type: String,
        enum: ["Wheat", "None", "Spelt", "Rye", "Barley", "Oats", "Gluten", "Almonds", "Hazelnuts", "Walnuts", "Oils", "Crustaceans", "Soups ", "Mayonesa", "Mousses", "Pastas", "Sauces", "Mussels", "Cheese", "Cream", "Yogurts"]
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
