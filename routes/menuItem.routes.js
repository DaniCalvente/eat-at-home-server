const router = require("express").Router();
const RestaurantModel = require("../models/Restaurant.model");
const MenuItemModel = require("../models/MenuItem.model");
const isAuthenticated = require("../middleware/isAuthenticated");



router.get("/menu/:id", async (req, res, next) => {
  const { id } = req.params;
  

  try {
    const response = await MenuItemModel.findById({ "_id": id});
    res.json(response);
  } catch (err) {
    next(err);
  }
});

// router.post("/menu/:id", async (req, res, next) => {
//   const { id } = req.params;
 
//   const { name, description, price, dishType, allergens } = req.body;

//   try {
//     await MenuItemModel.create({
//       name,
//       description,
//       price,
//       dishType,
//       allergens,
//       restaurantID: id,
//       ownerID: req.payload._id 
//     });
//     res.json("Plato creado");
//   } catch (err) {
//     next(err);
//   }
// });

router.patch("/menu/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, dishType, allergens } = req.body;
  try {
    await MenuItemModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      dishType,
      allergens,
    });
    res.json("Plato actualizado");
  } catch (err) {
    next(err);
  }
});

router.delete("/menu/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await MenuItemModel.findByIdAndDelete(id);
    res.json("Plato Borrado");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
