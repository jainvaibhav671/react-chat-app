
const { register, login, all_users } = require("../controllers/usersController") 

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allUsers/:id", all_users);

module.exports = router;
