const router = require("express").Router();
const RestaurantModel = require("../models/Restaurant.model")

// aqui van todas nuestras rutas de restaurant

router.get ("/", async (req, res, next) => {

   try {

    const response = await RestaurantModel.find()
    res.json(response)

   } catch(err) {

   }



})




module.exports = router;