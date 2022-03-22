const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    city: {
      type: String,
      enum: [
        "Atenas",
        "Madrid",
        "Berlín",
        "Viena",
        "Ámsterdam",
        "Praga",
        "Roma",
        "Budapest",
        "Londres",
        "París",
        "Barcelona",
        "Milan",
        "Munich",
        "Liverpool",
        "Helsinki",
        "Copenhague",
        "Zurich",
        "Granada",
        "Sevilla",
      ],
    },
    address: String,
    postCode: String,
    role: {
      type: String,
      enum: ["user", "owner"],
      default: "user",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
