const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
// const isLoggedIn = require("../middleware/isLoggedIn");

// Signup

router.post("/signup", async (req, res, next) => {
  const { username, email, password, city, address, postCode } = req.body;
  console.log("I got the variables")
  if (!username || !email || !password || !city || !address || !postCode) {
    res.status(400).json({ errorMessage: "Rellenar todos los campos" });
    return;
  }
  console.log("None is empty")
  const passwordRegexp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

  if (!passwordRegexp.test(password)) {
    res.status(400).json({
      errorMessage:
        "Password has to be between 8 & 15, capitalize letter, lowercase letter, one digit and at least one special character",
    });
    return;
  }
  console.log("password is correct")
  // Check email

  try {
    const foundUser = await UserModel.findOne({ "email":email });
    if (foundUser) {
      res.status(400).json({ errorMessage: "Usuario ya existe" });
      return;
    }
    console.log("email is not duplicated")
    // Aqui si todo lo anterior va bien, crearemos el usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      city,
      address,
      postCode,
    });
    console.log("user created")

    res.status(201).json();
  } catch (err) {
    next(err);
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

    // Validamos la contrase??a
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json({ errorMessage: "Contrase??a invalida" });
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

    res.status(200).json({ authToken });
  } catch (err) {
    next(err);
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {

  // si el token no es valido o no tiene token, el middleware automaticamente envia un error

  // la ruta solo se ejecuta si el usuario est?? logeado
  res.status(200).json(req.payload)

})

module.exports = router;
