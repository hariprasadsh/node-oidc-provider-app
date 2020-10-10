const express = require("express");
const Provider = require("oidc-provider");

const app = express();

const port = 3000;

const oidc = new Provider("http://localhost:3000");

app.use("/", oidc.callback);

app.listen(3000, () => {
  console.log("Server listening to port :", port);
});
