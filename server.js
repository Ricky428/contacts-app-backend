const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// app.get("/api/contacts", (req, res) => {
//   console.log("get all contacts");
//   res.send("get all contacts");
// });

// For parsing application/json
app.use(express.json());

//middleware to call the route
// "/api/contacts" will be repeated hence we put it here to remove the repetition
// after , is the route we created
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log("port is running at port", port);
});
