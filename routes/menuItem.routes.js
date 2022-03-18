const router = require("express").Router();
const RestaurantModel = require("../models/Restaurant.model");
const MenuItemModel = require("../models/MenuItem.model");


// pasar el middleware como parametro para recibir el payload
router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, dishType, allergens } = req.body;
  

  try {
    await MenuItemModel.create({
      name,
      description,
      price,
      dishType,
      allergens,
      restaurantID: id,
    //   ownerID: req.payload._id // QUeda pendiente de uso con el FE
    });
    res.json("Plato creado")
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
    const {id} = req.params
    try {
       await MenuItemModel.findByIdAndDelete(id)
       res.json("Plato Borrado")
    }catch(err) {
       next(err)
    }
 })



module.exports = router;
