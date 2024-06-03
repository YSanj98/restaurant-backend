const router = require("express").Router();
const Restaurant = require("../models/Restaurant");

//Testing API endpoint
router.get("/", (req, res) => {
  res.send("Hello from restaurant controller");
});

//create restaurant API endpoint
router.post("/restaurantRegister", async (req, res) => {
  const { name, address, phoneNumber } = req.body;

  if (!name || !address || !phoneNumber) {
    return res.status(400).send({
      status: "error",
      message: "Name, address and phone number are required",
    });
  }

  try {
    await Restaurant.create({
      name,
      address,
      phoneNumber,
    });
    return res
      .status(201)
      .send({ status: "success", message: "Restaurant created" });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

//get all restaurants API endpoint
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res
      .status(200)
      .send({ status: "success", restaurants: restaurants });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

//edit restaurant API endpoint
router.put("/restaurant/:id", async (req, res) => {
  const { name, address, phoneNumber } = req.body;

  try {
    await Restaurant.findByIdAndUpdate(req.params.id, {
      name,
      address,
      phoneNumber,
    });
    return res
      .status(200)
      .send({ status: "success", message: "Restaurant details updated" });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

//delete restaurant API endpoint
router.delete("/deleteRestaurant/:id", async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ status: "success", message: "Restaurant deleted" });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

//retrieve restaurant API endpoint
router.get("/restaurant/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res
        .status(404)
        .send({ status: "error", message: "Restaurant not found" });
    } else {
      return res
        .status(200)
        .send({ status: "success", restaurant: restaurant });
    }
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
});

module.exports = router;
