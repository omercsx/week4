const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const moviesRoutes = require("./src/routes/moviesRoutes");

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());

app.use("/api", moviesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

