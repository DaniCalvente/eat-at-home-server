const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("signup", async (req, res, next) => {
  const { username, email, password, city, address, postCode } = req.body;

  if (!username || !email || !password || !city || !address || !postCode) {
    res.status(400).json({ errorMessage: "Llenar todos los campos" });
    return;
  }

  // aqui aplicamo todos nuestros validadores de BE

  try {
  // chequear si el usuario ya existe
  const foundUser = await UserModel.findOne({ email });
  if (foundUser) {
    res.status(400).json({ errorMessage: "Usuario ya existe" });
    return;
  }

  // aqui si todo lo anterior va bien, crearemos el usuario
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await UserModel.create({
    username,
    email,
    password: hashedPassword,
    city,
    address,
    postCode,
    role,
  });

  res.status(201).json();

  } catch(err) {
      next(err)
  }


});

// Login

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

 // Validacione de BE

 if (!email || !password) {
    res.status(400).json({ errorMessage: "Llenar todos los campos" });
    return;
  }

  // Validamos las credenciales del usuario
  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      res.status(401).json({ errorMessage: "Usuario no registrado" });
      return;
    }

    // Validamos la contraseña
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json({ errorMessage: "Contraseña invalida" });
      return;
    }

    
    // Aqui creamos el token y lo enviamos

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.username,
      role: foundUser.role,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({authToken})

  } catch (err) {
    next(err);
  }

})
module.exports = router;
