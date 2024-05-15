require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const typesRouter = require("./routes/constants/types");
const ingredientsRouter = require("./routes/constants/ingredients");
const goalsRouter = require("./routes/constants/goals");
const dietCategoriesRouter = require("./routes/constants/diets");

const port = 3003;
const app = express();

app.use(express.static("../Frontend/build"));

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use("/api/constants", typesRouter);
app.use("/api/constants", ingredientsRouter);
app.use("/api/constants", goalsRouter);
app.use("/api/constants", dietCategoriesRouter);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
});
