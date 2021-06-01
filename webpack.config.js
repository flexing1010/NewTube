//webpack can only understand the old JS
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const Base_JS = "./src/client/js/";

module.exports = {
  //entry means source code (세련된 코드)
  //entry js file got scss file linked inside
  entry: {
    main: Base_JS + "main.js",
    videoPlayer: Base_JS + "videoPlayer.js",
    recorder: Base_JS + "recorder.js",
    commentSection: Base_JS + "commentSection.js",
  },
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  output: {
    //[name takes key main&videoPlayer from entry object as a variables]
    filename: "js/[name].js",
    //to combine path
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        //역순으로 입력한다(웹팩은 오른쪽에서 왼쪽순으로 실행)
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
