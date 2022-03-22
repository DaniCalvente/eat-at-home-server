const router = require("express").Router();
const RestaurantModel = require("../models/Restaurant.model")
const MenuItemModel = require("../models/MenuItem.model")
const isAuthenticated = require("../middleware/isAuthenticated")


// aqui van todas nuestras rutas de restaurant

router.get ("/:city", async (req, res, next) => {
   const {city} = req.params
   // console.log(city)
   

   try {

    const response = await RestaurantModel.find({ "city" : { $regex : new RegExp(city, "i") } })
   //  console.log(response)
    res.json(response)

   } catch(err) {
      next(err)

   }
})

router.get ("/menu/:id", isAuthenticated, async (req, res, next) => {
   // console.log(req.payload);
   // console.log("Estoy cogiendo el menu")
   const {id} = req.params
   // console.log(req.body)
   
   try {
      const response = await MenuItemModel.find({"restaurantID": id})
      res.json(response)

   }catch(err) {
      next(err)

   }
})

router.post("/owner", isAuthenticated, async (req, res, next) => {

   const {restName, foodType, city, address, postCode } = req.body

   try{
      const response = await RestaurantModel.create({
         restName, 
         foodType, 
         city, 
         address, 
         postCode, 
         ownerID: req.payload._id
      })
      res.json("Restaurante Creado")

   }catch(err) {
      next(err)
   }
})

router.patch("/:id", isAuthenticated, async (req, res, next) => {
   const {id} = req.params
   const {restName, foodType, city, address, postCode} = req.body
   try{
      await RestaurantModel.findByIdAndUpdate(id, {restName, foodType, city, address, postCode})
      res.json("Restaurante actualizado")

   }catch(err) {
      next(err)
   }

})

router.delete("/:id", isAuthenticated, async (req, res, next) => {
   const {id} = req.params
   try {
      await RestaurantModel.findByIdAndDelete(id)
      res.json("Restaurante Borrado")
   }catch(err) {
      next(err)
   }
})




module.exports = router;