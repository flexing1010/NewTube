//webpack can only understand the old JS
module.exports = {
  //entry means source code (세련된 코드)
  entry: "./src/client/js/main.js",
  output: {
    filename: "main.js",
    path: "./assets/js",
  },
};
