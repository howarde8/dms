const app = require("express")();
const http = require("http").Server(app);

http.listen(5000, () => {
  console.log("HTTP server is listening on port 5000");
});