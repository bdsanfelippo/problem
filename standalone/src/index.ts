import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const app = express();

// serve everything in the public folder as static files
app.use(express.static("public"));

const webpackConfig = require("../../webpack.config");
const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));

const libraryPath = path.join(__dirname, "../../lib");
app.use("/library", express.static(libraryPath));

app.get("/", (req, res) => {
  res.sendFile(__dirname, "index.html");
});

app.listen(4141, () => {
  console.log("Listening on port 4141");
});
