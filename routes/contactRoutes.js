const express = require("express");

const router = express.Router();
const { getContacts } = require("../controllers/contactControllers");
const { createContact } = require("../controllers/contactControllers");
const { getContact } = require("../controllers/contactControllers");
const { updateContact } = require("../controllers/contactControllers");
const { deleteContact } = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

// there is 2 ways to create the route
//1st way

// one of the ways to add middleware to all routes
// with this way middleware will apply to all the routes so don't have to add it to every route separately
router.use(validateToken);

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

// 2nd way, It's used when you have to hit different request on a same route this scenario is ideal to use it

// router
//   .route("/")
//   .get((req, res) => {
//     console.log("get all the contacts");
//     res.send("get all the contacts");
//   })
//   .post((req, res) => {
//     console.log("create contact");
//     res.send("create contact");
//   });

//   router
//     .route("/:id")
//     .get((req, res) => {
//       console.log("get the contact");
//       res.send("get the contact");
//     })
//     .put((req, res) => {
//       console.log("update the contact");
//       res.send("update the contact");
//     })
//     .delete((req, res) => {
//       console.log("delete the contact");
//       res.send("delete the contact");
//     });

module.exports = router;
