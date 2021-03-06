const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const restaurantRoutes = require("./restaurant.routes")
router.use("/restaurant", restaurantRoutes)

const menuItemRoutes = require("./menuItem.routes")
router.use("/menu-item", menuItemRoutes)




module.exports = router;
