const router = require("express").Router();
const RestaurantModel = require("../models/Restaurant.model")
const MenuItemModel = require("../models/MenuItem.model")

router.post("/:id", async (req, res, next) => {

    const {id} = req.params
    const {name, description, price, dishType, allergens} = req.body

    try{
        await MenuItemModel.create(
            
            
             {
            name,
            description, 
            price, 
            dishType, 
            allergens,
            restaurantID: id
        })


    }catch(err){
        next(err)
    }
})

module.exports = router;